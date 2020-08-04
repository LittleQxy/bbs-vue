<template>
    <div class="container">
        <div style="margin-top: 30px;margin-left: 100px">
            <div style="position: absolute">
                <el-card style="width: 900px">
                    <div style="margin-top: 10px;margin-left: 10px;text-align: left">
                        <span style="font-size: 25px;font-weight: bolder;text-align: left">{{this.article.title}}</span>
                    </div>
                    <div style="margin-top: 30px;margin-left: 10px;text-align: left">
                        <div style="float: left">
                            <el-avatar :src="this.article.avaterUrl" :size="60"></el-avatar>
                        </div>
                        <div style="float: left;padding-left: 15px">
                            <span style="color: darkturquoise">{{this.article.userName}}</span>
                            <div style="margin-top: 15px">
                                <span>{{this.article.updateTime}}</span>
                            </div>
                        </div>
                        <div style="float: right;margin-top: 30px">
                            <div style="float: left;padding-right: 10px"><i class="el-icon-sunny"></i>
                                <span>{{this.article.getLikeNum}}</span></div>
                            <div style="float: left;padding-right: 10px"><i class="el-icon-chat-dot-square"></i>
                                <span>{{this.article.conmentNum}}</span></div>
                            <div style="float: left"><i class="el-icon-view"></i>
                                <span>{{this.article.watchNum}}</span></div>
                        </div>
                    </div>
                    <div style="margin-top: 100px">
                        <el-divider></el-divider>
                    </div>

                    <div style="text-align: left">
                        <span>{{this.article.content}}</span>
                    </div>
                </el-card>
            </div>
            <div style="margin-left: 1000px">
                <el-card style="width: 400px;">
                    <div slot="header" class="clearfix" style="text-align: left">
                        <i class="el-icon-s-flag"></i>
                        <span style="font-weight: bolder;font-size: 20px;padding-left: 10px">相关热帖</span>
                    </div>
                </el-card>
            </div>
            <div style="margin-left: 1000px">
                <el-card style="width: 400px;margin-top: 50px">
                    <div slot="header" class="clearfix" style="text-align: left">
                        <i class="el-icon-attract"></i>
                        <span style="font-weight: bolder;font-size: 20px;padding-left: 10px">相关发布</span>
                    </div>
                </el-card>
            </div>
        </div>

        <div style="margin-top: 50px;margin-left: 100px">
            <el-card style="width: 900px">
                <div style="text-align: right">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入你的评论"
                            maxlength = "50"
                            v-model="conment">
                    </el-input>
                    <el-button type="primary"  @click="Reply">回复</el-button>
                </div>
            </el-card>
        </div>
        <div style="margin-top: 50px;margin-left: 100px">
            <el-card style="width: 900px;background: rgba(248,244,244,0.23)">
                <div slot="header" style="text-align: left">
                    <span style="font-weight: bolder;font-size: 23px">评论</span>
                </div>
                <ul>
                    <li v-for="item in comments" :key="item.id" style="list-style-type: none">
                     <el-card style="margin-top: 20px;background: azure">
                         <div style="margin-top: 40px">
                             <div style="position: absolute">
                                 <el-avatar src="item.comment.avtarUrl" :size="70"></el-avatar>
                             </div>
                             <div style="text-align: left;margin-left: 80px">
                                 <span style="font-size: 14px;color: cyan">{{item.comment.userName}}用户</span>
                             </div>
                             <div style="margin-left: 90px;text-align: left;margin-top: 10px">
                                 <span>{{item.comment.content}}</span>
                             </div>
                             <div>
                                 <div style="float: left;margin-left: 70px;margin-top: 10px">
                                     <span style="font-size: 12px">发布于  {{item.comment.createTime}}</span>
                                 </div>
                                 <div style="float: right">
                                     <el-button type="text" @click="openReply(item.comment.id)">回复()</el-button>
                                 </div>
                                 <div style="float: right;margin-right: 20px">
                                     <el-button type="text">点赞 <span>({{item.comment.getLikeNum}})</span></el-button>
                                 </div>
                             </div>
                         </div>
                         <div style="margin-top: 60px">
                             <el-divider></el-divider>
                         </div>
                         <ul>
                             <li style="list-style-type: none" v-for="rep in item.list" :key="rep.id">
                                 <div style="margin-top: 35px">
                                     <div>
                                         <div style="text-align: left">
                                             <span style="color: darkred;font-size:14px">{{rep.userName}}</span>
                                         </div>
                                         <div v-if="rep.replyUserName != null" style="margin-left: 20px">
                                             <span >回复</span>
                                             <span>{{rep.replyUserName}}</span>
                                         </div>
                                     </div>
                                     <div style="text-align: left;margin-left: 25px;margin-top: 10px">
                                         <span>{{rep.content}}</span>
                                     </div>
                                     <div>
                                         <div style="float: left;margin-left: 10px;margin-top: 10px">
                                             <span style="font-size: 12px">{{rep.createTime}}</span>
                                         </div>
                                         <div style="float: right">
                                             <el-button type="text" @click="openReply(item.comment.id)">回复</el-button>
                                         </div>
                                         <div style="float: right;margin-right: 20px">
                                             <el-button type="text">点赞 <span>{{rep.getLikeNum}}</span></el-button>
                                         </div>
                                     </div>
                                 </div>
                                 <div style="margin-top: 40px">
                                     <el-divider></el-divider>
                                 </div>
                             </li>

                         </ul>
                     </el-card>
                    </li>
                    <el-pagination
                            style="float:right;"
                            background
                            @current-change="processCurrentChange"
                            :current-page="page1.pageNum"
                            :page-size="page1.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="page1.total"
                            v-if="page1.total>5"
                    ></el-pagination>
                </ul>
            </el-card>
        </div>
    </div>
