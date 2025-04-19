<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'enrollment';
    public $timestamps = true;
    protected $fillable = ['enrollment', 'name', 'email', 'password', 'mobile_no', 'branch','department_id'];

    protected $hidden = ['password', 'remember_token'];

    // Relationships
    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function reviews() {
        return $this->hasMany(Review::class, 'student_id');
    }
}
