<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Department;
use App\Http\Controllers\Api\Controller;
use Illuminate\Support\Facades\Validator;


class DepartmentController extends Controller
{
    // Get all departments
    public function index() {
        $departments = Department::get();
        if ($departments->isEmpty()) return response()->json(['message' => 'Departments not found'], 200);
        else return response()->json($departments, 200);
    }

    // Create a new department
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'department_id' => 'required|integer|unique:departments',
            'name' => 'required|string|unique:departments',
            'array_data' => 'nullable|array'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $department = Department::create([
            'department_id' => $request->department_id,
            'name' => $request->name,
        ]);
        return response()->json([
            'message' => 'Department created successfully',
            'data' => $department
        ], 201);
    }

    // Get a specific department
    public function show($id) {
        $department = Department::find($id);
        if (!$department) return response()->json(['message' => 'Department not found'], 404);
        return response()->json($department, 200);
    }
}
