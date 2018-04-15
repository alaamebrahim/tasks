<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMailboxTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('mailbox', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('sender_id')->unsigned()->index();
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedInteger('receiver_id')->unsigned()->index();
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('subject');
            $table->string('message');
            $table->string('attachment')->nullable;
            $table->boolean('starred');
            $table->boolean('readed');
            $table->boolean('draft');
            $table->boolean('trash');
            $table->timestamps();
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
