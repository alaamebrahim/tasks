<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;

class UserRepository extends Repository {
    public function model () {
        return 'App\DB\Models\User';
    }
}