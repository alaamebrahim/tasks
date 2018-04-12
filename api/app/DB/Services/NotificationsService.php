<?php

namespace App\DB\Services;

use App\DB\Repositories\NotificationsRepository as NotifyRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;

class NotificationsService {

    private $notifyRepo;
    private $to = [];
    
    /**
     * Constructor
     */
    public function __construct (NotifyRepo $notifyRepo) {
        $this->notifyRepo = $notifyRepo;
    }

    /**
     * Adds new notification to database.
     */
    public function addNewNotification($user_id, $task_id, $text) {
        $notification = new Notifications();
        $notification->user_id = $user_id;
        $notification->task_id = $task_id;
        $notification->text = $text;
        $notification->save();
    }

    public function sendNotificationByMail($to = [], $message) {
        $this->to = $to;
        Mail::raw($message, function($msg) { 
            $msg->to($this->to); 
            $msg->subject(trans('messages.notifications.mail.subject'));
            $msg->from(['admin@jalyat.com']); 
        });
    }
}