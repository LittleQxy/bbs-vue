<template>
    <div class="login clearfix">
        <div class="login-wrap">
            <el-row type="flex" justify="center">
                <el-form ref="loginForm" :model="loginData" :rules="rules" status-icon label-width="90px">
                    <h3>登录</h3>
                    <hr>
                    <el-form-item prop="username" label="邮箱">
                        <el-input v-model="loginData.email" placeholder="请输入邮箱" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item id="password" prop="password" label="密码">
                        <el-input v-model="loginData.password" show-password placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <router-link to="/">找回密码</router-link>
                    <el-form-item>
                            <el-button type="primary" class="mini"  @click="login()">登 录</el-button>
                            <el-button type="primary" class="mini"  @click="regist()">注册</el-button>
                    </el-form-item>
<!--                    <router-link to="/Register">注册账号</router-link>-->
                </el-form>
            </el-row>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginData:{
                    email: '',
                    password: ''
                },
                userToken:"",
            }
        },
        methods: {
            login() {
                //增加校验
                if (!this.loginData.email) {
                    this.message.error("输入邮箱为空")
                } else if (!this.loginData.password) {
                    this.message.error("输入密码为空")
                } else {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (!reg.test(this.loginData.email)) {
                        this.$message.error("请输入有效的邮箱地址！");
                    }else {
                        this.$axios.post(
                            '/login', {
                                email: this.loginData.email,
                                password: this.loginData.password
                            }
                        ).then(res => {
                            if (res.data.code == 200) {
                                this.userToken = res.data.data.token;
                               this.$store.commit('changeLogin',this.userToken);
                                this.$router.push({
                                    name:"AppIndex"                                })
                            } else {
                                alert(res.data.msg);
                            }
                        });
                    }
                }
            },
            regist(){
                this.$router.push({path:"/Register"})
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 740px;
        background: url("../assets/images/loginbg.jpg") no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    .login-wrap {
        background: url("../assets/images/login.jpg") no-repeat;
        background-size: cover;
        width: 500px;
        height: 400px;
        margin: 215px auto;
        overflow: hidden;
        padding-top: 10px;
        line-height: 40px;
    }
    #password {
        margin-bottom: 5px;
    }
    h3 {
        color: #0babeab8;
        font-size: 24px;
    }
    hr {
        background-color: #444;
        margin: 20px auto;
    }
    a {
        text-decoration: none;
        color: #aaa;
        font-size: 15px;
    }
    a:hover {
        color: coral;
    }
    .el-button {
        width: 30%;
        margin-left: -50px;
    }
</style>