<?php

namespace App\DB\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = ['id'];
    public function user () {
        return $this->hasOne('App\DB\Models\User');
    }
}
