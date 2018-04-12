<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use App\DB\Models\Tasks as Task;
use App\DB\Models\User;
use Illuminate\Support\Facades\DB;

class TasksRepository extends Repository {
    public function model () {
        return 'App\DB\Models\Tasks';
    }

    /**
     * Returns all tasks for an user
     */
    public function getAllTasksByUser ($id) {
        return DB::table('tasks')
                    ->leftJoin('users', 'tasks.user_id', '=', 'users.id')
                    ->orderBy('tasks.updated_at', 'desc')
                    ->where('tasks.user_id', '=', $id)
                    ->select('tasks.*', 'users.first_name', 'users.last_name')
                    ->get();
    }

    /**
     * Returns all tasks for an user
     */
    public function getAllTasks () {
        return DB::table('tasks')
                    ->leftJoin('users', 'tasks.user_id', '=', 'users.id')
                    ->orderBy('tasks.updated_at','desc')
                    ->orderBy('tasks.completed','desc')
                    ->select('tasks.*', 'users.first_name', 'users.last_name')
                    ->get();
    }

    /**
     * Get completed/uncompleted tasks
     */
    public function getTasksByStatus($status) {
        return parent::findAllBy('completed', $status);
    }

    public function getLastAddedTasksIdByDateCreated($created_at) {
        return DB::table('tasks')
                    ->where('created_at', '=', $created_at)
                    ->select('tasks.id')
                    ->get();
    }
}