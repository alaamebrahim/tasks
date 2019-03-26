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
     * @param $userId
     * @return array
     */
    public function getAllProjectsByUser($userId)
    {
        $data = DB::table('projects')
            ->whereRaw('JSON_CONTAINS(allowed_users, \'[' . $userId . ']\')')
            ->get();
        return collect($data)->toArray();
    }

    /**
     * Get project by its id
     * @param $id
     * @return mixed
     */
    public function getProjectById($id) {
        return parent::findBy('id', $id);
    }

    public function deleteById($id) {
        $project = parent::find($id);
        foreach ($project->tasks() as $task) {
            $task->comments()->delete();
        }
        $project->tasks()->delete();
        return $project->delete();
    }
}