</template>


<script>
    //import Vue from 'vue'
    export default {
        name: "ArticleDetial",
        data(){
            return{
                hotArticle:[],//用来存放相关热帖
                newArticle:[],//用来存放最新帖子
                comments:[],//用来存放评论
                article:{
                    id:"",
                    title:"这是详情页",
                    content:"元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed " +
                        "属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。",
                    userId:"",
                    userName:"三年级安抚",
                    avaterUrl:"",
                    articleType:"",
                    getLikeNum:100,
                    watchNum:2343,
                    conmentNum:78,
                    createTime:"",
                    updateTime:"2020-07-12 20:34:34"
                },
                conment:"",
                id:"",
                type:"",
                page1:{
                    pageNum: 1,
                    pageSize: 10,
                    total:0
                },
                reply:""
            }
        },
        methods: {
            openReply(id){
                this.$prompt('请输入回复内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder: '回复。。。'
                }).then(({ value }) => {
                   this.reply = value;
                   this.replyComment(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
            ,
            SearchData(){
                this.id = this.$route.query.id;
                this.type = this.$route.query.type;
                this.$axios.post('/detail/'+this.id+"/"+this.type).then(res =>{
                    if(res.data.code === 200){
                        this.article = res.data.data;
                        this.getComment();
                        console.log(res.data.data)
                    }else {
                        console.log(res.data.msg);
                        this.$alert(res.data.msg);
                    }
                })
            },

            Reply(){
                if(this.conment === ""){
                    this.$alert("请输入评论内容！！！");
                }else{
                    this.$axios.post('/comment',{
                        articleId:this.article.id,
                        articleType:this.article.articleType,
                        content:this.conment
                    }).then(res =>{
                        if(res.data.code === 200){
                            this.$alert("评论成功");
                        }else{
                            this.$alert("评论失败");
                        }
                    })
                }
            },
            getComment(){
                this.$axios.post('/replyList/'+this.article.articleType+'/'+this.article.id,{
                    pageNum:this.page1.pageNum,
                    pageSize:this.page1.pageSize
                }).then(res => {
                    if(res.data.code === 200){
                        this.comments = res.data.data;
                        this.page1.total = res.data.total;
                        //this.$alert(this.comments);
                    }else {
                        this.$alert(res.data.msg);
                    }
                })
            },
            processCurrentChange(val) {
                this.page.currentPage = val;
                this.getComment();
            },

            replyComment(id){
                this.$axios.post('/ReplyComment',{
                    commentId:id,
                    content:this.reply,
                    articleId:this.article.id,
                    articleType:this.article.articleType
                }).then(res =>{
                    if(res.data.code === 200){
                        this.$message("评论成功");
                    }else {
                        this.$alert(res.data.msg);
                    }
                })
            }
        },
        created() {
          this.SearchData();
        }
    }
</script>

<style scoped>

</style>