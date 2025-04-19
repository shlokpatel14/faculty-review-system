<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('reviews')){
        Schema::create('reviews', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('review_id')->primary();
                $table->unsignedBigInteger('enrollment');
                $table->unsignedBigInteger('faculty_id');
                $table->unsignedBigInteger('course_id');
                $table->integer('rating_parameter1');
                $table->integer('rating_parameter2');
                $table->integer('rating_parameter3');
                $table->integer('rating_parameter4');
                $table->integer('rating_parameter5');
                $table->integer('rating_parameter6');
                $table->integer('rating_parameter7');
                $table->integer('rating_parameter8');
                $table->integer('rating_parameter9'); // rating parameter out of 5
                $table->text('comment')->nullable();
                $table->timestamps();
                $table->string('course_name');

                $table->foreign('enrollment')->references('enrollment')->on('students')->onDelete('cascade');
                $table->foreign('faculty_id')->references('faculty_id')->on('faculty')->onDelete('cascade');
                $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
                $table->foreign('course_name')->references('course_name')->on('courses')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
