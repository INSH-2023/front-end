import {createRouter, createWebHistory} from 'vue-router'

// user
import Booking_main from '../view/private__page/for_user/Booking_main.vue'
import Main_private_user from '../view/private__page/for_user/Main_private_user.vue'
import History from '../view/private__page/for_user/History.vue'
// import Summary from '../view/private__page/for_user/Summary.vue'

// main service
import Services from '../view/private__page/Main_service.vue'

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

// public
import SignIn from '../view/public__page/SignIn.vue'
import Home from '../view/public__page/Home.vue'
import NotFound from '../view/NotFound.vue'
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
                path:'sign-in',
                name:'signIn',
                component:SignIn
            },
            {
                path:'account/admin',
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
                    }
                ]
            },
            {
                path:'account/user',
                name:'mainPrivateUser',
                component:Main_private_user,
                children:[   
                    
                    {
                        path:'services',
                        name:'services',
                        component:Services
                    },
                    {
                        path:'services/:service',
                        name:'booking',
                        component: Booking_main
                    },
                    {
                        path:'services/history',
                        name:'history',
                        component: History
                    },
                    {
                        path:'services/:service?/report-problem/:id?',
                        name:'report',
                        component: Report
                    },
                    {
                        path:'solution/:id?',
                        name:'solution',
                        component: Solutions
                    }
                ]          
            }



        ]
    },
    // {
    //     path:'/account/admin/service',
    //     name:'mainPrivateAdmin',
    //     component:Main_private_admin,
    //     children:[
            
    //         {
    //             path:'/account/admin/request',
    //             name:'showAllEvents',
    //             component:ShowAllEvent
    //         },
    //         {
    //             path:'/account/admin/register',
    //             name:'signUp',
    //             component:SignUp
    //         },
    //         {
    //             path:'/account/admin/all-users',
    //             name:'showAllUser',
    //             component:ShowAllUser
    //         },
    //         {
    //             path:'/account/admin/write-solutions',
    //             name:'writeS',
    //             component:WriteSolutions
    //         },
    //         {
    //             path:'/account/admin/all-solution',
    //             name:'showAllSolution',
    //             component:ShowAllSolution
    //         },
    //         {
    //             path:'/account/admin/add-problems',
    //             name:'problemsList',
    //             component:ProblemsList
    //         }
    //     ]

    // },
    // {
    //     path:'/account/user/services',
    //     name:'mainPrivateUser',
    //     component:Main_private_user,
    //     children:[
    //         {
    //             path:'/account/user/services',
    //             name:'services',
    //             component:Services
    //         },
    //         {
    //             path:'/account/user/services/:service',
    //             name:'booking',
    //             component: Booking_main
    //         },
    //         {
    //             path:'/account/user/services/history',
    //             name:'history',
    //             component: History
    //         },
    //         {
    //             path:'/account/user/services/:service?/report-problem/:id?',
    //             name:'report',
    //             component: Report
    //         },
    //         // {
    //         //     path:'/account/user/report-problem/:id?/summary'
    //         // },
    //         {
    //             path:'/account/user/solution/:id?',
    //             name:'solution',
    //             component: Solutions
    //         }
    //     ]
    // },
    {
        path:'/:NoPage(.*)',
        name:'notFound',
        component: NotFound
    }, 
]
const router=createRouter({history,routes})
export default router