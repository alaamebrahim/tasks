<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\TasksRepository as TaskRepo;
use App\DB\Repositories\RoleRepository as RoleRepo;
use Intervention\Image\Facades\Image;

class TasksService
{

    private $userRepo;
    private $to = [];
    private $taskRepo;
    private $roleRepo;

    /**
     * Constructor
     */
    public function __construct(
        UserRepo $userRepo,
        TaskRepo $taskRepo,
        RoleRepo $roleRepo
    ) {
        $this->userRepo = $userRepo;
        $this->taskRepo = $taskRepo;
        $this->roleRepo = $roleRepo;
    }

    /**
     * Get All tasks
     * @return Collection
     */
    public function getAllTasks()
    {
        $current_user = JWTAuth::parseToken()->authenticate();

        if (!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if ($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getAllTasks();
        } else {
            return $this->taskRepo->getAllTasksByUser($current_user['attributes']['id']);
        }
    }

    /**
     * Get all tasks by its status
     * @return Collection
     */
    public function getAllTasksByStatus($status)
    {
        $current_user = JWTAuth::parseToken()->authenticate();

        if (!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if ($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getTasksByStatus($status);
        } else {
            return $this->taskRepo->getTasksByStatusAndUser($status, $current_user['attributes']['id']);
        }
    }

    /**
     * upload task attachment
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
}