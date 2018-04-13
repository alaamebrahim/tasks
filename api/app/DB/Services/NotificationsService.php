<?php

namespace App\DB\Services;

use App\DB\Repositories\NotificationsRepository as NotifyRepo;
use App\DB\Repositories\UserRepository as UserRepo;

use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;

class NotificationsService {

    private $notifyRepo;
    private $to = [];
    private $subject;
    private $from = "admin@jalyat.com";
    private $userRepo;

    
    /**
     * Constructor
     */
    public function __construct (
        NotifyRepo $notifyRepo,
        UserRepo $userRepo
    ) {
        $this->notifyRepo = $notifyRepo;
        $this->userRepo = $userRepo;
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
        $this->sendMail($to, trans('messages.notifications.mail.subject'), $message);
    }

    public function sendSingleNotification($request) {
        // Save to Database
        $this->addNewNotification($request->user_id, $request->task_id, $request->text);
        // Get user email
        $user_email = $this->userRepo->find($request->user_id)->email;
        // Send mail to user
        $message = trans('messages.notifications.mail.remember.body') . "\n";
        $message .= trans('messages.notifications.mail.remember.text') . "\n";
        $message .= $request->text;
        $this->sendMail($user_email, trans('messages.notifications.mail.remember.title'), $message);
    }

    public function sendMail($to = [], $subject, $message) {
        $this->to = $to;
        $this->subject = $subject;
        Mail::raw($message, function($msg) { 
            $msg->to($this->to); 
            $msg->subject($this->subject);
            $msg->from([$this->from]); 
        });
    }
}
