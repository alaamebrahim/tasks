<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('text');
            $table->boolean('unreaded');
            $table->boolean('starred');
            $table->unsignedInteger('task_id')->unsigned()->index();
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->unsignedInteger('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
            //
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
