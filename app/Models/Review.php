<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Review extends Authenticatable
{
    use HasFactory;

    protected $table = 'reviews';
    protected $primaryKey = 'review_id';
    public $timestamps = false;

    protected $fillable = ['review_id','enrollment', 'faculty_id', 'rating_parameter1','rating_parameter2','rating_parameter3','rating_parameter4','rating_parameter5','rating_parameter6','rating_parameter7','rating_parameter8','rating_parameter9', 'course_id','course_name'];

    // Relationships
    public function student() {
        return $this->belongsTo(Student::class, 'enrollment');
    }

    public function faculty() {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }
    public function course() {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
