<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;

class RoleRepository extends Repository {
    public function model () {
        return 'App\DB\Models\Role';
    }

    /**
     * Get role name by user id.
     */
    public function getRoleName($id) {
        return $this->model()->find($id)->role;
    }
}