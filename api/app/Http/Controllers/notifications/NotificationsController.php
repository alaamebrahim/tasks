<?php

namespace App\Http\Controllers\Notifications;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exception\HttpResponseException;
use App\DB\Repositories\NotificationsRepository as NotifyRepo;
use App\DB\Models\User;
class UsersController extends Controller
{
    private $notifyRepo;

    public function __construct(NotifyRepo $notifyRepo) {
        $this->notifyRepo = $notifyRepo;
    }

    /**
     * Post add new notification
     * @Returns JsonResponse
     */
    public function addNewNotification(Request $request) {
        // Validation rules
        $this->validate($request, [
            'user_id' => 'required',
            'task_id' => 'required'
        ]);
        $data = $request->all();
        // save user object
        $this->notifyRepo->saveModel($data);
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
    public function updateExistingNotification(Request $request) {
        // Validation rules
        $this->validate($request, [
            'user_id' => 'required',
            'task_id' => 'required'
        ]);
        $data = $request->all();
        
        // save user object
        $this->notifyRepo->update($data,$data['id']);
        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => ''
        ]);
    }

    /**
     * Get all Notifications for a user in db
     */
    public function getUserNotifications($id) {
        return $this->notifyRepo->getAllNotificationsByUser($id);
    }
}
