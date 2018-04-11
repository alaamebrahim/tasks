<?php

namespace App\DB\Repositories;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;
use App\DB\Models\Notifications as Notification;
use Illuminate\Support\Facades\DB;

class NotificationsRepository extends Repository {
    public function model () {
        return 'App\DB\Models\Notifications';
    }

    /**
     * Returns all notifications for an user
     */
    public function getAllNotificationsByUser ($id) {
        return DB::table('tasks')
                    ->leftJoin('users', 'notifications.user_id', '=', 'users.id')
                    ->orderBy('notifications.created_at', 'desc')
                    ->where('notifications.user_id', '=', $id)
                    ->select('notifications.*', 'users.first_name', 'users.last_name')
                    ->get();
    }
}