<template>
    <div class="login clearfix">
        <div class="login-wrap">
            <el-row type="flex" justify="center">
                <el-form ref="loginForm" :model="user" status-icon label-width="80px">
                    <h3>注册</h3>
                    <hr>
                    <el-form-item prop="email" label="邮箱">
                        <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="设置密码">
                        <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="设置密码">
                        <el-input v-model="user.pd" show-password placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Register",
        data() {
            return {
                user: {
                    pd:"",
                    email: "",
                    password: ""
                },
                userToken:""
            };
        },
        created() {
            // console.log($);
            // console.log("1111");
        },
        methods: {
            doRegister() {
                if (!this.user.email) {
                    this.$message.error("请输入邮箱！");
                    return;
                } else if (this.user.email != null) {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (!reg.test(this.user.email)) {
                        this.$message.error("请输入有效的邮箱！");
                    } else if (!this.user.password) {
                        this.$message.error("请输入密码！");
                        return;
                    }else if(this.user.pd === this.user.password){
                        // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
                        axios
                            .post("/regist/", {
                                email: this.user.email,
                                password: this.user.password
                            })
                            .then(res => {
                                if (res.data.code === 200) {
                                    this.userToken = res.data.data.token;
                                    this.$store.commit('changeLogin',this.userToken);
                                    this.$router.push({
                                        name:"AppIndex",
                                        query:{
                                            isLogin:true
                                        }
                                    });
                                } else {
                                    alert(res.data.msg);
                                }
                            });
                    }
                    else {
                        this.$message.error("两次输入密码不相等");
                        return;
                    }
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        line-height: 20px;
    }

    h3 {
        color: #0babeab8;
        font-size: 24px;
    }
    hr {
        background-color: #444;
        margin: 20px auto;
    }

    .el-button {
        width: 80%;
        margin-left: -50px;
    }
</style>