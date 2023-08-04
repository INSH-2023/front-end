import {createRouter, createWebHistory} from 'vue-router'
import getRefreshToken from '../JS/refresh'
import validate from '../JS/validate'

// user
import Booking_main from '../view/private__page/for_user/Booking_main.vue'
import Main_private_user from '../view/private__page/for_user/Main_private_user.vue'
import History from '../view/private__page/for_user/History.vue'
// import Summary from '../view/private__page/for_user/Summary.vue'
import Finish from '../view/private__page/for_user/Finishing.vue'
// main service
import Services from '../view/private__page/for_user/Main_service.vue'

// user/solution
import Solutions from '../view/private__page/for_user/Solutions.vue'

// user/report
import Report from '../view/private__page/for_user/Report.vue'

// admin
import SignUp from '../view/private__page/for_admin/SignUp.vue'
import Main_private_admin from '../view/private__page/for_admin/Main_private_admin.vue'
import ShowAllUser from '../view/private__page/for_admin/ShowAllUser.vue'
import ShowAllEvent from'../view/private__page/for_admin/ShowAllEvent.vue'
import WriteSolutions from '../view/private__page/for_admin/Write_solution.vue'
import ShowAllSolution from '../view/private__page/for_admin/ShowAllSolution.vue'
import ProblemsList from '../view/private__page/for_admin/ProblemsList.vue'
import Dashboard from '../view/private__page/for_admin/Dashboard.vue'

// public
import SignIn from '../view/public__page/SignIn.vue'
import Home from '../view/public__page/Home.vue'
import Verify from '../view/public__page/Verify.vue'
import ResetPassword from '../view/public__page/ResetPassword.vue'
import NotFound from '../view/NotFound.vue'
import Main_public from '../view/public__page/Main_public.vue'
import ComingSoon from '../view/ComingSoon.vue'
import ErrorServer from '../view/ErrorServer.vue'
// private
import Main_for_navbar from '../view/private__page/Main_for_navbar.vue'

// cookie
import Cookies from '../JS/cookies'


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
                path:'sign-in',
                name:'signIn',
                component:SignIn
            },
            {
                path:'verify',
                name:'verify',
                component: Verify
            },
            {
                path: 'reset-password',
                name: 'resetPassword',
                component: ResetPassword
            }
    //         {
    //             path:'account/admin',
    //             name:'mainPrivateAdmin',
    //             component:Main_private_admin,
    //             children:[

    //                 {
    //                     path:'request',
    //                     name:'showAllEvents',
    //                     component:ShowAllEvent
    //                 },
    //                 {
    //                     path:'register',
    //                     name:'signUp',
    //                     component:SignUp                        
    //                 },
    //                 {
    //                     path:'all-users',
    //                     name:'showAllUser',
    //                     component:ShowAllUser                        
    //                 },
    //                 {
    //                     path:'write-solutions',
    //                     name:'writeS',
    //                     component:WriteSolutions                        
    //                 },
    //                 {
    //                     path:'all-solution',
    //                     name:'showAllSolution',
    //                     component:ShowAllSolution                        
    //                 },
    //                 {
    //                     path:'add-problems',
    //                     name:'problemsList',
    //                     component:ProblemsList                        
    //                 }
    //             ]
    //         },
    //         {
    //             path:'account/user',
    //             name:'mainPrivateUser',
    //             component:Main_private_user,
    //             children:[   
                    
    //                 {
    //                     path:'services',
    //                     name:'services',
    //                     component:Services
    //                 },
    //                 {
    //                     path:'services/:service',
    //                     name:'booking',
    //                     component: Booking_main
    //                 },
    //                 {
    //                     path:'services/history',
    //                     name:'history',
    //                     component: History
    //                 },
    //                 {
    //                     path:'services/:service?/report-problem/:id?',
    //                     name:'report',
    //                     component: Report
    //                 },
    //                 {
    //                     path:'solution/:id?',
    //                     name:'solution',
    //                     component: Solutions
    //                 }
    //             ]          
    //         }



        ]
    },

    {
        // path:'/account',
        name:'mainForNavbar',
        component:Main_for_navbar,
        children:[
            {
                path:'/account/admin/service',
                name:'mainPrivateAdmin',
                component:Main_private_admin,
                children:[
                    
                    {
                        path:'request',
                        name:'showAllEvents',
                        component:ShowAllEvent
                    },
                    {
                        path:'register',
                        name:'signUp',
                        component:SignUp
                    },
                    {
                        path:'all-users',
                        name:'showAllUser',
                        component:ShowAllUser
                    },
                    {
                        path:'write-solutions',
                        name:'writeS',
                        component:WriteSolutions
                    },
                    {
                        path:'all-solution',
                        name:'showAllSolution',
                        component:ShowAllSolution
                    },
                    {
                        path:'add-problems',
                        name:'problemsList',
                        component:ProblemsList
                    },
                    {
                        path:'dashboard',
                        name: 'dashboard',
                        component: Dashboard
                    }
                ]
        
            },
            {
                path:'/account/user/service',
                name:'mainPrivateUser',
                component:Main_private_user,
                children:[
                    {
                        path:'',
                        name:'services',
                        component:Services
                    },
                    {
                        path:':service',
                        name:'booking',
                        component: Booking_main
                    },
                    {
                        path:'history',
                        name:'history',
                        component: History
                    },
                    {
                        path:':service?/report-problem/:id?',
                        name:'report',
                        component: Report
                    },
                    // {
                    //     path:'/account/user/report-problem/:id?/summary'
                    // },
                    {
                        path:'solution/:id?',
                        name:'solution',
                        component: Solutions
                    },
                    {
                        path:'finish',
                        name:'finish',
                        component: Finish
                    }
                ]
            }

        ]
    }
    ,
    {
        path:'/:NoPage(.*)',
        name:'notFound',
        component: NotFound
    }, 
    {
        path:'/coming-soon',
        name:'notAvaliable',
        component:ComingSoon
    },
    {
        path:'/error',
        name:'errorServer',
        component:ErrorServer
    }
]
const router=createRouter({history,routes})

// vue nav guard
router.beforeEach((to, from, next) => {
    // if personal data was remove that redirect to login page
    // if user or admin redirect on admin service the user is not allow and admin can go to service by normally
    // when refresh page, cookie is refresh page
    if (to.name == 'mainForNavbar') next({ name: 'home'})
    else if (to.name == 'home') next()
    else if (to.name !== 'signIn' && Cookies.get("data").length == 0) next({ name: 'signIn' })
    else if (to.name == 'mainPrivateAdmin' && validate.getUserDataFromLocal("user_role") == "user") next({ name: 'services' })
    else if (to.name == 'mainPrivateAdmin' && validate.getUserDataFromLocal("user_role") != "user") next({ name: 'showAllEvents' })
    else {
        if(Cookies.get("data").length !== 0){
            getRefreshToken()
        }
        next()
    }
})

// when router is error
router.onError({name: 'errorServer'})

export default router