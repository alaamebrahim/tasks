<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;

class PermissionRepository extends Repository {
    public function model () {
        //return 'App\DB\Models\Permission';
        return 'Spatie\Permission\Models\Permission';
    }
}