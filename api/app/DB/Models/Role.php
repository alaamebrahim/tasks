<?php

namespace App\DB\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public function users () {
        return $this->hasMany('App\DB\Models\User');
    }
}
