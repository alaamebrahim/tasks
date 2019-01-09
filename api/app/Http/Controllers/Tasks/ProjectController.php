<?php

namespace App\Http\Controllers\Tasks;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exception\HttpResponseException;
use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Repositories\RoleRepository as RoleRepo;
use App\DB\Repositories\ProjectsRepository as ProjectsRepo;
use App\DB\Services\NotificationsService as NotificationsService;
use App\DB\Services\ProjectsService as ProjectsService;
use App\DB\Models\User;
use Carbon\Carbon;

class ProjectController extends Controller
{
    private $notificationsService;
    private $projectsService;

    public function __construct(
        NotificationsService $notificationsService,
        ProjectsService $projectsService
    ) {
        $this->notificationsService = $notificationsService;
        $this->projectsService = $projectsService;
    }

    /**
     * Post add new project
     * @Returns JsonResponse
     */
    public function AddOrUpdateProject(Request $request)
    {      
        // Validation rules
        try {
            $this->validate($request, [
                'title' => 'required',
                'description' => 'required'
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }

        $done = $this->projectsService->updateOrNew($request);        

        // return success obj as json
        return new JsonResponse([
            'success' => $done,
            'message' => ''
        ]);
    }

    /**
     * Delete a project
     * @Returns JsonResponse
     */
    public function deleteExistingProject(Request $request)
    {       
        // Validation rules
        try {
            $this->validate($request, [
                'id' => 'required',
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $data = $request->all();

        $done = $this->projectsService->removeProject($data['id']);
        // return success obj as json
        return new JsonResponse([
            'success' => $done,
            'message' => ''
        ]);
    }

    /**
     * Get all tasks in db depending on current user
     */
    public function getAllProjects()
    {
        return $this->projectsService->getAllProjects();
    }

    /**
     * Get project by its id
     */
    public function getProjectById($id)
    {
        $project = $this->projectsService->getProjectById($id);
        if ($project != null) {
            // return success obj as json
            return new JsonResponse([
                'success' => 'true',
                'data' => $project
            ]);
        } else {
            return new JsonResponse([
                'success' => 'false',
            ]);
        }
    }


    /**
     * Uploads attachment an return its name
     */
    public function UploadImage(Request $request)
    {
        // Validation rules
        // var_dump($request);
        try {
            $this->validate($request, [
                'image' => 'required|image',
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        if ($request->hasFile('image')) {
            $picture = $this->projectsService->uploadImage($request->file('image'));
            if ($picture != null) {
                return new JsonResponse([
                    'success' => true,
                    'message' => $picture
                ]);
            }
        }

        return new JsonResponse([
            'success' => false,
            'message' => ''
        ]);
    }
}
