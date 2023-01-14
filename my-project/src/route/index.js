import {createRouter, createWebHistory} from 'vue-router'

// user
import Booking from '../view/private__page/for_user/Booking.vue'
import Main_private_user from '../view/private__page/for_user/Main_private_user.vue'
// admin
import SignUp from '../view/private__page/for_admin/SignUp.vue'
import ShowAllEvent from '../view/private__page/for_admin/showAllEvent.vue'
import Main_private_admin from '../view/private__page/for_admin/Main_private_admin.vue'

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
        path:'/account/admin',
        name:'mainPrivateAdmin',
        component:Main_private_admin,
        children:[
            {
                path:'/account/admin',
                name:'showAllEvents',
                component:ShowAllEvent
            },
            {
                path:'/account/admin/sign-up',
                name:'signUp',
                component:SignUp
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
                component: Booking
            },
            {
                path:'/account/user/'
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