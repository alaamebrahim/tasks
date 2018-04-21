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
use App\DB\Services\RolesService as RolesService;
use Carbon\Carbon;

class UsersController extends Controller
{
    private $userRepo;

    public function __construct(
        UserRepo $userRepo,
        UsersService $usersService,
        RolesService $roleService
    ) {
        $this->userRepo = $userRepo;
        $this->usersService = $usersService;
        $this->roleService = $roleService;
    }

    /**
     * Post add new user
     * @return JsonResponse
     */
    public function addNewUser(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'email' => 'required|unique:users|email',
                'role_name' => 'required',
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
        $data['created_at'] = Carbon::now();
        $data['password'] = app('hash')->make($data['password']);
        $role = $data['role_name'];
        //var_dump($data);
        // save user object
        //$user = User::create($data);
        $this->userRepo->saveModel($data);

        $user_id = $this->userRepo->findBy('created_at', $data['created_at'])->id;

        //set user role
        $this->roleService->setUserRole($user_id, [$role]);

        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Post add new user
     * @return JsonResponse
     */
    public function updateExistingUser(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'email' => 'required|email',
                'role_name' => 'required',
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
        $role = $data['role_name'];
        // save user object
        $this->userRepo->update($data,$data['id']);

        //set user role
        $this->roleService->setUserRole($data['id'], [$role]);

        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Delete a user
     * @return JsonResponse
     */
    public function deleteExistingUser(Request $request) {        
        // Validation rules
        try {
            $this->validate($request, [
                'id' => 'required',
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
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
     * block/unbloc a user
     * @return JsonResponse
     */
    public function updateBlockStatus(Request $request) {        
        // Validation rules
        try {
            $this->validate($request, [
                'id' => 'required',
                'is_blocked' => 'required'
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $data = $request->all();
        $newData['is_blocked'] = !$data['is_blocked'];
        // save user object
        $this->userRepo->update($newData,$data['id']);

        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Get all users in db
     * @return Collection
     */
    public function getAllUsers() {
        return $this->userRepo->all();
    }

    /**
     * Uploads an attachment and return reponse
     * @return JsonResponse
     */
    public function uploadUserPicture(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        //
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
