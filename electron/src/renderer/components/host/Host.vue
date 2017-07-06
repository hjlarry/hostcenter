<template>
    <div class="clearfix" :class="view">
        <div class="inner">
            <input type="checkbox" aria-label="..." @click="check()" v-model="checked" >
            <span @click="toggleShowContent()">{{host.title}}</span>
            <span class="operate pull-right" v-if="editable">
                <span class="btn btn-xs btn-danger " @click="toHostContent(host.id)">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>Edit
                </span>
                <span class="btn btn-xs btn-danger" @click="del(host,index)">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>Delete
                </span>
            </span>
        </div>
        <host-content-dialog v-if="isshow" @close="toggleShowContent()" :id="host.id"></host-content-dialog>
    </div>
</template>
<script>
  import HostContentDialog from './HostContentDialog.vue'
  export default{
    props:['host','index','view','editable'],
    data(){
      return{
        isshow:false,
        checked:''
      }
    },
    components: {
      HostContentDialog: HostContentDialog
    },
    methods:{
      toHostContent(id){
          this.$router.push({
            path: '/hosts/'+id
        })
      },
      del(host,index){
        host.index = index
        this.$store.dispatch('delHost',host)
      },
      toggleShowContent(){
        this.isshow = !this.isshow
      },
      check(){
        this.$emit('check',this.host.id)
      }
    }
  }
</script>
<style>

    .list-group-item span:hover,.grid-group-item span:hover{
        cursor: pointer;
    }
    .grid-group-item{
        width: 33.3%;
        float:left;
        padding: 10px;
    }
    .grid-group-item .inner{
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        height: 112.5px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.05);
    }
    .grid-group-item .inner .operate{
        position: relative;
        top: 56px;
    }


</style>
