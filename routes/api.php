<?php
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\HODController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Student 
Route::apiResource('students', StudentController::class);

// Review
Route::apiResource('reviews', ReviewController::class);

// Faculty
Route::apiResource('faculty', FacultyController::class);

//Department
Route::apiResource('departments', DepartmentController::class); 

// HOD
Route::apiResource('hods', HODController::class);

// Course
Route::apiResource('courses', CourseController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
