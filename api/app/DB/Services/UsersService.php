<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;

class UsersService {

    private $userRepo;
    private $to = [];
    
    /**
     * Constructor
     */
    public function __construct (UserRepo $userRepo) {
        $this->userRepo = $userRepo;
    }

    public function uploadUserPicture($image) {
        $name = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = storage_path('/app/images');
        $path = 'uploads' . DIRECTORY_SEPARATOR . 'user_files' . DIRECTORY_SEPARATOR;
        $destinationPath = public_path($path); // upload path
        $image->move($destinationPath, $name);
        return $name;
    }
}