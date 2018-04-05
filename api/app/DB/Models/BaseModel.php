<?php

namespace App\DB\Models;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    protected $rules = array();

    protected $errors;

    public function validate($data)
    {
        // make a new validator object
        $v = Validator::make($data, $this->rules);

        // check for failure
        if ($v->fails())
        {
            // set errors and return false
            $this->errors = $v->errors;
            return false;
        }

        // validation pass
        return true;
    }

    public function errors()
    {
        return $this->errors;
    }
}