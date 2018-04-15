<?php

namespace App\DB\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Mailbox extends Model
{
    protected $table= 'mailbox';

    public function sender () {
        return $this->hasOne('App\DB\Models\User', 'id', 'sender_id');
    }

    public function receiver () {
        return $this->hasMany('App\DB\Models\User', 'id', 'receiver_id');
    }
}
