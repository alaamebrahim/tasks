<?php

namespace App\DB\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    public function user () {
        return $this->hasOne('App\DB\Models\User');
    }
}
