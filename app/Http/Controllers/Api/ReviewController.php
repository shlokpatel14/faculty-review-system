<?php


namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Course;
use App\Models\Faculty;
use App\Http\Controllers\Api\Controller;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\FacultyResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function index() {
        $reviews = Review::get();
        return $reviews->isEmpty()
            ? response()->json(['message' => 'No reviews found'], 200)
            : response()->json($reviews, 200);
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

        $review = Review::create($request->only([
            'review_id','enrollment', 'faculty_id', 'rating_parameter1', 'rating_parameter2',
            'rating_parameter3', 'rating_parameter4', 'rating_parameter5', 
            'rating_parameter6', 'rating_parameter7', 'rating_parameter8', 
            'rating_parameter9', 'course_id', 'course_name'
        ]));

        return response()->json([
            'message' => 'Review added successfully',
            'data' => new ReviewResource($review)
        ], 200);
    }

    public function show($id) {
        $review = Review::find($id);
        return $review 
            ? response()->json($review, 200) 
            : response()->json(['message' => 'Review not found'], 404);
    }

    public function getReviewsByCourse($course_id) {
        $reviews = Review::where('course_id', $course_id)->get();
        return $reviews->isEmpty()
            ? response()->json(['message' => 'No reviews found'], 404)
            : response()->json($reviews, 200);
    }

    public function show_review_by_faculty($faculty_id) {
        $review = Review::where('faculty_id', $faculty_id)->get();
        return $review->isEmpty()
            ? response()->json(['message' => 'Review not found'], 404)
            : response()->json($review, 200);
    }

    public function show_review_by_student($student_id) {
        $review = Review::where('enrollment', $student_id)->get();
        return $review->isEmpty()
            ? response()->json(['message' => 'Review not found'], 404)
            : response()->json($review, 200);
    }

    public function summary($course_id)
{
    try {
        // Fetch course
        $course = Course::find($course_id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        // Fetch faculty
        $faculty = Faculty::find($course->faculty_id);

        if (!$faculty) {
            return response()->json(['message' => 'Faculty not found'], 404);
        }

        // Fetch reviews for this course
        $reviews = Review::where('course_id', $course_id)->get();

        if ($reviews->isEmpty()) {
            return response()->json(['message' => 'No reviews found'], 404);
        }

        // Prepare rating summary
        $summary = [];
        for ($i = 1; $i <= 9; $i++) {
            $param = 'rating_parameter' . $i;
            $summary[$param] = [
                1 => $reviews->where($param, 1)->count(),
                2 => $reviews->where($param, 2)->count(),
                3 => $reviews->where($param, 3)->count(),
                4 => $reviews->where($param, 4)->count(),
                5 => $reviews->where($param, 5)->count(),
            ];
        }

        return response()->json([
            'total_reviews' => $reviews->count(),

            'course_info' => [
            'course_id' => $course->course_id,
            'course_name' => $course->course_name,
            'semester' => $course->semester, // ✅ lowercase key
             ],

            'faculty_info' => [
            'faculty_id' => $faculty->faculty_id,
            'faculty_name' => $faculty->name, // ✅ CHANGE THIS LINE
            'branch' => $faculty->branch,
            'department_id' => $faculty->department_id,
 ],


            'summary' => $summary,
        ]);
        


    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'stack' => $e->getTraceAsString()
        ], 500);
    }
}

    
}
