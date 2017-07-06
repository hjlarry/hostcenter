<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group" >
                <!--<div contenteditable="true" class="hostcontent">-->
                    <!--{{localhost}}-->
                <!--</div>-->
                <textarea name="" id="" cols="30" rows="22" class="form-control" v-model="localhost"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-primary pull-right" @click="writeFile">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
    import fs from 'fs'
    export default{
      data(){
        return {
          localhost:''
        }
      },
      computed:{
        filepath(){
          return process.platform === 'win32' ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' : '/etc/hosts'
        }
      },
      created(){
        this.readFile()
      },
      methods:{
        readFile(){
          var data = fs.readFileSync(this.filepath,'utf8')
          this.localhost = data
        },
        writeFile(){
          fs.writeFile(this.filepath, this.localhost, (err) => {
            if (err) {
              alert(err);
              throw err;
            }
            alert('Modify Successed!');
          });
        }
      }

    }
</script>
