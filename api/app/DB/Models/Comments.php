<?php

namespace App\DB\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $table = "comments";
    protected $fillable = ['id'];

    public function user () {
        return $this->hasOne('App\DB\Models\User');
    }

    public function task () {
        return $this->hasOne('App\DB\Models\Tasks');
    }
}
