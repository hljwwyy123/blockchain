import Vue from 'vue';
import Router from 'vue-router';
import home from '@/pages/home';
import notFound from '@/pages/404'
import digitalDetail from '@/pages/digitalDetail'
import exchangeDetail from '@/pages/exchangeDetail'

Vue.use(Router);

const routes = [
  { path: '*', name: '404', component: notFound },
  { path: '/', name: 'home', component: home },
  { path: '/digital_detail/:navid/:themeid', name: 'digitalDetail', component: digitalDetail },
  { path: '/exchange_detail/:navid/:themeid', name: 'exchangeDetail', component: exchangeDetail },
];

export default new Router({
  base: "/blockchain",
  routes: routes,
  model: "history",
});
