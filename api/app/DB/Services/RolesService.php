<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Repositories\PermissionRepository as PermissionRepo;
use App\DB\Repositories\RoleRepository as RolesRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesService {

    private $userRepo;
    private $to = [];
    private $permissionRepo;
    private $rolesRepo;
    
    /**
     * Constructor
     */
    public function __construct (
        UserRepo $userRepo,
        PermissionRepo $permissionRepo,
        RolesRepo $rolesRepo
    ){
        $this->userRepo = $userRepo;
        $this->permissionRepo = $permissionRepo;
        $this->rolesRepo = $rolesRepo;
    }

    public function createPermission($permission, $translation) {
        $permission = Permission::create(['name' => $permission, 'translation' => $translation]);
        return $permission;
    }

    public function createRole($role, $translation) {
        $role = Role::create(['name' => $role, 'translation' => $translation]);
        return $role;
    }

    public function associatePermissionToRole($role, $permissions) {
        $role->syncPermissions($permissions);
    }

    public function getAllPermissions() {
        $perms = $this->permissionRepo->all();
        $newPerms = [];
        foreach ($perms as $key => $value) {
            $permission = [];
            $permission['id'] = $value['attributes']['id'];
            $permission['name'] = $value['attributes']['name'];
            $permission['translation'] = trans($value['attributes']['translation']);
            // var_dump($value['attributes']);
            $newPerms[] = $permission;
        }
        return $newPerms;
    }

    public function getAllRoles() {
        $perms = $this->rolesRepo->all();
        $newPerms = [];
        foreach ($perms as $key => $value) {
            $permission = [];
            $permission['id'] = $value['attributes']['id'];
            $permission['name'] = $value['attributes']['name'];
            $permission['translation'] = trans($value['attributes']['translation']);
            // var_dump($value['attributes']);
            $newPerms[] = $permission;
        }
        return $newPerms;
    }

    public function setUserRole($id, $roles = []) {
        $user = $this->userRepo->find($id);
        if($user) {
            $user->syncRoles($roles);
            return true;
        }
        return false;
    }

    public function getUserRole($id) {
        $user = $this->userRepo->find($id);
        if($user) {
            return $user->getRoles();
        }
        return null;
    }

}