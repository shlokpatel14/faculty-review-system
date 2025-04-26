<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class HOD extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'hods';
    protected $primaryKey = 'hod_id';
    public $timestamps = true;

    protected $fillable = ['hod_id', 'name', 'email', 'password', 'mobile_no', 'department_id','branch'];

    protected $hidden = ['password', 'remember_token'];

    // Relationships
    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }
}
