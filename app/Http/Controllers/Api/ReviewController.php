<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Http\Controllers\Api\Controller;
use App\Http\Resources\ReviewResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function index() {
        $reviews = Review::get();
        if ($reviews->isEmpty()) return response()->json(['message' => 'No reviews found'], 200);
        else return response()->json($reviews, 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'review_id' => 'required|unique:reviews',
            'enrollment' => 'required|exists:students,enrollment',
            'faculty_id' => 'required|exists:faculty,faculty_id',
            'rating_parameter1' => 'required|integer|min:1|max:5',
            'rating_parameter2' => 'required|integer|min:1|max:5',
            'rating_parameter3' => 'required|integer|min:1|max:5',
            'rating_parameter4' => 'required|integer|min:1|max:5',
            'rating_parameter5' => 'required|integer|min:1|max:5', 
            'rating_parameter6' => 'required|integer|min:1|max:5',
            'rating_parameter7' => 'required|integer|min:1|max:5',
            'rating_parameter8' => 'required|integer|min:1|max:5',
            'rating_parameter9' => 'required|integer|min:1|max:5',
            'course_id' => 'required|exists:courses,course_id',
            'course_name' => 'required|string|exists:courses,course_name',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        $review = Review::create([
            'review_id' => $request->review_id,
            'enrollment' => $request->enrollment,
            'faculty_id' => $request->faculty_id,
            'rating_parameter1' => $request->rating_parameter1,
            'rating_parameter2' => $request->rating_parameter2,
            'rating_parameter3' => $request->rating_parameter3,
            'rating_parameter4' => $request->rating_parameter4,
            'rating_parameter5' => $request->rating_parameter5, 
            'rating_parameter6' => $request->rating_parameter6,
            'rating_parameter7' => $request->rating_parameter7,
            'rating_parameter8' => $request->rating_parameter8,
            'rating_parameter9' => $request->rating_parameter9,
            'course_id' => $request->course_id,
            'course_name' => $request->course_name
        ]);

        return response()->json([
            'message' => 'Review added successfully',
            'data' => new ReviewResource($review)
        ], 200);
        
    }

    public function show($id) {
        $review = Review::find($id);
        if (!$review) return response()->json(['message' => 'Review not found'], 404);
        return response()->json($review, 200);
    }
    public function show_review_by_course($course_id) {
        $review = Review::find($cource_id);
        if (!$review) return response()->json(['message' => 'Review not found'], 404);
        return response()->json($review, 200);
    }
    public function show_review_by_faculty($faculty_id) {
        $review = Review::find($faculty_id);
        if (!$review) return response()->json(['message' => 'Review not found'], 404);
        return response()->json($review, 200);
    }
    public function show_review_by_student($student_id) {
        $review = Review::find($student_id);
        if (!$review) return response()->json(['message' => 'Review not found'], 404);
        return response()->json($review, 200);
    }
}
