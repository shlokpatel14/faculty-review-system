<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Http\Controllers\Api\StudentResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    // Get all students
    public function index() {
        $students = Student::get();
        if($students->isEmpty()) return response()->json(['message' => 'No students found'], 200);
        else return response()->json($students, 200);   
    }

    // Register a new student
    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'enrollment' => 'required|unique:students',
            'name' => 'required|string',
            'email' => 'required|email|unique:students',
            'password' => 'required|min:6',
            'mobile_no' => 'required|unique:students',
            'branch' => 'required|string',
//            'semester' => 'required|string',Changed department_id to required
            'department_id' => 'required|exists:departments,department_id'
        ]);
        if($validator->fails()) 
        {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        $student = Student::create([
            'enrollment' => $request->enrollment,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'mobile_no' => $request->mobile_no,
            'branch' => $request->branch,
//            'semester' => $request->semester,
            'department_id' => $request->department_id
        ]);

        return response()->json([
            'message' => 'Student registered successfully',
            'data' => new StudentResource($student)
        ], 201);
    }

    // Get a specific student
    public function show($id) {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);
        return response()->json($student, 200);
    }
}
