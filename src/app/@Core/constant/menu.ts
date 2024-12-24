import { MenuItem } from "src/app/Data/models/layout/menu";

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      active: true,
      items: [
        {
          icon: 'icon icon-home',
          label: 'dashboard',
          route: '/Dashboard',
        },
        {
          icon: 'icon icon-user',
          label: 'Products',
          route: '/Products',
          children: [
            { label: 'Products', route: '/Products/List' },
            { label: 'brands', route: '/Products/Brand' },
            { label: 'categories', route: '/Products/Categories' },
            { label: 'coupons', route: '/Products/Coupons' },
          ],
        },
        {
          icon: 'icon icon-user',
          label: 'orders',
          route: '/orders',
        },
        {
          icon: 'icon icon-user',
          label: 'Customers',
          route: '/customers',
        },
        {
          icon: 'icon icon-user',
          label: 'Reporting',
          route: '/Reporting',
          children: [
            { label: 'products', route: '/Reporting/Products-Sales' },
            { label: 'Categories', route: '/Reporting/Categories-Sales' },
            { label: 'brands', route: '/Reporting/Brands-Sales' },
            { label: 'coupons', route: '/Reporting/Coupons-Sales' },
            { label: 'cities', route: '/Reporting/Cities-Sales' },
          ],
        },
      ],
    },

    {
      group: 'Config',
      separator: true,
      items: [
        // {
        //   icon: 'icon icon-user',
        //   label: 'Settings',
        //   route: '/Settings',
        // },
        {
          icon: 'icon icon-user',
          label: 'theme_builder',
          route: '/Theme-Builder',
        },
        {
          icon: 'icon icon-user',
          label: 'profile',
          route: '/Profile',
        },
      ],

    },
  ];
}

