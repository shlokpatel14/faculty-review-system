<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;

class Department extends Authenticable
{
    use HasFactory;

    protected $table = 'departments';
    protected $fillable = ['department_id','name', 'array_data'];
    protected $primaryKey = 'department_id';
    public $timestamps = false;


    // Relationships
/*    public function students() {
        return $this->hasMany(Student::class, 'department_id');
    }

    public function faculty() {
        return $this->hasMany(Faculty::class, 'department_id');
    }

    public function hods() {
        return $this->hasMany(HOD::class, 'department_id');
    }
    public function courses() {
        return $this->hasMany(Course::class, 'department_id');
    }*/
}
