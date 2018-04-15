<?php

namespace App\Http\Controllers\Mailbox;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exception\HttpResponseException;
use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Repositories\MailboxRepository as MailboxRepo;
use App\DB\Models\Mailbox;
use App\DB\Services\UsersService as UsersService;
use App\DB\Services\MailboxService as MailboxService;
use Carbon\Carbon;
class MailboxController extends Controller
{
    private $userRepo;
    private $usersService;
    private $mailboxService;
    private $MailboxRepo;


    public function __construct(
        UserRepo $userRepo,
        UsersService $usersService,
        MailboxService $mailboxService,
        MailboxRepo $mailboxRepo
    ) {
        $this->userRepo = $userRepo;
        $this->usersService = $usersService;
        $this->mailboxService = $mailboxService;
        $this->mailboxRepo = $mailboxRepo;
    }

    public function sendNewEmail(Request $request) {
        // Validation rules
        try {
            $this->validate($request, [
                'sender_id' => 'required',
                'receiver_id' => 'required',
                'subject' => 'required',
                'message' => 'required',
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
        $receiverIds[] = $data['receiver_id'];
        // Remove user id from object so we can deal with it individually
        unset($data['receiver_id']);

        //Set dates
        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();

        //Loop data
        $dataForSave = []; 
        $usersNotReceived = [];
        for($i=0; $i<count($receiverIds[0]); $i++) {
            // Extract users ids
            $data['receiver_id'] = $receiverIds[0][$i];
            $dataForSave[] = $data;
            // Extract users emails
            $user = $this->userRepo->find($data['receiver_id']);
            // send an email.
            if(!$this->mailboxService->sendNewEmail($data, $user->email)) {
                $usersNotReceived[] = $user->first_name . ' ' . $user->last_name;
            }
        }
        Mailbox::insert($dataForSave);

        // return success obj as json
        return new JsonResponse([
            'success' => true,
            'message' => '',
            'usersNotReceived' => $usersNotReceived
        ]);
    }

    public function getUserMails($id) {
        //return $this->mailboxService->getUserMails($id);
    }

    /**
     * Returns list of inbox except trashed
     */
    public function getUserInbox($id) {
        return $this->mailboxService->getUserInbox($id);
    }

    /**
     * Returns list of outbox mails
     */
    public function getUserOutbox($id) {
        return $this->mailboxService->getUserOutbox($id);
    }

    /**
     * Returns Starred user inbox mails
     */
    public function getUserInboxStarred($id) {
        return $this->mailboxService->getUserInboxStarred($id);
    }

    /**
     * Returns user trash inbox mails
     */
    public function getUserInboxTrash($id) {
        return $this->mailboxService->getUserInboxTrash($id);
    }

    /**
     * Sets mailbox status (readed/unreaded)
     */
    public function setMailStatus(Request $request) {
        $this->mailboxService->updateMailReadStatus($request->id, $request->readed);
    }

    /**
     * Sets mail starred status
     */
    public function setMailStarStatus(Request $request) {
        $this->mailboxService->updateMailStarStatus($request->id, $request->starred);
    }

    public function setMailTrashStatus(Request $request) {
        $this->mailboxService->setMailTrashStatus($request->id, $request->trash);
    }

}
