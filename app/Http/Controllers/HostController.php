<?php

namespace App\Http\Controllers\OtherSystem;


use Illuminate\Http\Request;
use App\HostType;
use App\HostDetail;
use App\Http\Controllers\Controller;
use App\Http\Transformers\HostTransformer;
use App\Http\Transformers\HostDetailTransformer;
use Dingo\Api\Routing\Helpers;
use JWTAuth;


class HostController extends Controller
{
    use Helpers;
    public function getUserId()
    {
        return JWTAuth::parseToken()->authenticate()->id;
    }


//    获取公用HOST，私用HOST，搜索HOST，多组HOST，单个HOST
    public function hosts(){
        $hosts =  HostType::orderBy('updated_at','desc')->where('is_public','=',1)->paginate(9);
        return $this->paginator($hosts,new HostTransformer());
    }
    public function myHost(){
        $user_id = $this->getUserId();
        $hosts =  HostType::orderBy('updated_at','desc')->where('user_id','=',$user_id)->paginate(9);
        return $this->paginator($hosts,new HostTransformer());
    }
    public function hostSearch($key){
        $hosts = HostType::where('title','like','%'.$key.'%')->where('is_public','=',1)->paginate(9);
        return $this->paginator($hosts,new HostTransformer());
    }
    public function manyHost($ids){
        $ids_array = ($ids!='' ? explode(',',$ids) : array() );
        $hosts = HostDetail::whereIn('host_type_id',$ids_array)->get();
        return $hosts;
    }
    public function hostDetail($id){
        $host = HostType::find($id);
        return $this->item($host,new HostDetailTransformer());

    }
//    新建HOST，编辑HOST，删除HOST，删除HOST内某条记录
    public function createHost(Request $request){
        $hosttype = new HostType();
        $hosttype->title = $request->title;
        $hosttype->user_id = $this->getUserId();
        $hosttype->save();
        foreach ($request->hostcontent as $requesthost){
            HostDetail::create([
                'host_type_id' => $hosttype->id,
                'record' => $requesthost['record'],
            ]);
        }
        return response()->json('success');
    }
    public function editHost($id,Request $request){
        $hosttype = HostType::find($id);
        if ($hosttype->user_id == $this->getUserId()){
            $hosttype->title = $request->title;
            foreach ($request->hostcontent as $requesthost){

                $host = HostDetail::find($requesthost['id']);

                if ($host != null){
                    $host->record = $requesthost['record'];
                    $host->save();
                }else{
                    HostDetail::create([
                        'host_type_id' => $id,
                        'record' => $requesthost['record'],
                    ]);
                }

            }
            $hosttype->save();
            return response()->json('success');
        }else{
            return response()->json('auth failed');
        }

    }
    public function delHost($id){
        $hosttype = HostType::find($id);
        if ($hosttype->user_id == $this->getUserId()){
            foreach ($hosttype->hosts as $host){
                $host->delete();
            }
            $hosttype->delete();
            return response()->json('success');
        }else{
            return response()->json('auth failed');
        }

    }
    public function delHostDetail($id){
        $host = HostDetail::find($id);
        if ($host->hosttype->user_id == $this->getUserId()){
            $host->delete();
            return response()->json('success');
        }else{
            return response()->json('auth failed');
        }

    }
}
