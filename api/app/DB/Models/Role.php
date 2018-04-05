<?php

namespace App\DB\Models;

use App\Models\BaseModel;

class Role extends BaseModel
{
    public function users () {
        return $this->hasMany('App\DB\Models\User');
    }
}
