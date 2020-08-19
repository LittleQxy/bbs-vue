<template>
    <div class="container">
<!--       第一部分存放用户卡片-->
        <div style="position: absolute;margin-left: 50px">
           <el-card style="width: 500px;">
               <div slot="header" style="text-align: left">
                   <el-button type="text" style="font-size: 20px" @click="userEdit = true">编辑</el-button>
               </div>
                <div>
                    <el-avatar :size="80" :src="userInfo.avtarUrl"></el-avatar>
                </div>
               <div>
                   <div style="margin-top: 20px">
                       <span style="font-size: 20px">{{userInfo.userName}}</span>
                   </div>
                   <div style="margin-top: 20px">
                       <span style="font-size: 20px">{{userInfo.age}}岁</span>
                   </div>
                   <div style="margin: 20px;margin-left: 10px">
                       <span style="font-size: 20px">{{userInfo.selfcontent}}</span>
                   </div>
                   <div style="margin-top: 20px">
                       <span style="font-size: 20px">{{userInfo.phoneNumber}}</span>
                   </div>
                   <div style="margin-top: 20px">
                       <span style="font-size: 18px">总共发布了</span>
                       <span style="font-size: 20px;color: crimson">{{userInfo.totalArticleNum}}</span>
                       <span style="font-size: 18px">条帖子</span>
                   </div>
                   <div style="margin-top: 20px">
                       <span style="font-size: 18px">总获取点赞数为：</span>
                       <span style="font-size: 20px;color: crimson">{{userInfo.getLikeNum}}</span>
                   </div>
               </div>
           </el-card>
       </div>
<!--        第二部分存放其他卡片-->
        <div style="margin-left: 600px;margin-top: 50px">
            <el-card style="width: 800px"></el-card>
        </div>

        <el-dialog title="个人信息" :visible.sync="userEdit">
            <el-form :model="userInfo">
                <el-form-item label="用户名" >
                    <el-input v-model="userInfo.userName"></el-input>
                </el-form-item>
                <el-form-item label="年龄" >
                    <el-input v-model="userInfo.age"></el-input>
                </el-form-item>
                <el-form-item label="个人介绍：" >
                    <el-input v-model="userInfo.selfcontent" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="电话：">
                    <el-input v-model="userInfo.phoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userEdit = false">取 消</el-button>
                <el-button type="primary" @click="userEdit = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return{
                userInfo:{
                    userName:"魔动闪霸",
                    age:18,
                    selfcontent:"如果你是一个写数据库场景比较多，而读数据场景比较少的业务需求，采用这种方案就会导致，数据压根还没读到，缓存就被频繁地更新，浪费性能；",
                    phoneNumber:123456,
                    totalArticleNum:12322,
                    getLikeNum:1321,
                    email:"",
                    avtarUrl:"https://picjumbo.com/wp-content/uploads/ripe-wine-grapes-in-vineyard-field-1080x720.jpg"
                },
                userEdit:false

            }
        }
    }
</script>

<style scoped>

</style>