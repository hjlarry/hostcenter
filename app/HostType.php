<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HostType extends Model
{
    protected $fillable = ['title'];
    public function hosts(){
        return $this->hasMany('App\HostDetail','host_type_id','id');
    }
}
