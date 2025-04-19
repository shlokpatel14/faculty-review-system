<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Http\Controllers\Api\Controller;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function index() {
        $courses = Course::get();
        if ($courses->isEmpty()) return response()->json(['message' => 'Courses not found'], 200);
        else return response()->json($courses, 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|unique:courses',
            'course_name' => 'required|string|unique:courses',
            'department_id' => 'required|exists:departments,department_id',
            'semester' => 'required|integer',
            'faculty_id' => 'required|exists:faculty,faculty_id'
        ]);
        if ($validator->fails()) {  
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $course = Course::create([
            'course_id' => $request->course_id,
            'course_name' => $request->course_name,
            'department_id' => $request->department_id,
            'semester' => $request->semester,
            'faculty_id' => $request->faculty_id
        ]);
        return response()->json($course, 201);
    }

    public function show($id) {
        $course = Course::find($id);
        if (!$course) return response()->json(['message' => 'Course not found'], 404);
        return response()->json($course, 200);
    }
}

