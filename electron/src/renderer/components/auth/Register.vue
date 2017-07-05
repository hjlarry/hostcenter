<template>
    <div class="panel">
        <div class="box">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                    <input type="text" class="form-control" placeholder="Email" v-model="user.email">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                    <input type="password" class="form-control" placeholder="Password" v-model="user.password">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-log-in"></span></span>
                    <input type="password" class="form-control" placeholder="Retype Password" v-model="repassword" @keyup.enter="register">
                </div>
            </div>

            <div class="form-group">
                <button class="btn btn-primary btn-block btn-flat" @click="register">Register</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
      data(){
        return{
          user:{
            email:'',
            password:'',
          },
          repassword:''
        }
      },
      methods:{
        register(){
            if (this.user.password === this.repassword){
                this.$store.dispatch('register',this.user)
                this.$router.push({
                    path: '/'
                 })
            }else{
              alert('The twice password doesn`t match!')
            }
        }
      }
    }
</script>