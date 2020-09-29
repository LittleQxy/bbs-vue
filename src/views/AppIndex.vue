<template>
    <div>
        <div style="float: left;margin-left: 100px;margin-top: 30px;position: fixed">
            <el-card class="box_card">
                <div class="item">
                    <el-button type="text" class="text" @click="SearchPublish">本站公告</el-button>
                </div>
                <div class="item">
                    <el-button type="text" class="text" @click="SearchTongzhi">校园通知</el-button>
                </div>
                <div class="item">
                    <el-button type="text" class="text" @click="newPublish">最新发布</el-button>
                </div>
                <div class="item">
                    <el-button type="text" class="text">热帖</el-button>
                </div>
            </el-card>
        </div>

        <div v-if="!isPublish" style="margin-left: 380px;margin-top: 30px">
            <el-card style="width: 900px" >
                <el-row v-for="item in publishData" :key="item.id">
                    <div class="list" style="text-align: left;font-weight: bolder"><span style="font-size: 18px;color: #222222" >{{item.title}}</span></div>
                    <div style="text-align: left;padding-left: 10px"><span>{{item.content}}</span></div>
                    <el-divider></el-divider>
                </el-row>
                <el-pagination
                        style="float:right;"
                        background
                        @current-change="processCurrentChange"
                        :current-page="page.currentPage"
                        :page-size="page.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="page.total"
                        v-if="page.total>5"
                ></el-pagination>
            </el-card>
        </div>
        <div v-else-if="isPublish" style="float: left;margin-left: 380px;margin-top: 30px">
                <el-card>
                    <div>
                        <ui >
                            <li v-for="item in publishData" :key="item.id">
                                <div class="div1">
                                    <div class="div2">
                                        <div>
                                            <el-avatar src="item.avtar"></el-avatar>
                                        </div>
                                        <div style="margin-top: 20px">
                                            <span>{{item.userName}}</span>
                                        </div>
                                    </div>
                                    <div class="div3">
                                        <div style="text-align: left">
                                            <span style="font-weight: bolder">{{item.title}}</span>
                                        </div>
                                        <div style="text-align: left;margin-top: 10px">
                                            <span>{{item.content | ellipsis}}</span>
                                        </div>
                                        <div style="float: right">
                                            <el-button type="text" @click="getDetial(item.id,item.type)"> 查看详情</el-button>
                                        </div>
                                    </div>
                                    <div class="div4">
                                        <span>{{item.updateTime}}</span>
                                        <div class="div5">
                                            <div style="float: left;margin-right: 10px"><i class="el-icon-chat-dot-square"></i>
                                                <span>{{item.getLikeNum}}</span></div>
                                            <div style="float: left;margin-right: 10px"><i class="el-icon-chat-dot-square"></i>
                                                <span>{{item.conmentNum}}</span></div>
                                            <div style="float: left"><i class="el-icon-view"></i>
                                                <span>{{item.getWatchNum}}</span></div>
                                        </div>
                                    </div>
                                    <div style="margin-top: 140px">
                                        <el-divider style="height: border-box;font-weight: lighter;font-size: 10px;"></el-divider>
                                    </div>
                                </div>
                            </li>
                        </ui>
                        <el-pagination
                                style="float:right;"
                                background
                                @current-change="processCurrentChange"
                                :current-page="page.currentPage"
                                :page-size="page.pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="page.total"
                                v-if="page.total>5"
                        ></el-pagination>
                    </div>
                </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppIndex",
        data(){
            return{
                page: {
                    pageSize: 6,
                    total: 0,
                    currentPage: 1
                },
                publishData:[],
                defaultType:1,
                isPublish:false,
            }
        },
        created() {
            this.SearchPublish();
        }
        ,
        methods:{


            getDetial(id,type){
                this.$router.push({
                    name:'ArticleDetial',
                    query:{
                        id:id,
                        type:type,
                    }
                })
            },

            processCurrentChange(val) {
                this.page.currentPage = val;
                if(!this.isPublish){
                    if(this.defaultType === 1){
                        this.SearchPublish();
                    }else{
                        this.SearchTongzhi();
                    }
                }else {
                    if (this.defaultType === 3){
                        this.newPublish();
                    }
                }
            },
            SearchPublish(){
                this.isPublish = false;
                this.defaultType = 1;
                this.$axios.post("/getPublishList/1",{
                    pageNum:this.page.currentPage,
                    pageSize:this.page.pageSize
                }).then(res =>{
                    if(res.data.code === 200){
                        this.publishData = res.data.data.content;
                        this.page.total = res.data.data.totalElements;
                    }else{
                        this.log.error(res.data.msg);
                    }
                })
            },

            SearchTongzhi(){
                this.isPublish = false;
                this.defaultType = 2;
                this.$axios.post("/getPublishList/2",{
                    pageNum:this.page.currentPage,
                    pageSize:this.page.pageSize
                }).then(res =>{
                    if(res.data.code === 200){
                        this.publishData = res.data.data.content;
                        this.page.total = res.data.data.totalElements;
                    }else{
                        this.log.error(res.data.msg);
                    }
                })
            },

            newPublish(){
                this.defaultType = 3;
                this.isPublish = true;
                this.$axios.post("/getNewPublish",{
                    pageNum:this.page.currentPage,
                    pageSize:this.page.pageSize
                }).then(res => {
                    if(res.data.code === 200){
                        this.publishData = res.data.data;
                        this.page.total  = res.data.total;
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })

            }

        },
        filters: {
            ellipsis(value) {
                if (!value) return "";
                if (value.length > 30) {
                    return value.slice(0, 30) + "...";
                }
                return value;
            }
        }
    }
</script>

<style scoped>
    .box_card{
        height: 300px;
        width: 180px;
        /*margin-left: 100px;*/
    }

    .text{
        font-size: 20px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #222222;
    }
    .item{
        padding: 10px;
    }


    .list{
        padding-bottom: 30px;
        padding-top: 15px;
    }

    .div1{
        height: 150px;
        width: 800px;
        float: left;
        margin-top: 20px;
        margin-left: 15px;
    }

    .div2{
        height: 100px;
        width: 100px;
        margin-top: 10px;
        margin-right: 20px;
        float: left;

    }
    .div3{
        height: 60px;
        width: 600px;
        margin-top: 10px;
        float: left;

    }
    .div4{
        height: 20px;
        width: 600px;
        margin-top: 10px;
        float: left;
    }
    .div5{
        height: 20px;
        width: 200px;
        margin-left: 50px;
        margin-right: 10px;
        float: right;
    }
</style>
