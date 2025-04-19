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
        if(!Schema::hasTable('departments')){
        Schema::create('departments', function (Blueprint $table) {
        
            $table->integer('department_id')->primary();
                $table->string('name');
                $table->json('array_data'); // Use JSON column to store array data
                $table->timestamps();
            });
        }
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
