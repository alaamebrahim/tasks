<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use App\DB\Models\Tasks as Task;
use App\DB\Models\User;
use Illuminate\Support\Facades\DB;

class ProjectsRepository extends Repository
{

    /**
     * @var string Table name
     */
    protected $table = 'projects';

    public function model()
    {
        return 'App\DB\Models\Project';
    }

    /**
     * Returns all tasks for an user
     */
    public function getAllProjectsByUser($id)
    {
        return DB::table($this->table)
            ->leftJoin('users', 'projects.created_by', '=', 'users.id')
            ->orderBy('projects.updated_at', 'desc')
            ->where('projects.created_by', '=', $id)
            ->orderBy('created_by.updated_at', 'desc')
            ->select(['projects.*', 'users.first_name', 'users.last_name'])
            ->groupBy('projects.id')
            ->get();
    }

    /**
     * Returns all tasks for an user
     */
    public function getAllProjects()
    {
        return DB::table($this->table)
            ->leftJoin('users', 'projects.user_id', '=', 'users.id')
            ->leftJoin('notifications', 'projects.id', '=', 'notifications.task_id')
            ->orderBy('projects.updated_at', 'desc')
            ->orderBy('projects.completed', 'desc')
            ->select(['projects.*', 'users.first_name', 'users.last_name', DB::raw('count(notifications.task_id) as notifications')])
            ->groupBy('projects.id')
            ->get();
    }
}