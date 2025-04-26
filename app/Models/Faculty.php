<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Faculty extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'faculty';
    protected $primaryKey = 'faculty_id';
    public $timestamps = true;

    protected $fillable = ['faculty_id', 'name', 'email', 'password', 'mobile_no', 'department_id', 'branch'];

    protected $hidden = ['password', 'remember_token'];

    // Relationships
    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function reviews() {
        return $this->hasMany(Review::class, 'faculty_id');
    }
}
