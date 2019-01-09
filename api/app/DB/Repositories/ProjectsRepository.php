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
     * Returns all Projects
     */
    public function getAllProjects()
    {
        return collect(parent::all())->toArray();
    }

    /**
     * Get all projects by user
     */
    public function getAllProjectsByUser($userId)
    {
        return collect(DB::table('projects')
            ->whereRow('json_contains(allowed_users, \'["' . $userId . '"]\')')
            ->get())->toArray();
    }

    /**
     * Get project by its id
     */
    public function getProjectById($id) {
        return parent::findBy('id', $id);
    }
}