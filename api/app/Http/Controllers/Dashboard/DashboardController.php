<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Exception\HttpResponseException;
use App\DB\Services\NotificationsService as NotificationsService;
use App\DB\Services\TasksService as TasksService;

class DashboardController extends Controller
{
    private $notificationsService;
    private $tasksService;

    public function __construct(
        NotificationsService $notificationsService,
        TasksService $tasksService
    ) {
        $this->notificationsService = $notificationsService;
        $this->tasksService = $tasksService;
    }

    /**
     * Get count of all completed tasks
     */
    public function getCompletedTasksCount(){
        return $this->tasksService->getTasksCount(true);
    }

    /**
     * Get count of all uncompleted tasks
     */
    public function getUncompletedTasksCount(){
        return $this->tasksService->getTasksCount(false);
    }

    /**
     * Get count of user completed tasks
     * @param $id
     * @return
     */
    public function getUserCompletedTasksCount($id){
        return $this->tasksService->getTasksCount(true, $id);
    }

    /**
     * Get count of user uncompleted tasks
     * @param $id
     * @return
     */
    public function getUserUncompletedTasksCount($id){
        return $this->tasksService->getTasksCount(false, $id);
    }

    /**
     * Get last tasks (18)
     */
    public function getLastTasks(){
        return $this->tasksService->getLastTasks();
    }

    /**
     * Get last tasks for a user (18)
     * @param $id
     * @return
     */
    public function getUserLastTasks($id){
        return $this->tasksService->getUserLastTasks($id);
    }
}
