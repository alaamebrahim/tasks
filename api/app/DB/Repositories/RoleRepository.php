<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;

class RoleRepository extends Repository {
    public function model () {
        //return 'App\DB\Models\Role';
        return 'Spatie\Permission\Models\Role';
    }

    /**
     * Get role name by user id.
     */
    public function getRoleName($id) {
        // var_dump($this->find($id)->name);
        return $this->find($id)->name;
    }
}