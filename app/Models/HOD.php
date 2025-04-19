<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class HOD extends Authenticatable
{
    use HasFactory;

    protected $table = 'hods';
    protected $primaryKey = 'hod_id';
    public $timestamps = true;

    protected $fillable = ['hod_id', 'name', 'email', 'password', 'mobile_no', 'department_id'];

    protected $hidden = ['password', 'remember_token'];

    // Relationships
    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }
}
