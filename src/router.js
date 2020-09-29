import Vue from 'vue'
import VueRouter from "vue-router";
import Login from  "./components/Login"
import Register from "./components/Register";
import Home from "./components/Home";
import AppIndex from "./views/AppIndex";
import Chat from "./views/Chat";
import Lose from "./views/Lose";
import Love from "./views/Love";
import Market from "./views/Market";
import User from "./views/User";
import ArticleDetial from "./views/ArticleDetial";

Vue.use(VueRouter)

//配置路由
export default new VueRouter({

    routes:[
        {
            path:"/",
            name:Login,
            component:Login
        },
        {
            path: "/Register",
            name: Register,
            component: Register
        },
        {
            path: "/home",
            name: "Home",
            redirect:"/index",
            component: Home,
            children:[
                {
                    path:"/index",
                    name:"AppIndex",
                    component:AppIndex
                },
                {
                    path: "/chat",
                    name: "Chat",
                    component: Chat
                },
                {
                    path: "/lose",
                    name: "Lose",
                    component: Lose
                },
                {
                    path: "/love",
                    name: "Love",
                    component: Love
                },
                {
                    path: "/market",
                    name: "Market",
                    component: Market
                },
                {
                    path: "/user",
                    name: "User",
                    component: User
                },
                {
                    path: "/detail",
                    name: "ArticleDetial",
                    component: ArticleDetial
                }

            ]

        }
    ],
    mode:"history"

})