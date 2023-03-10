import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             名称路由（必须设置!!!）使用）
 * meta : {
    roles: ['admin','editor']    控制页面角色（您可以设置多个角色）
    title: 'title'               名称显示在侧边栏和面包屑中（推荐设置）
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//常量路由
export const constantRoutes = [
  {//登录路由
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {//404路由
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {//默认大框架路由
    path: '/',
    component: Layout,
    redirect: '/dashboard',//路由重定向，只要一访问，立马跳到二级路由
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  
  
]

//异步路由，一些权限的分配和管理
export const asyncrouters=[
  {//权限管理
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },
  {//商品管理
    path:'/product',
    component:Layout,
    name:'Product',
    meta:{title:'商品管理',icon:'el-icon-goods'},
    children:[
      {
        path:'/trademark',
        name:'Trademark',
        component:()=>import('@/views/product/trademark'),
        meta:{title:'品牌管理'}
      },
      {
        path:'/attr',
        name:'Attr',
        component:()=>import('@/views/product/attr'),
        meta:{title:'平台属性管理'}
      },
      {
        path:'/spu',
        name:'Spu',
        component:()=>import('@/views/product/spu'),
        meta:{title:'Spu管理'}
      },
      {
        path:'/sku',
        name:'Sku',
        component:()=>import('@/views/product/sku'),
        meta:{title:'Sku管理'}
      },
   
      {
        path:'/cesi',
        name:'cesi',
        component:()=>import('@/components/testing'),
        meta:{title:'测试'}
      }
    ]
  },
]

//任意路由，关于一些其他的路由，包含404
export const anytoutes={ path: '*', redirect: '/404', hidden: true }


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
