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
class UsersController extends Controller
{
    private $roleRepo;

    public function __construct(RoleRepo $roleRepo) {
        $this->roleRepo = $roleRepo;
    }

    /**
     * Get role object by its id
     */
    public function getUserRole($id) {
        return new JsonResponse($this->roleRepo->find($id));
    }
}
