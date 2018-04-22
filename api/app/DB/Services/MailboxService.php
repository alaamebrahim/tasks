<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\MailboxRepository as MailboxRepo;
use App\Mail\NewMail;
use App\Mail\NotificationsAddedMail;

class MailboxService {

    private $userRepo;
    private $to = [];
    private $subject;
    private $from = "admin@jalyat.com";
    private $taskRepo;
    
    /**
     * Constructor
     */
    public function __construct (
        UserRepo $userRepo,
        MailboxRepo $mailboxRepo
    ){
        $this->userRepo = $userRepo;
        $this->mailboxRepo = $mailboxRepo;
    }

    /**
     * Send mail
     */
    public function sendMail($to = [], $subject, $message) {
        $this->to = $to;
        $this->subject = $subject;
        Mail::raw($message, function($msg) { 
            $msg->to($this->to); 
            $msg->subject($this->subject);
            $msg->from([$this->from]); 
        });
    }

    public function sendMailWithTemplate ($to, $data){
        $this->to = $to;
        Mail::to($this->to)
            ->send(new NewMail($data));
    }

    public function sendNotification ($to = [], $data){
        $this->to = $to;
        Mail::to($this->to)
            ->send(new NotificationsAddedMail($data));
    }

    /**
     * Prepares and sends one email to an email
     */
    public function sendNewEmail($data, $email) {
        try {
            // $message = trans('messages.notifications.mail.new-mail') . "\n";
            // $message .= $data['subject'] . "\n";
            // $message .= $data['message'] . "\n";
            $this->sendMailWithTemplate($email, $data);
            return true;
        } catch (Exception $e) {
            return false;
        } 
    }

   /* public function getUserMails($id) {
        $data = $this->mailboxRepo->getUserMails($id)['0'];
        $userMails = [];
        // var_dump($data);
        foreach($data as $user) {
            $userMails['sent'] = $data->mailboxSender;
            //$userMails['user_sent'] = $data->mailboxSender->sender_id;
            $userMails['received'] = $data->mailboxReceiver;
            //$userMails['user_received'] = $user->mailbox_sender->receiver;
        }
        return $data;
    }*/

    public function getUserInbox($id) {
        return $this->mailboxRepo->getUserInbox($id);
    }

    public function getUserOutbox($id) {
        return $this->mailboxRepo->getUserOutbox($id);
    }

    public function getUserInboxStarred($id) {
        return $this->mailboxRepo->getUserInboxStarred($id);
    }

    public function getUserInboxTrash($id) {
        return $this->mailboxRepo->getUserInboxTrash($id);
    }

    /**
     * Update read status for email
     */
    public function updateMailReadStatus($id, $status) {
        $mail = $this->mailboxRepo->find($id);
        if(!$mail) {
            return false;
        }
        return $this->mailboxRepo->update(['readed' => $status], $id);
    }
    
    /**
     * Update read status for email
     */
    public function updateMailStarStatus($id, $status) {
        $mail = $this->mailboxRepo->find($id);
        if(!$mail) {
            return false;
        }
        return $this->mailboxRepo->update(['starred' => $status], $id);
    }
    
    /**
     * Update trash status for email
     */
    public function setMailTrashStatus($id, $status) {
        $mail = $this->mailboxRepo->find($id);
        if(!$mail) {
            return false;
        }
        return $this->mailboxRepo->update(['trash' => $status], $id);
    }
}