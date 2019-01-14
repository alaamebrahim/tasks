<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\CommentsRepository as CommentsRepo;
use Intervention\Image\Facades\Image;

class CommentsService
{

    private $userRepo;
    private $commentsRepo;

    /**
     * Constructor
     * @param UserRepo $userRepo
     * @param CommentsRepo $commentsRepo
     */
    public function __construct(
        UserRepo $userRepo,
        CommentsRepo $commentsRepo
    )
    {
        $this->userRepo = $userRepo;
        $this->commentsRepo = $commentsRepo;
    }

    /**
     * Get all comments by its task
     * @param $taskId
     * @return array|null
     */
    public function getAllCommentsByTaskId($taskId)
    {
        $current_user = JWTAuth::parseToken()->authenticate();

        if (!$current_user) {
            return null;
        }
        return $this->commentsRepo->getCommentsByTaskId($taskId);

    }

    /**
     * upload comment attachment
     * @param $image
     * @return String
     */
    public function UploadAttachment($image)
    {
        $name = time() . '.' . $image->getClientOriginalExtension();
        $path = 'uploads' . DIRECTORY_SEPARATOR . 'tasks_files' . DIRECTORY_SEPARATOR;
        $destinationPath = public_path($path);
        $img = Image::make($image->getRealPath());
        $img->resize(800, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save($destinationPath . $name);
        return $name;
    }

    /**
     * Adds or updates data
     * @param Request $request
     * @return bool
     */
    public function updateOrNew(Request $request)
    {
        try {
            $current_user = JWTAuth::parseToken()->authenticate();

            if (!$current_user) {
                return false;
            }
            $toBeSaved = $request->all();

            if ($request->id) {
                $toBeSaved['id'] = $request->id;
                $this->commentsRepo->update($toBeSaved, $request->id);
            } else {
                $this->commentsRepo->saveModel($toBeSaved);
            }

            return true;
        } catch (\Throwable $th) {
            Log::error($th);
            return false;
        }
    }

    /**
     * @param $id
     * @return bool
     */
    public function removeComment($id)
    {
        try {
            $current_user = JWTAuth::parseToken()->authenticate();
            if ($current_user) {
                $this->commentsRepo->delete($id);
                return true;
            }
        } catch (\Throwable $th) {
            Log::error($th);
        }
        return false;
    }

    /**
     * @param $taskId
     * @return bool
     */
    public function removeCommentsByTaskId($taskId)
    {
        try {
            $current_user = JWTAuth::parseToken()->authenticate();
            if ($current_user) {
                $this->commentsRepo->deleteByTaskId($taskId);
                return true;
            }
        } catch (\Throwable $th) {
            Log::error($th);
        }
        return false;
    }

    /**
     * upload comment attachment
     * @param $image
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
}