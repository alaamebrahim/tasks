<?php

namespace App\DB\Repositories;

use App\DB\Models\Comments;
use Bosnadev\Repositories\Eloquent\Repository;

class CommentsRepository extends Repository
{
    public function model()
    {
        return 'App\DB\Models\Comments';
    }

    /**
     * Get comments of a task.
     * @param $taskId
     * @return array
     */
    public function getCommentsByTaskId($taskId)
    {
        $comments = Comments::leftJoin('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.*', 'users.first_name', 'users.last_name', 'users.picture')
            ->where('comments.task_id', '=', $taskId)
            ->get();
        return collect($comments)->toArray();
    }

    /**
     * @param $taskId
     * @return mixed
     */
    public function deleteByTaskId($taskId) {
        $deletedRows =  Comments::where('task_id', '=', $taskId)->delete();
        return $deletedRows;
    }

}