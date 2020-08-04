<template>
    <el-menu
            :default-active="'/index'"
            router
            mode="horizontal"
            background-color="white"
            text-color="#222"
            active-text-color="red"
            style="min-width: 1000px"
            >
        <el-menu-item style="float: left"></el-menu-item>
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="font-size: 18px">
            {{ item.navItem }}
        </el-menu-item>
<!--        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>-->
       <el-menu-item index="user" style="float:right;font-size: 45px;color: #222;padding-top: 8px">
           <el-avatar :size="50" :src="userUrl" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></el-avatar>
       </el-menu-item>
        <el-menu-item style="float: right;font-size: 18px" index="/" >登陆</el-menu-item>
        <el-menu-item style="float:right;font-size: 18px">
            <el-input
                    placeholder="请输入内容"
                    v-model="searchData"
                    clearable>
                <el-button slot="append"  @click="SearchA" icon="el-icon-search">
                </el-button>
            </el-input>
        </el-menu-item>
        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">bbs</span>
    </el-menu>
</template>

<script>
    export default {
        name: "Nav",
        data () {
            return {
                searchData:"",
                navList: [
                    {name: '/index', navItem: '首页'},
                    {name: '/chat', navItem: '页面一'},
                    {name: '/lose', navItem: '页面二'},
                    {name: '/market', navItem: '页面三'},
                    {name: '/love', navItem: '页面四'}
                ],
                userUrl:"https://picjumbo.com/home-office-free-photo/"
            }
        },
        methods: {
            //搜索帖子功能
            SearchA(){

            }
        },


    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
</style>