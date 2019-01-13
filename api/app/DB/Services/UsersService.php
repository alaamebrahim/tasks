<?php

namespace App\DB\Services;

use App\DB\Repositories\UserRepository as UserRepo;
use Illuminate\Support\Facades\Log;
use App\DB\Repositories\ProjectsRepository as ProjectRepo;
use Intervention\Image\Facades\Image;
class UsersService {

    private $userRepo;
    private $to = [];
    private $projectRepo;

    /**
     * Constructor
     * @param UserRepo $userRepo
     * @param ProjectRepo $projectRepo
     */
    public function __construct (
        UserRepo $userRepo,
        ProjectRepo $projectRepo ){
        $this->userRepo = $userRepo;
        $this->projectRepo = $projectRepo;
    }

    /**
     * @return array
     */
    public function getAllUsers() {
        return $this->userRepo->getAllUsers();
    }

    /**
     * @param $image
     * @return string
     */
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

    /**
     * @param $projectId
     * @return null|void
     */
    public function getUsersByProjectId($projectId) {
        try {
            $project = $this->projectRepo->getProjectById($projectId);
            if($project == null || $project->allowed_users == "[]") {
                return null;
            }

            $ids = json_decode($project->allowed_users);
            $users = $this->userRepo->getAllUsersByIds($ids);
            return $users;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
        return null;
    }

    public function getNonAdminUsers(){
       try {
           $users = $this->userRepo->getNonAdminUsers();
           return $users;
       }  catch (\Exception $e) {
           Log::error($e->getMessage());
       }
       return null;
    }
    
}