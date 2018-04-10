<?php

namespace App\Http\Controllers\Tasks;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exception\HttpResponseException;
use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Repositories\RoleRepository as RoleRepo;
use App\DB\Repositories\TasksRepository as TaskRepo;
use App\DB\Models\User;
use App\DB\Models\Tasks;
use Carbon\Carbon;

class TasksController extends Controller
{
    private $userRepo;
    private $taskRepo;
    private $roleRepo;

    public function __construct(UserRepo $userRepo, TaskRepo $taskRepo, RoleRepo $roleRepo) {
        $this->userRepo = $userRepo;
        $this->taskRepo = $taskRepo;
        $this->roleRepo = $roleRepo;
    }

    /**
     * Post add new user
     * @Returns JsonResponse
     */
    public function addNewTask(Request $request) {
        // Validation rules
        $this->validate($request, [
            'title' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'user_id' => 'required',
            'description' => 'required'
        ]);
        $data = $request->all();

        // Put user id in separate var
        $userIds[] = $data['user_id'];
        // Remove user id from object so we can deal with it individually
        unset($data['user_id']);

        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();

        $saveData = [];
        for($i=0; $i<count($userIds[0]); $i++) {
            $data['user_id'] = $userIds[0][$i];
            $saveData[] = $data;
        }
        Tasks::insert($saveData);
        //$this->taskRepo->saveModel($saveData);

        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => $userIds
        ]);
    }

    /**
     * Post add new user
     * @Returns JsonResponse
     */
    public function updateExistingTask(Request $request) {
        // Validation rules
        $this->validate($request, [
            'title' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'user_id' => 'required',
            'description' => 'required'
        ]);
        $data = $request->all();

        $data['updated_at'] = Carbon::now();
        unset($data['first_name']);
        unset($data['last_name']);
        $data['completed'] = $data['progress'] == 100 ? 1 : 0;
        $this->taskRepo->update($data, $data['id']);
        //$this->taskRepo->saveModel($saveData);

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
    public function deleteExistingTask(Request $request) {        
        $data = $request->all();
        
        // save user object
        $this->taskRepo->delete($data['id']);
        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Get all tasks in db depending on current user
     */
    public function getAllTasks() {
        $current_user = JWTAuth::parseToken()->authenticate();
        if(!$current_user) {
            return null;
        }
        $role_name = $this->roleRepo->getRoleName($current_user['attributes']['role_id']);
        if($role_name == 'root' || $role_name == 'admin') {
            return $this->taskRepo->getAllTasks();
        } else {
            return $this->userRepo->find($current_user['attributes']['id'])->tasks;
        }
        
    }
}
