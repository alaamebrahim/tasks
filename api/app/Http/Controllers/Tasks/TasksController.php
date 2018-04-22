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
use App\DB\Services\NotificationsService as NotificationsService;
use App\DB\Services\TasksService as TasksService;
use App\DB\Models\User;
use App\DB\Models\Tasks;
use Carbon\Carbon;

class TasksController extends Controller
{
    private $userRepo;
    private $taskRepo;
    private $roleRepo;
    private $notificationsService;
    private $tasksService;

    public function __construct(
        UserRepo $userRepo,
        TaskRepo $taskRepo,
        RoleRepo $roleRepo,
        NotificationsService $notificationsService,
        TasksService $tasksService
    ) {
        $this->userRepo = $userRepo;
        $this->taskRepo = $taskRepo;
        $this->roleRepo = $roleRepo;
        $this->notificationsService = $notificationsService;
        $this->tasksService = $tasksService;
    }

    /**
     * Post add new user
     * @Returns JsonResponse
     */
    public function addNewTask(Request $request) {      
        // Validation rules
        try {
            $this->validate($request, [
                'title' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'user_id' => 'required',
                'description' => 'required'
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $data = $request->all();

        // Put user id in separate var
        $userIds[] = $data['user_id'];
        // Remove user id from object so we can deal with it individually
        unset($data['user_id']);

        //Set dates
        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();

        //Notifications and mails
        $message = trans('messages.notifications.mail.message',['title' => $data['title']]) . "\n";

        //Loop data
        $dataForSave = []; 
        $users_emails = [];
        for($i=0; $i<count($userIds[0]); $i++) {
            // Extract users ids
            $data['user_id'] = $userIds[0][$i];
            $dataForSave[]   = $data;
            // Extract users emails
            $user_email      = $this->userRepo->find($data['user_id'])->email;
            $users_emails[]  = $user_email;
        }
        Tasks::insert($dataForSave);

        $added_ids = $this->taskRepo->getLastAddedTasksIdByDateCreated($data['created_at']);

        // Save notifications
        foreach($added_ids as $key => $value) {
            $this->notificationsService->addNewNotification($data['user_id'], $value->id, $message);
        }

        
        $message .= trans('messages.notifications.mail.message2');
        $this->notificationsService->sendNotificationByMail($users_emails, $message);
        //$this->taskRepo->saveModel($dataForSave);

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
        try {
            $this->validate($request, [
                'title' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'user_id' => 'required',
                'description' => 'required'
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        $data = $request->all();

        $data['updated_at'] = Carbon::now();
        unset($data['first_name']);
        unset($data['last_name']);
        unset($data['notifications']);
        
        $data['completed'] = $data['progress'] == 100 ? 1 : 0;
        $this->taskRepo->update($data, $data['id']);
        //$this->taskget countRepo->saveModel($saveData);

        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => $data
        ]);
    }

    /**
     * Delete a user
     * @Returns JsonResponse
     */
    public function deleteExistingTask(Request $request) {       
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
        return $this->tasksService->getAllTasks();
    }

    /**
     * Get list of completed tasks
     */
    public function getCompletedTasks() {
        return $this->tasksService->getAllTasksByStatus(1);
    }

    /**
     * Get list of uncompleted tasks
     */
    public function getUncompletedTasks() {
        return $this->tasksService->getAllTasksByStatus(0);
    }

    /**
     * Uploads attachment an return its name
     */
    public function UploadAttachment(Request $request) {
        // Validation rules
        // var_dump($request);
        try {
            $this->validate($request, [
                'attachment' => 'required|image',
            ]);
        } catch (ValidationException $e) {
            //var_dump($e);
            return new JsonResponse([
                'success' => false,
                'message' => trans('messages.validations.error')
            ]);
        }
        if ($request->hasFile('attachment')) {
            $picture = $this->tasksService->uploadTaskAttachment($request->file('attachment'));
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
