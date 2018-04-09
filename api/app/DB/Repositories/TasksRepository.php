<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use Tymon\JWTAuth\Facades\JWTAuth;
class TasksRepository extends Repository {
    public function model () {
        return 'App\DB\Models\Tasks';
    }

    /**
     * Returns all tasks for an user
     */
    public function getAllTasksByUser ($id) {
        return $this->model()->where('user_id',$id)->orderBy('updated_at')->get();
    }
}