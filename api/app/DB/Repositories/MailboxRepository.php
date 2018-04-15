<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use Illuminate\Support\Facades\DB;
use App\DB\Models\User;
use App\DB\Models\Mailbox;

class MailboxRepository extends Repository {
    
    public function model () {
        return 'App\DB\Models\Mailbox';
    }

    public function getUserMails($id) {
        return User::with('mailboxSender', 'mailboxReceiver')
            ->where('id', '=', $id)
            ->get();
    }

    public function getUserInbox($id) {
        return Mailbox::with('sender')
            ->where('mailbox.receiver_id', '=', $id)
            ->where('mailbox.trash', '=', false)
            ->orderBy('mailbox.id', 'desc')
            ->get();

    }

    public function getUserOutbox($id) {
        return Mailbox::with('receiver')
            ->where('mailbox.sender_id', '=', $id)
            ->orderBy('mailbox.id', 'desc')
            ->get();
    }

    public function getUserInboxStarred($id) {
        return Mailbox::with('sender')
            ->where('mailbox.receiver_id', '=', $id)
            ->where('mailbox.trash', '=', false)
            ->where('mailbox.starred', '=', true)
            ->orderBy('mailbox.id', 'desc')
            ->get();
    }

    public function getUserInboxTrash($id) {
        return Mailbox::with('sender')
            ->where('mailbox.receiver_id', '=', $id)
            ->where('mailbox.trash', '=', true)
            ->orderBy('mailbox.id', 'desc')
            ->get();
    }

}