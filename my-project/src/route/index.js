import {createRouter, createWebHistory} from 'vue-router'

// user
import Booking_main from '../view/private__page/for_user/Booking_main.vue'
import Main_private_user from '../view/private__page/for_user/Main_private_user.vue'
import History from '../view/private__page/for_user/History.vue'

// user/solution
import Solutions from '../view/private__page/for_user/Solutions.vue'

// user/report
import Report from '../view/private__page/for_user/Report.vue'

// admin
import SignUp from '../view/private__page/for_admin/SignUp.vue'
import ShowAllEvent from '../view/private__page/for_admin/showAllEvent.vue'
import Main_private_admin from '../view/private__page/for_admin/Main_private_admin.vue'
import ShowAllUser from '../view/private__page/for_admin/ShowAllUser.vue'

// public
import SignIn from '../view/public__page/SignIn.vue'
import Home from '../view/public__page/Home.vue'
import NotFound from '../view/Notfound.vue'
import Main_public from '../view/public__page/Main_public.vue'

const history=createWebHistory()
const routes=[
    {
        path:'/',
        name:'mainPublic',
        component:Main_public,
        children:[
            
            {
               path:'/',
               name:'home' ,
               component:Home
            },
            {
                path:'/sign-in',
                name:'signIn',
                component:SignIn
            },

        ]
    },
    {
        path:'/account/admin/show-events',
        name:'mainPrivateAdmin',
        component:Main_private_admin,
        children:[
            {
                path:'/account/admin/show-events',
                name:'showAllEvents',
                component:ShowAllEvent
            },
            {
                path:'/account/admin/register',
                name:'signUp',
                component:SignUp
            },
            {
                path:'/account/admin/show-users',
                name:'showAllUser',
                component:ShowAllUser
            }
        ]

    },
    {
        path:'/account/user',
        name:'mainPrivateUser',
        component:Main_private_user,
        children:[
            {
                path:'/account/user',
                name:'booking',
                component: Booking_main
            },
            {
                path:'/account/user/history',
                name:'history',
                component: History
            },
            {
                path:'/account/user/report-problem/:name?',
                name:'report',
                component: Report
            },
            {
                path:'/account/user/solution/:id?',
                name:'solution',
                component: Solutions
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