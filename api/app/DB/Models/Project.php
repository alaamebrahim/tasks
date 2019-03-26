<?php

namespace App\DB\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['id', 'created_by'];
    public function createdBy () {
        return $this->hasOne('App\DB\Models\User');
    }

    public function tasks(){
        return $this->hasMany(Tasks::class);
    }
}
