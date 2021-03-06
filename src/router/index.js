import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/ephr',
  component: () => import('@/views/interview/index')
}, {
  path: '/ephr_pc',
  component: () => import('@/views/interview/index1')
}, {
  path: '/ephr_m',
  component: () => import('@/views/interview/index2')
}, {
  path: '/interview/view/:id',
  component: () => import('@/views/interview/view')
}, {
  path: '/interview/view_m/:id',
  component: () => import('@/views/interview/view1')
}, {
  path: '/interview/view_pc/:id',
  component: () => import('@/views/interview/view2')
}, {
  path: '/interview/add',
  component: () => import('@/views/interview/add')
}, {
  path: '/interview/success',
  component: () => import('@/views/interview/success')
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
