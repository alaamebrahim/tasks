<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mailbox;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $mailbox)
    {
        $this->mailbox = $mailbox;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->mailbox['subject'])->view('emails.new-mail');
    }
}
