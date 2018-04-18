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

    /**
     * Add new permission to database
     * @return Object
     */
    public function createPermission($permission, $translation) {
        $permission = Permission::create(['name' => $permission, 'translation' => $translation]);
        return $permission;
    }

    /**
     * Add new role to database
     * @return Object
     */
    public function createRole($role, $translation) {
        $role = Role::create(['name' => $role, 'translation' => $translation]);
        return $role;
    }

    /**
     * Update role
     * @return Object
     */
    public function updateRole($id, $role, $translation) {
        $updatedRole = [];
        $updatedRole['id'] = $id;
        $updatedRole['name'] = $role;
        $updatedRole['translation'] = $translation;
        $role = $this->rolesRepo->update($updatedRole, $id);
        return $role;
    }

    /**
     * Add one or more permission to a role
     * @return Void
     */
    public function associatePermissionToRole($role_id, $permissions) {
        $role = $this->rolesRepo->find($role_id);
        $role->syncPermissions($permissions);
    }

    /**
     * Get all permissions in database
     * @return Array
     */
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

    /**
     * Get all roles in database
     * @return Array
     */
    public function getAllRoles() {
        $roles = $this->rolesRepo->all();
        $newRoles = [];
        foreach ($roles as $key => $value) {
            $role = [];
            $role['id'] = $value['attributes']['id'];
            $role['name'] = $value['attributes']['name'];
            $role['translation'] = trans($value['attributes']['translation']);
            
            //Get permissions ids
            $permissions = [];
            $role_permissions = $this->rolesRepo->find($role['id'])->permissions;
            foreach($role_permissions as $k => $v) {
                $permissions[] = $v['attributes']['id'];
            }
            $role['permissions'] = $permissions;
            // var_dump($value['attributes']);
            $newRoles[] = $role;
        }
        return $newRoles;
    }

    /**
     * Get logged in user permissions
     * @return Array
     */
    public function getUserPermissions($userId) {
        $current_user = JWTAuth::parseToken()->authenticate();
        
        if($current_user['attributes']['id'] != $userId) {
            return null;
        }
        $user = $this->userRepo->find($userId);
        $permissions = [];
        foreach($user->getPermissionsViaRoles() as $k => $v) {
            $permission = [];
            $permission['id'] = $v['attributes']['id'];
            $permission['name'] = $v['attributes']['name'];
            $permission['translation'] = trans($v['attributes']['translation']);
            $permissions[] = $permission;
        }
        return $permissions;
    }

    /**
     * Set a new or existing user role
     * @return Boolean
     */
    public function setUserRole($id, $roles = []) {
        $user = $this->userRepo->find($id);
        if($user) {
            $user->syncRoles($roles);
            return true;
        }
        return false;
    }

    /**
     * Get user role by his id
     * @return String
     */
    public function getUserRole($id) {
        $user = $this->userRepo->find($id);
        if($user) {
            return $user->getRoles();
        }
        return null;
    }

}