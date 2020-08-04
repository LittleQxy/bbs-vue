<template>
    <div class="login clearfix">
        <div class="login-wrap">
            <el-row type="flex" justify="center">
                <el-form ref="loginForm" :model="loginData" :rules="rules" status-icon label-width="90px">
                    <h3>登录</h3>
                    <hr>
                    <el-form-item prop="username" label="邮箱">
                        <el-input v-model="loginData.email" placeholder="请输入邮箱" auto-complete="off" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item id="password" prop="password" label="密码">
                        <el-input v-model="loginData.password" show-password  auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <router-link to="/">找回密码</router-link>
                    <el-checkbox style="float: right" v-model="checked" checked>记住密码</el-checkbox>
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
    var CryptoJS = require('crypto-js')
    export default {
        name: "Login",
        data(){
            return{
                loginData:{
                    email: '',
                    password: ''
                },
                userToken:"",
                checked:true
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
                                this.setCookie(this.loginData.email,this.loginData.password,7);
                                this.userToken = res.data.data.token;
                                this.$store.commit('changeLogin',this.userToken);
                                this.$router.push({
                                    name:"AppIndex",
                                    query:{
                                        isLogin:true
                                    }
                                })
                            } else {
                                alert(res.data.msg);
                            }
                        });
                    }
                }
            },
            regist(){
                this.$router.push({path:"/Register"})
            },

            //设置cookie方法
            setCookie(mobile, password, days) {
                var text = CryptoJS.AES.encrypt(password, 'secret key 123');//使用CryptoJS方法加密
                var saveDays = new Date(); //获取时间
                var now = new Date();
                saveDays.setTime(now.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
                //字符串拼接存入cookie
                window.document.cookie = "mobile" + "=" + mobile + ";path=/;saveDays=" + saveDays.toGMTString();
                window.document.cookie = "password" + "=" + text + ";path=/;saveDays=" + saveDays.toGMTString();
            },
            //读取cookie
            getCookie:function() {
                if (document.cookie.length > 0) {
                    const arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (let i = 0; i < arr.length; i++) {
                        const arr2 = arr[i].split('='); //再次切割
                        //这里会切割出以mobile为第0项的数组、以password为第0项的数组，判断查找相对应的值
                        if (arr2[0] == 'mobile') {
                            this.loginData.email = arr2[1]; //拿到账号
                        } else if (arr2[0] == 'password') {
                            //拿到拿到加密后的密码arr2[1]并解密
                            const bytes = CryptoJS.AES .decrypt(arr2[1].toString(), 'secret key 123');
                            const plaintext = bytes.toString(CryptoJS.enc.Utf8); //拿到解密后的密码（登录时输入的密码）
                            this.loginData.password = plaintext;
                        }
                    }
                }
            },
            //清除cookie
            clearCookie() {
                this.setCookie("", "", 0); //账号密码置空，天数置0
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