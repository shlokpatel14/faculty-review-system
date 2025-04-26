<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Http\Resources\StudentResource;
use App\Http\Resources\FacultyResource;
use App\Http\Resources\HODResource;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\HOD;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    // ------------------------
    // STUDENT AUTH
    // ------------------------
    public function studentRegistration(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'enrollment' => 'required|unique:students',
            'name' => 'required|string',
            'email' => 'required|email|unique:students',
            'password' => 'required|min:6',
            'mobile_no' => 'required|unique:students',
            'branch' => 'required|string',
            'semester' => 'required',//Changed department_id to required
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
            'semester' => $request->semester,
            'department_id' => $request->department_id
        ]);

        return response()->json([
            'message' => 'Student registered successfully',
            'data' => new StudentResource($student)
        ], 201);
    }

    public function studentLogin(Request $request)
    {
        $request->validate([
            'enrollment' => 'required',
            'password' => 'required'
        ]);

        $student = Student::where('enrollment', $request->enrollment)->first();

        if (! $student || ! Hash::check($request->password, $student->password)) {
            throw ValidationException::withMessages([
                'enrollment' => ['The provided credentials are incorrect.'],
            ]);
        }
        $token = $student->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $student->createToken('auth-token')->plainTextToken,
            'student' => $student
        ]);
    }

    // ------------------------
    // FACULTY AUTH
    // ------------------------
    
    public function facultyRegistration(Request $request)
{
    // Ensure only HOD can access this
    $user = Auth::user();
    if (!$user || !$user instanceof \App\Models\HOD) {
        return response()->json([
            'message' => 'Unauthorized. Only HODs can register faculty.'
        ], 403);
    }

    $validator = Validator::make($request->all(), [
        'faculty_id' => 'required|unique:faculty',
        'name' => 'required|string',
        'email' => 'required|email|unique:faculty',
        'password' => 'required|min:6',
        'mobile_no' => 'required|unique:faculty',
        'department_id' => 'nullable|exists:departments,department_id',
        'branch' => 'required|string'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    $faculty = Faculty::create([
        'faculty_id' => $request->faculty_id,
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'mobile_no' => $request->mobile_no,
        'department_id' => $request->department_id,
        'branch' => $request->branch
    ]);

    return response()->json([
        'message' => 'Faculty registered successfully',
        'data' => new FacultyResource($faculty)
    ], 201);
}

    public function facultyLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $faculty = Faculty::where('email', $request->email)->first();

        if (! $faculty || ! Hash::check($request->password, $faculty->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        $token = $faculty->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $faculty->createToken('auth-token')->plainTextToken,
            'faculty' => $faculty
        ]);
    }

    // ------------------------
    // HOD AUTH
    // ------------------------
    public function hodRegistration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hod_id' => 'required|unique:hods',
            'name' => 'required|string',
            'email' => 'required|email|unique:hods',
            'password' => 'required|min:6',
            'mobile_no' => 'required|unique:hods',
            'department_id' => 'nullable|exists:departments,department_id',
            'branch'=> 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        

        $hod = HOD::create([
            'hod_id' => $request->hod_id,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'mobile_no' => $request->mobile_no,
            'department_id' => $request->department_id,
            'branch' => $request->branch
        ]);

        return response()->json($hod, 201);
    }

    public function hodLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $hod = HOD::where('email', $request->email)->first();

        if (! $hod || ! Hash::check($request->password, $hod->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $hod->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $hod->createToken('auth-token')->plainTextToken,
            'hod' => $hod
        ]);
    }

    // ------------------------
    // LOGOUT + PROFILE
    // ------------------------
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}
