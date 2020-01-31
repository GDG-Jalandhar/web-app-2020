import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import communitydata from './assets/data/communitydata.json'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        title:'Home | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/home',
      name: 'home-alternative',
      component: Home,
      meta:{
        title:'Home | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( './views/About.vue'),
      meta:{
        title:'About | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/events',
      name: 'events',
      component: () => import( './views/Events.vue'),
      meta:{
        title:'Events | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      },
    },
    {
      path: '/team',
      name: 'team',
      component: () => import( './views/Team.vue'),
      meta:{
        title:'Team | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/team/:id',
      name: 'team-details',
      component: () => import( './views/ViewTeam.vue'),
      meta:{
        title:'Team | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import( './views/Contact.vue'),
      meta:{
        title:'Contact | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import( './views/Partners.vue'),
      meta:{
        title:'Partners | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import( './views/Blogs.vue'),
      meta:{
        title:'Blogs | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      }
    },
    {
      path: '/events/:id',
      name: 'event-data',
      component: () => import( './views/Events/EventTemplate.vue'),
      meta:{
        title:'Event Name | '+communitydata.CommunityName,
        color:'#0277bd',
        requiresAuth:false
      },
    },
    {
      path:'/admin',
      name:"admin",
      component:()=> import('@/views/Admin/login'),
      meta:{
        title:`Admin Login | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth:false
      },
    },
    {
      path:'/admin/dashboard/home',
      name:"admin-dashhboard",
      component:()=> import('@/views/Admin/dashboard'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/events',
      name:"admin-events",
      component:()=> import('@/views/Admin/Events'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/team',
      name:"admin-team",
      component:()=> import('@/views/Admin/Team'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/team/:id',
      name:"admin-team-member",
      component:()=> import('@/views/Admin/Team/showTeam'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/speaker',
      name:"admin-speakers",
      component:()=> import('@/views/Admin/Speaker'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/speaker/:id',
      name:"admin-speaker-member",
      component:()=> import('@/views/Admin/Speaker/viewSpeaker'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/pushNotification',
      name:"PushNotifications",
      component:()=> import('@/views/Admin/PushNotifications'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path:'/admin/dashboard/config/web',
      name:"WebConfig",
      component:()=> import('@/views/Admin/WebConfig'),
      meta:{
        title:`Admin Dashboard | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: true,
      }
    },
    {
      path: '*',
      name: 'redirect',
      redirect: { path: '/' },
      meta:{
        title:`Redirect | ${communitydata.CommunityName}`,
        color:"#0277bd",
        requiresAuth: false,
      }
    },
  ]
})

router.beforeEach((to, from, next)=>{
  // const user = firebase.auth.currentUser;
  // const requiresAuth = to.matched.some(record=> record.meta.requiresAuth);
  if(to.meta.title){
    document.title = to.meta.title
    // let metaThemeColor = document.querySelector("meta[name=theme-color]");
    // metaThemeColor.setAttribute("content", to.meta.color);
    // // if(this.$vuetify.theme.dark){
    // //   metaThemeColor.setAttribute("content", '#616161');
    // // }else{
      
    // // }
  }
  // if(requiresAuth && !user) next('admin')
  // else if(!requiresAuth && user) next('dashboard')
  // else next()
  next()
})

export default router