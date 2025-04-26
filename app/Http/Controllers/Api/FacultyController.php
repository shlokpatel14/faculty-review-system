<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Faculty;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\FacultyResource;

class FacultyController extends Controller
{
    public function index() {
        $faculty = Faculty::get();
        if (!$faculty) return response()->json(['message' => 'Faculty not found'], 200);
        else return response()->json($faculty, 200);
    }

    public function store(Request $request) {
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

    public function show($id) {
        $faculty = Faculty::find($id);
        if (!$faculty) return response()->json(['message' => 'Faculty not found'], 404);
        return response()->json($faculty, 200);
    }
    public function getFacultyByDepartment($department_id)
{
    $faculty = Faculty::where('department_id', $department_id)->get();

    if ($faculty->isEmpty()) {
        return response()->json(['message' => 'No faculty found for this department.'], 404);
    }

    return response()->json($faculty);
}

}
