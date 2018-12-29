import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pocetak',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Odjavi se',
    icon: 'fa fa-sign-out',
    link: '/logout',
  },

  {
    title: 'Fan zona',
    icon: 'fa fa-shopping-cart',
    link: '/dashboard/pages/fan-zone',


  },

  {
  title: 'Statistika',
  icon: 'fa fa-book',
  link: '/dashboard/pages/statistic',
  children: [
    {
      title: 'Bioskopi',
      link: '/dashboard/pages/statistic/cinemas',
    },
    {
      title: 'Pozorista',
      link: '/dashboard/pages/statistic/theathres',
    },
  ]
  },

];

export const MENU_USER: NbMenuItem[] = [
  {
    title: 'Pocetak',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Odjavi se',
    icon: 'fa fa-sign-out',
    link: '/logout',
  },

  {
    title: 'Fan zona',
    icon: 'fa fa-shopping-cart',
    link: '/dashboard/pages/fan-zone',


  },

];

