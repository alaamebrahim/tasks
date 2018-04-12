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
use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\User;
use App\DB\Services\UsersService as UsersService;

class UsersController extends Controller
{
    private $userRepo;

    public function __construct(
        UserRepo $userRepo,
        UsersService $usersService
    ) {
        $this->userRepo = $userRepo;
        $this->usersService = $usersService;
    }

    /**
     * Post add new user
     * @Returns JsonResponse
     */
    public function addNewUser(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'email' => 'required|unique:users|email',
                'role_id' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
                'password' => 'required|min:6'
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        
        $data = $request->all();
        $data['password'] = app('hash')->make($data['password']);

        // save user object
        $this->userRepo->saveModel($data);
        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Post add new user
     * @Returns JsonResponse
     */
    public function updateExistingUser(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'email' => 'required|email',
                'role_id' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $data = $request->all();
        
        // Password operations
        if($data['password'] != 'undefined' && $data['password'] != null) {
            $data['password'] = app('hash')->make($data['password']);
        } else {
            unset($data['password']);
        }
        // save user object
        $this->userRepo->update($data,$data['id']);
        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Delete a user
     * @Returns JsonResponse
     */
    public function deleteExistingUser(Request $request) {        
        $data = $request->all();
        
        // save user object
        $this->userRepo->delete($data['id']);
        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Get all users in db
     */
    public function getAllUsers() {
        return $this->userRepo->all();
    }

    public function uploadUserPicture(Request $request) {
        if ($request->hasFile('picture')) {
            $picture = $this->usersService->uploadUserPicture($request->file('picture'));
            return new JsonResponse([
                'success' => true,
                'message' => $picture
            ]);
        }
        return new JsonResponse([
            'success' => false,
            'message' => ''
        ]);
    }
}
