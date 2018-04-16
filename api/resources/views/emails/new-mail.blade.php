<h1>{{ trans('messages.site-name') }}</h1>
<p>{{ trans('messages.notifications.mail.new-mail') }}</p>
<h3>{{ $mailbox['subject'] }}</h3>
<h4>{{ $mailbox['sender']['first_name'] }} {{ $mailbox['sender']['last_name'] }}</h4>
<p>{{!! $mailbox['message'] !!}}</p>
