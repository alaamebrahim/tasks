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
        return DB::table('notifications')
                    ->orderBy('notifications.created_at', 'desc')
                    ->where('notifications.user_id', '=', $id)
                    ->select('notifications.*')
                    ->get();
    }
}