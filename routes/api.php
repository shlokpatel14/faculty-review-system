<?php
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\HODController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('student/register', [AuthController::class, 'studentRegistration']);
    Route::post('student/login', [AuthController::class, 'studentLogin']);
    Route::post('faculty/register', [AuthController::class, 'facultyRegistration']);
    Route::post('faculty/login', [AuthController::class, 'facultyLogin']);
    Route::post('hod/register', [AuthController::class, 'hodRegistration']);
    Route::post('hod/login', [AuthController::class, 'hodLogin']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::middleware('auth:sanctum')->post('/auth/faculty/register', [AuthController::class, 'facultyRegistration']);

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
Route::get('/faculty/by-department/{department_id}', [FacultyController::class, 'getFacultyByDepartment']);

// Course
Route::apiResource('courses', CourseController::class);
Route::get('/courses/{course_id}', [CourseController::class, 'show']);
Route::post('/courses/student', [CourseController::class, 'getCoursesForStudent']);
Route::post('/courses/faculty', [CourseController::class, 'getCoursesForFaculty']);
Route::get('/reviews/course/{course_id}', [ReviewController::class, 'getReviewsByCourse']);
Route::get('/reviews/summary/{course_id}', [ReviewController::class, 'summary']);
Route::get('/students/by-department/{department_id}', [StudentController::class, 'getStudentsByDepartment']);
Route::post('/courses/department', [CourseController::class, 'getCoursesByDepartment']);

// routes/api.php



Route::middleware('auth:sanctum')->get('/reviews/report/{course_id}', [ReviewController::class, 'summary']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

