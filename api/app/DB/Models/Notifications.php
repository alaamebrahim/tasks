<?php

namespace App\DB\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    public function user () {
        return $this->hasOne('App\DB\Models\User');
    }

    public function task () {
        return $this->hasOne('App\DB\Models\Tasks');
    }
}
