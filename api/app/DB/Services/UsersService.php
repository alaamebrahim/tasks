<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use App\DB\Models\Notifications;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\TasksRepository as TaskRepo;
use Intervention\Image\Facades\Image;
class UsersService {

    private $userRepo;
    private $to = [];
    private $taskRepo;
    
    /**
     * Constructor
     */
    public function __construct (
        UserRepo $userRepo,
        TaskRepo $taskRepo ){
        $this->userRepo = $userRepo;
    }

    public function getAllUsers() {
        return $this->userRepo->getAllUsers();
    }

    public function uploadUserPicture($image) {
        /*$name = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = storage_path('/app/images');
        $path = 'uploads' . DIRECTORY_SEPARATOR . 'user_files' . DIRECTORY_SEPARATOR;
        $destinationPath = public_path($path); // upload path
        $image->move($destinationPath, $name);
        return $name;*/

        //
        $name = time().'.'.$image->getClientOriginalExtension();
        $path = 'uploads' . DIRECTORY_SEPARATOR . 'user_files' . DIRECTORY_SEPARATOR;
        $destinationPath = public_path($path);
        $img = Image::make($image->getRealPath());
        $img->resize(200, null, function ($constraint) {
		    $constraint->aspectRatio();
		})->save($destinationPath.$name);
        //Lets save it to server now..
        //$path = 'uploads' . DIRECTORY_SEPARATOR . 'user_files' . DIRECTORY_SEPARATOR;
        //$destinationPath = public_path($path);
        //$image->move($destinationPath, $name);
        return $name;
    }
    
}