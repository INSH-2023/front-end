import {createRouter, createWebHistory} from 'vue-router'
import Main_private from '../view/private__page/Main_private.vue'
import Main_public from '../view/public__page/Main_public.vue'
import NotFound from '../view/Notfound.vue'
import Home from '../view/public__page/Home.vue'
import ShowAllEvent from '../view/private__page/ShowAllEvent.vue'
import SignIn from '../view/public__page/SignIn.vue'
import SignUp from '../view/public__page/SignUp.vue'

const history=createWebHistory()
const routes=[
    {
        path:'/',
        name:'mainPublic',
        component:Main_public,
        children:[
            {
               path:'/home',
               name:'home' ,
               component:Home
            },
            {
                path:'/sign-in',
                name:'signIn',
                component:SignIn
            },
            {
                path:'/sign-up',
                name:'signUp',
                component:SignUp
            }
        ]
    },
    {
        path:'/account',
        name:'MainPrivate',
        component:Main_private,
        children:[
            {
                path:'/account/admin',
                name:'showAllEvent',
                component:ShowAllEvent
            }
        ]

    },
    {
        path:'/:NoPage(.*)',
        name:'notFound',
        component: NotFound
    }, 
]
const router=createRouter({history,routes})
export default router