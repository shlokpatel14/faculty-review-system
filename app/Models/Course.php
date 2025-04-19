<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'courses';
    protected $primaryKey = 'course_id';
    protected $fillable = [
        'course_id',
        'course_name',
        'department_id',
        'semester',
        'faculty_id'    
    ];
    public $timestamps = false;
    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }
    public function faculty() {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }
}
