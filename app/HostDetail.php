<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HostDetail extends Model
{
    protected $fillable = ['host_type_id','record'];
    public function hosttype(){
        return $this->belongsTo('App\HostType','host_type_id','id');
    }
}