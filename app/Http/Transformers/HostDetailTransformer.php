<?php
/**
 * Created by PhpStorm.
 * User: hejl
 * Date: 2017/6/5
 * Time: 下午2:45
 */

namespace App\Http\Transformers;

use App\HostType;
use League\Fractal\TransformerAbstract;

class HostDetailTransformer extends TransformerAbstract
{
    public function transform(HostType $hosttype){
        return [
            'id'=> $hosttype->id,
            'title' =>   $hosttype->title,
            'content'=>  $hosttype->hosts,
        ];
    }
}