<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\TasksRepository as TaskRepo;
use App\DB\Repositories\RoleRepository as RoleRepo;

class TasksService {

    private $userRepo;
    private $to = [];
    private $taskRepo;
    private $roleRepo;
    
    /**
     * Constructor
     */
    public function __construct (
        UserRepo $userRepo,
        TaskRepo $taskRepo,
        RoleRepo $roleRepo
    ){
        $this->userRepo = $userRepo;
        $this->taskRepo = $taskRepo;
        $this->roleRepo = $roleRepo;
    }

    /**
     * Get All tasks
     * @return Collection
     */
    public function getAllTasks() {
        $current_user = JWTAuth::parseToken()->authenticate();
        
        if(!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getAllTasks();
        } else {
            return $this->taskRepo->getAllTasksByUser($current_user['attributes']['id']);
        }
    }

    /**
     * Get all tasks by its status
     * @return Collection
     */
    public function getAllTasksByStatus($status) {
        $current_user = JWTAuth::parseToken()->authenticate();
        
        if(!$current_user) {
            return null;
        }
        $role_name = $current_user['attributes']['role_name'];
        if($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getTasksByStatus($status);
        } else {
            return $this->taskRepo->getTasksByStatusAndUser($status, $current_user['attributes']['id']);
        }
    }

    /**
     * upload task attachment
     * @return String
     */
    public function uploadTaskAttachment($image) {
        $name = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = storage_path('/app/images');
        $path = 'uploads' . DIRECTORY_SEPARATOR . 'tasks_files' . DIRECTORY_SEPARATOR;
        $destinationPath = public_path($path); // upload path
        $image->move($destinationPath, $name);
        return $name;
    }
}