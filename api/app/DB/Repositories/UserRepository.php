<?php

namespace App\DB\Repositories;

use App\DB\Models\User;
use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use Illuminate\Support\Facades\DB;

class UserRepository extends Repository
{
    public function model()
    {
        return 'App\DB\Models\User';
    }

    public function getUserCompletedTasks($id)
    {

    }

    public function getAllUsers()
    {
        return collect(DB::table('users')
            ->leftJoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->select(
                'users.address',
                'users.birthday',
                'users.company',
                'users.country',
                'users.created_at',
                'users.email',
                'users.facebook',
                'users.first_name',
                'users.gender',
                'users.google',
                'users.id',
                'users.is_active',
                'users.is_blocked',
                'users.last_name',
                'users.phone_no',
                'users.picture',
                'users.position',
                'users.twitter',
                'users.updated_at',
                'users.username',
                'roles.name as role_name'
            )
            ->orderBy('users.created_at', 'desc')
            ->get())->toArray();
    }

    public function getAllUsersByIds($userIds)
    {
        $users = User::whereIn('id', $userIds)->get();
        return $users;
    }

    public function getNonAdminUsers()
    {
        $users = collect(DB::table('users')
        ->leftJoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
        ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
        ->select(
            'users.address',
            'users.birthday',
            'users.company',
            'users.country',
            'users.created_at',
            'users.email',
            'users.facebook',
            'users.first_name',
            'users.gender',
            'users.google',
            'users.id',
            'users.is_active',
            'users.is_blocked',
            'users.last_name',
            'users.phone_no',
            'users.picture',
            'users.position',
            'users.twitter',
            'users.updated_at',
            'users.username',
            'roles.name as role_name'
        )
        ->whereNotIn('roles.id', [4,5])
        ->orderBy('users.created_at', 'desc')
        ->get())->toArray();

        return $users;
    }
}