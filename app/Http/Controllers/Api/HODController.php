<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\HOD;
use App\Http\Controllers\Api\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class HODController extends Controller
{
    public function index() {
        $HOD = HOD::get();
        if (!$HOD) return response()->json(['message' => 'HOD not found'], 200);
        else return response()->json($HOD, 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'hod_id' => 'required|unique:hods',
            'name' => 'required|string',
            'email' => 'required|email|unique:hods',
            'password' => 'required|min:6',
            'mobile_no' => 'required|unique:hods',
            'department_id' => 'nullable|exists:departments,department_id'
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
            'department_id' => $request->department_id
        ]);

        return response()->json($hod, 201);
    }

    public function show($id) {
        $hod = HOD::find($id);
        if (!$hod) return response()->json(['message' => 'HOD not found'], 404);
        return response()->json($hod, 200);
    }
}
