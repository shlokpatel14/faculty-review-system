<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\HOD;

class AuthController extends Controller
{
    // Student Registration
    public function registerStudent(Request $request)
    {
        $request->validate([
            'enrollment' => 'required|unique:students',
            'name' => 'required',   
            'email' => 'required|email|unique:students',
            'password' => 'required|min:6',
            'mobile_no' => 'required|unique:students',
            'branch' => 'required',
//            'semester' => 'required',
            'department_id' => 'required|exists:departments,id'
        ]);

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

        $token = $student->createToken('student-token')->plainTextToken;

        return response()->json(['student' => $student, 'token' => $token], 201);
    }

    // Student Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $student = Student::where('email', $request->email)->first();

        if (!$student || !Hash::check($request->password, $student->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $student->createToken('student-token')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }
}
