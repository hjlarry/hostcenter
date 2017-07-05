<template>
    <div class="modal " tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{this.hosttitle}}</h4>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="hostcontent in hostcontents">{{hostcontent.record}}</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="close()">Close</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</template>
<script>
    export  default{
      props:['id'],
      created(){
        this.fetchData()
      },
      data(){
        return{
          hosttitle:'',
          hostcontents: [],
        }
      },
      methods:{
        close(){
          this.$emit('close')
        },
        fetchData(){
          this.axios.get('hosts/'+this.id).then(response =>{
            this.$store.commit('GET_HOSTCONTENT',response.data.data)
            this.hosttitle = this.$store.state.host.hostContent.title
            this.hostcontents = this.$store.state.host.hostContent.content
          })

        }
      }

    }
</script>
<style>
    .modal{
        display: block;
    }
    .modal-body{
        overflow-y: auto;
        height: 400px;
    }
</style>