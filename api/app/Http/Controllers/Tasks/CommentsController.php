<?php

namespace App\Http\Controllers\Tasks;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use App\DB\Services\NotificationsService as NotificationsService;
use App\DB\Services\CommentsService as CommentsService;
use Illuminate\Support\Facades\Log;

class CommentsController extends Controller
{
    private $notificationsService;
    private $commentsService;

    public function __construct(
        NotificationsService $notificationsService,
        CommentsService $commentsService
    ) {
        $this->notificationsService = $notificationsService;
        $this->commentsService = $commentsService;
    }

    /**
     * Post add new comment
     * @Returns JsonResponse
     * @param Request $request
     * @return JsonResponse
     */
    public function AddOrUpdateComment(Request $request)
    {      
        // Validation rules
        try {
            $this->validate($request, [
                'task_id' => 'required',
                'user_id' => 'required',
                'message' => 'required'
            ]);
        } catch (ValidationException $e) {
            Log::error($e->getMessage());
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }

        $done = $this->commentsService->updateOrNew($request);

        // return success obj as json
        return new JsonResponse([
            'success' => $done,
            'message' => '',
            'data'    => $this->getCommentById($request->task_id)
        ]);
    }

    /**
     * Delete a comment
     * @Returns JsonResponse
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteExistingComment(Request $request)
    {       
        // Validation rules
        try {
            $this->validate($request, [
                'id' => 'required',
            ]);
        } catch (ValidationException $e) {
            Log::error($e->getMessage());
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $data = $request->all();

        $done = $this->commentsService->removeComment($data['id']);

        if($done == true) {
            $returnedData = $this->getCommentById($data['task_id']);
        }
        // return success obj as json
        return new JsonResponse([
            'success' => $done,
            'message' => '',
            'data'    => $returnedData ?? ''
        ]);
    }

    /**
     * Get comments by its id
     * @param $taskId
     * @return JsonResponse
     */
    public function getCommentById($taskId)
    {
        $comments = $this->commentsService->getAllCommentsByTaskId($taskId);
        if ($comments != null) {
            // return success obj as json
            return new JsonResponse([
                'success' => 'true',
                'data' => $comments
            ]);
        } else {
            return new JsonResponse([
                'success' => 'false',
            ]);
        }
    }


    /**
     * Uploads attachment an return its name
     * @param Request $request
     * @return JsonResponse
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
            Log::error($e->getMessage());
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        if ($request->hasFile('image')) {
            $picture = $this->commentsService->uploadImage($request->file('image'));
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
