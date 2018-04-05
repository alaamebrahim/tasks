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
use App\DB\Repositories\UserRepository as UserRepo;
use App\Models\User;
class UsersController extends Controller
{
    private $roleRepo;
    private $userRepo;

    public function __construct(RoleRepo $roleRepo, UserRepo $userRepo) {
        $this->roleRepo = $roleRepo;
        $this->userRepo = $userRepo;
    }

    /**
     * Get role object by its id
     */
    public function getUserRole($id) {
        return new JsonResponse($this->roleRepo->find($id));
    }

    /**
     * Post add new user
     * @Returns JsonResponse
     */
    public function addNewUser(Request $request) {
        $response = [];
        $user = new User();

        if($user->validate($request)) {
            $this->userRepo->saveModel($request);
            return new JsonResponse([
                'success' => true,
                'message' => ''
            ]);
        } else {
            return new JsonResponse([
                'success' => false,
                'message' => $user->errors()
            ]);
        }

    }
}
