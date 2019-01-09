<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\ProjectsRepository as ProjectsRepo;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectsService
{

    private $to = [];
    private $projectsRepo;

    /**
     * Constructor
     */
    public function __construct(
        ProjectsRepo $projectsRepo
    ) {
        $this->projectsRepo = $projectsRepo;
    }

    /**
     * Adds or updates data
     */
    public function updateOrNew(Request $request)
    {
        try {
            $current_user = JWTAuth::parseToken()->authenticate();

            if (!$current_user) {
                return false;
            }
            $toBeSaved = [];
            $toBeSaved['image'] = $request->image ?? '';
            $toBeSaved['title'] = $request->title;
            $toBeSaved['description'] = $request->description;
            $toBeSaved['created_by'] = $current_user->id;
            $toBeSaved['allowed_users'] = json_encode(collect($request->allowed_users)->toArray());

            if ($request->id) {
                $toBeSaved['id'] = $request->id;
                $this->projectsRepo->update($toBeSaved, $request->id);
            } else {
                $this->projectsRepo->saveModel($toBeSaved);
            }

            return true;
        } catch (\Throwable $th) {
            Log::error($th);
            return false;
        }
    }

    public function removeProject($id)
    {
        try {
            $current_user = JWTAuth::parseToken()->authenticate();

            if (!$current_user) {
                return false;
            }

            $this->projectsRepo->delete($id);
            return true;

        } catch (\Throwable $th) {
            Log::error($th);
            return false;
        }
    }

    /**
     * Get All projects
     * @return Collection
     */
    public function getAllProjects()
    {
        $current_user = JWTAuth::parseToken()->authenticate();
        if (!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if ($role_name == 'root' || $role_name == 'admin') {
            return $this->projectsRepo->getAllProjects();
        } else {
            return $this->projectsRepo->getAllProjectsByUser($current_user['attributes']['id']);
        }
    }

    /**
     * upload task attachment
     * @return String
     */
    public function uploadImage($image)
    {
        try {
            $name = time() . '.' . $image->getClientOriginalExtension();
            $path = 'uploads' . DIRECTORY_SEPARATOR . 'projects_files' . DIRECTORY_SEPARATOR;
            $destinationPath = public_path($path);
            $img = Image::make($image->getRealPath());
            $img->resize(400, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath . $name);
            return $name;
        } catch (\Throwable $th) {
            Log::error($th);
            return null;
        }
    }

    /**
     * Get project by its id
     */
    public function getProjectById($id) {
        if(intval($id) == null && intval($id) == 0) {
            return null;
        }
        return $this->projectsRepo->getProjectById($id);
    }
}