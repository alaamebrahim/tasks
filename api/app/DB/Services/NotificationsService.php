<?php

namespace App\DB\Services;

use App\DB\Repositories\NotificationsRepository as NotifyRepo;
use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Services\MailboxService as MailboxService;

use App\DB\Models\Notifications;

class NotificationsService {

    private $notifyRepo;
    private $userRepo;
    private $mailboxService;


    /**
     * Constructor
     * @param NotifyRepo $notifyRepo
     * @param UserRepo $userRepo
     * @param \App\DB\Services\MailboxService $mailboxService
     */
    public function __construct (
        NotifyRepo $notifyRepo,
        UserRepo $userRepo,
        MailboxService $mailboxService
    ) {
        $this->notifyRepo = $notifyRepo;
        $this->userRepo = $userRepo;
        $this->mailboxService = $mailboxService;
    }

    /**
     * Adds new notification to database.
     * @param $user_id
     * @param $task_id
     * @param $text
     */
    public function addNewNotification($user_id, $task_id, $text) {
        $notification = new Notifications();
        $notification->user_id = $user_id;
        $notification->task_id = $task_id;
        $notification->text = $text;
        $notification->save();
    }

    public function sendNotificationByMail($to = [], $data) {
        $this->mailboxService->sendNotification($to, $data);
    }

    public function sendSingleNotification($request) {
        // Save to Database
        $this->addNewNotification($request->user_id, $request->task_id, $request->text);
        // Get user email
        $user_email = $this->userRepo->find($request->user_id)->email;
        // Send mail to user
        $data = $request->all();
        $this->mailboxService->sendSingleNotification($user_email, $data);
    }
}
