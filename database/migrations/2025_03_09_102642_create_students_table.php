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
        if (!Schema::hasTable('students')) {
        Schema::create('students', function (Blueprint $table) {
                $table->unsignedBigInteger('enrollment')->primary();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('password');
                $table->bigInteger('mobile_no')->unique();
                $table->string('branch');
                $table->unsignedBigInteger('department_id')->nullable();
                $table->rememberToken();
                $table->foreign('department_id')->references('department_id')->on('departments')->onDelete('set null');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
