<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\TasksRepository as TaskRepo;
use App\DB\Repositories\RoleRepository as RoleRepo;
use App\DB\Repositories\CommentsRepository as CommentsRepo;
use Intervention\Image\Facades\Image;

class TasksService
{

    private $userRepo;
    private $taskRepo;
    private $roleRepo;
    private $commentRepo;

    /**
     * Constructor
     * @param UserRepo $userRepo
     * @param TaskRepo $taskRepo
     * @param RoleRepo $roleRepo
     * @param CommentsRepo $commentRepo
     */
    public function __construct(
        UserRepo $userRepo,
        TaskRepo $taskRepo,
        RoleRepo $roleRepo,
        CommentsRepo $commentRepo
    )
    {
        $this->userRepo    = $userRepo;
        $this->taskRepo    = $taskRepo;
        $this->roleRepo    = $roleRepo;
        $this->commentRepo = $commentRepo;
    }

    /**
     * Get All tasks
     * @param $projectId
     * @return Collection
     */
    public function getAllTasks($projectId)
    {
        $current_user = JWTAuth::parseToken()->authenticate();

        if (!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if ($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getAllTasks($projectId);
        } else {
            $tasks = $this->taskRepo->getAllTasksByUser($current_user['attributes']['id'], $projectId);
            if ($tasks == null) {
                return null;
            }
            return $this->getAllowedTasks($tasks);
        }
    }

    /**
     * @param $tasks
     * @return array
     */
    public function getAllowedTasks($tasks) {
        $current_user = JWTAuth::parseToken()->authenticate();

        $filteredTasks = [];
        foreach ($tasks as $task) {
            $permissions = json_decode($task->permissions, true);
            if (is_array($permissions)) {
                foreach ($permissions as $permission) {
                    if ($permission['user_id'] == $current_user->id &&
                        array_key_exists('enabled', $permission)) {
                        //-----
                        if($permission['enabled'] == true) {
                            $filteredTasks[] = $task;
                        }
                    }
                }
            }

        }
        return $filteredTasks;
    }

    /**
     * Get all tasks by its status
     * @param $status
     * @param $projectId
     * @return Collection
     */
    public function getAllTasksByStatus($status, $projectId)
    {
        $current_user = JWTAuth::parseToken()->authenticate();

        if (!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if ($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getTasksByStatus($status, $projectId);
        } else {
            $tasks = $this->taskRepo->getTasksByStatusAndUser($status, $current_user['attributes']['id'], $projectId);
            if ($tasks == null) {
                return null;
            }
            return $this->getAllowedTasks($tasks);
        }
    }

    /**
     * upload task attachment
     * @param $image
     * @return String
     */
    public function uploadTaskAttachment($image)
    {
        /*$name = time().'.'.$image->getClientOriginalExtension();
        $path = 'uploads' . DIRECTORY_SEPARATOR . 'tasks_files' . DIRECTORY_SEPARATOR;
        $destinationPath = public_path($path); // upload path
        $image->move($destinationPath, $name);
        return $name;*/
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
     * Get count of tasks
     * @param $completed
     * @param string $user
     * @return
     */
    public function getTasksCount($completed, $user = "all")
    {
        if ($user == "all") {
            if ($completed == true) {
                return $this->taskRepo->getCompletedTasksCount();
            }
            return $this->taskRepo->getUncompletedTasksCount();
        } else {
            if ($completed == true) {
                return $this->taskRepo->getUserCompletedTasksCount($user);
            }
            return $this->taskRepo->getUserUncompletedTasksCount($user);
        }
    }

    public function getLastTasks()
    {
        $tasks = $this->taskRepo->getLastTasks();
        return $tasks;
    }

    public function getUserLastTasks($id)
    {
        $tasks = $this->taskRepo->getUserLastTasks($id);
        return $tasks;
    }

    /**
     * @param $taskId
     * @return bool
     */
    public function deleteTask($taskId)
    {
        //First remove comments
        try {
            $this->commentRepo->deleteByTaskId($taskId);
            $this->taskRepo->delete($taskId);
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
        }
        return false;
    }
}