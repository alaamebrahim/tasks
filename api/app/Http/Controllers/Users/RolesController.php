<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exception\HttpResponseException;
use App\DB\Repositories\RoleRepository as RoleRepo;
use App\DB\Repositories\PermissionRepository as PermissionRepo;
use App\DB\Services\RolesService as RoleService;
use App\DB\Models\User;
class RolesController extends Controller
{
    private $roleRepo;
    private $roleService;
    private $permissionRepo;
    public function __construct(
        RoleRepo $roleRepo,
        PermissionRepo $permissionRepo,
        RoleService $roleService
    ) {
        $this->roleRepo = $roleRepo;
        $this->permissionRepo = $permissionRepo;
        $this->roleService = $roleService;
    }

    public function getAllRoles() {
        return new JsonResponse($this->roleService->getAllRoles());
    }

    public function getAllPermissions() {
        return new JsonResponse($this->roleService->getAllPermissions());
    }
    /**
     * Get role object by its id
     */
    public function getUserRole($id) {
        return new JsonResponse($this->roleRepo->find($id));
    }

    /**
     * Get current user permissions
     */
    public function getUserPermissions($id) {
        return $this->roleService->getUserPermissions($id);
    }

    /**
     * Creates one or more permissions.
     */
    public function createNewPermission(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'name' => 'required',
                'translation' => 'required'
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.permissions.errors.permission-null')
            ]);
        }
        $this->roleService->createPermission($request['name'], $request['translation']);
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Creates one or more roles.
     */
    public function createNewRole(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'name' => 'required',
                'translation' => 'required'
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.permissions.errors.permission-null')
            ]);
        }
        $role = $this->roleService->createRole($request['name'], $request['translation']);
        if($role) {
            $this->roleService->associatePermissionToRole($role->id, $request['permissions']);
        }
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Creates one or more roles.
     */
    public function UpdateExistingRole(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'name' => 'required',
                'translation' => 'required'
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.permissions.errors.permission-null')
            ]);
        }
        $role = $this->roleService->updateRole($request['id'], $request['name'], $request['translation']);
        if($role) {
            $this->roleService->associatePermissionToRole($request['id'], $request['permissions']);
        }
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Associate persmissionsto roles.
     */
    public function AssociatePermissionToRole(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'role' => 'required',
                'permissions' => 'array'
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $this->roleService->associatePermissionToRole($request['role'], $request['permissions']);
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }
}
