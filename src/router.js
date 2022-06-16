import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './pages/TeamsList';
import UsersList from './pages/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from './pages/NotFound';
import TeamsFooter from './pages/TeamsFooter';
import UsersFooter from './pages/UsersFooter';
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return {
      left: 0,
      top: 0,
    };
  },
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      path: '/teams',
      //component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      name: 'teams',
      meta: { needsAuth: true },
      //alias: '/',
      children: [
        {
          path: ':teamId', // /teams/t1
          component: TeamMembers,
          name: 'team-members',
          props: true,
        },
      ],
    },
    {
      path: '/users',
      //component: UsersList,
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      },
    },
    // {
    //   path: '/teams/:teamId',
    //   component: TeamMembers,
    //   props: true,
    // },
    {
      path: '/:notFound(.*)',
      component: NotFound,
      // redirect: '/teams',
    },
  ],
});
router.beforeEach((to, from, next) => {
  // console.log('Global beforeEach');
  // console.log(to, from);
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
  // next(false);
  console.log(to.meta);
  next();
});
router.afterEach((to, from) => {
  //
  console.log('Global after each');
  console.log(to, from);
});
export default router;
