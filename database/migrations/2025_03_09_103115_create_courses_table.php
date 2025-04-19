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
        if (!Schema::hasTable('courses')) {
        Schema::create('courses', function (Blueprint $table) {
                $table->unsignedBigInteger('course_id')->primary();
                $table->string('course_name');
                $table->unsignedBigInteger('faculty_id');
                $table->unsignedBigInteger('department_id');
                $table->foreign('department_id')->references('department_id')->on('departments')->onDelete('cascade');
                $table->foreign('faculty_id')->references('faculty_id')->on('faculty')->onDelete('cascade');
                $table->integer('semester');
                $table->timestamps();
            });
        }    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
