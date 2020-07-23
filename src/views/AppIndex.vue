<template>
    <el-row :gutter="24">
        <el-col :span="2" offset="2">
            <el-card class="box_card">
               <div class="item">
                   <el-button type="text" class="text" @click="SearchPublish" >本站公告</el-button>
               </div>
                <div class="item">
                    <el-button type="text" class="text" @click="SearchTongzhi">校园通知</el-button>
                </div>
                <div class="item">
                    <el-button type="text" class="text">最新发布</el-button>
                </div>
                <div class="item">
                    <el-button type="text" class="text">热帖</el-button>
                </div>
            </el-card>
        </el-col>
        <el-col :span="14" :offset="4">
            <el-card class="edit_card" v-if="this.isPublish === false">
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
            <el-card class="edit_card" v-if="this.isPublish">
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
        </el-col>
    </el-row>
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
                isPublish:false
            }
        },
        created() {
            this.SearchPublish();
        }
        ,
        methods:{

            processCurrentChange(val) {
                this.page.currentPage = val;
                if(!this.isPublish){
                    if(this.defaultType === 1){
                        this.SearchPublish();
                    }else{
                        this.SearchTongzhi();
                    }
                }
            },
            SearchPublish(){
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
    .edit_card{
        height: 900px;
    }
    .text{
        font-size: 20px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #222222;
    }
    .item{
        padding: 10px;
    }

    .el-col{
        height: 1000px;
        margin-top: 50px;
    }

    .list{
        padding-bottom: 30px;
        padding-top: 15px;
    }
</style>