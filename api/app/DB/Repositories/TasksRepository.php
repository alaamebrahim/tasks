<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use App\DB\Models\Tasks as Task;
use App\DB\Models\User;
use Illuminate\Support\Facades\DB;

class TasksRepository extends Repository
{
    public function model()
    {
        return 'App\DB\Models\Tasks';
    }

    /**
     * Returns all tasks for an user
     * @param $id
     * @param $
     * @param $projectId
     * @return
     */
    public function getAllTasksByUser($id, $projectId)
    {
        return DB::table('tasks')
            ->leftJoin('users', 'tasks.user_id', '=', 'users.id')
            ->leftJoin('notifications', 'tasks.id', '=', 'notifications.task_id')
            ->orderBy('tasks.updated_at', 'desc')
            ->where('tasks.user_id', '=', $id)
            ->where('tasks.project_id', '=', $projectId)
            ->orderBy('tasks.updated_at', 'desc')
            ->orderBy('tasks.completed', 'desc')
            ->select(['tasks.*', 'users.first_name', 'users.last_name', DB::raw('count(notifications.task_id) as notifications')])
            ->groupBy('tasks.id')
            ->get();
    }

    /**
     * Returns all tasks for an user
     * @param $projectId
     * @return
     */
    public function getAllTasks($projectId)
    {
        return DB::table('tasks')
            ->leftJoin('users', 'tasks.user_id', '=', 'users.id')
            ->leftJoin('notifications', 'tasks.id', '=', 'notifications.task_id')
            ->orderBy('tasks.updated_at', 'desc')
            ->orderBy('tasks.completed', 'desc')
            ->select(['tasks.*', 'users.first_name', 'users.last_name', DB::raw('count(notifications.task_id) as notifications')])
            ->where('tasks.project_id', '=', $projectId)
            ->groupBy('tasks.id')
            ->get();
    }

    /**
     * Get completed/uncompleted tasks
     * @param $status
     * @param $projectId
     * @return
     */
    public function getTasksByStatus($status, $projectId)
    {
        return DB::table('tasks')
            ->leftJoin('users', 'tasks.user_id', '=', 'users.id')
            ->leftJoin('notifications', 'tasks.id', '=', 'notifications.task_id')
            ->where('tasks.completed', '=', $status)
            ->where('tasks.project_id', '=', $projectId)
            ->orderBy('tasks.updated_at', 'desc')
            ->orderBy('tasks.completed', 'desc')
            ->select(['tasks.*', 'users.first_name', 'users.last_name', DB::raw('count(notifications.task_id) as notifications')])
            ->groupBy('tasks.id')
            ->get();
    }

    /**
     * Get completed/uncompleted tasks depending on current user
     * @param $status
     * @param $user_id
     * @param $projectId
     * @return
     */
    public function getTasksByStatusAndUser($status, $user_id, $projectId)
    {
        return DB::table('tasks')
            ->leftJoin('users', 'tasks.user_id', '=', 'users.id')
            ->leftJoin('notifications', 'tasks.id', '=', 'notifications.task_id')
            ->where('tasks.completed', '=', $status)
            ->where('tasks.user_id', '=', $user_id)
            ->where('tasks.project_id', '=', $projectId)
            ->orderBy('tasks.updated_at', 'desc')
            ->orderBy('tasks.completed', 'desc')
            ->select(['tasks.*', 'users.first_name', 'users.last_name', DB::raw('count(notifications.task_id) as notifications')])
            ->groupBy('tasks.id')
            ->get();
    }

    public function getLastAddedTasksIdByDateCreated($created_at)
    {
        return DB::table('tasks')
            ->where('created_at', '=', $created_at)
            ->select('tasks.id')
            ->get();
    }

    public function getCompletedTasksCount()
    {
        return Task::where('completed', '=', true)
            ->count();
    }

    public function getUncompletedTasksCount()
    {
        return Task::where('completed', '=', false)
            ->count();
    }

    public function getUserCompletedTasksCount($id)
    {
        return Task::where('completed', '=', true)
            ->where('user_id', '=', $id)
            ->count();
    }

    public function getUserUncompletedTasksCount($id)
    {
        return Task::where('completed', '=', false)
            ->where('user_id', '=', $id)
            ->count();
    }

    public function getLastTasks()
    {
        return DB::table('tasks')
            ->orderBy('id', 'desc')
            ->limit(18)
            ->select('tasks.*')
            ->get();
    }

    public function getUserLastTasks($id)
    {
        return DB::table('tasks')
            ->orderBy('id', 'desc')
            ->where('user_id', '=', $id)
            ->limit(18)
            ->select('tasks.*')
            ->get();
    }
}