import { Routes } from '@angular/router';
import { authGuard } from '@Core/guards/auth.guard';
import { LayoutComponent } from '@Core/layout/layout.component';
import { provideTranslocoScope } from '@ngneat/transloco';
import { NotFoundComponent } from '@Shared/components/not-found/not-found.component';

export const routes: Routes = [
    // Redirect empty path to 'Login Component'
    { path: '', pathMatch: 'full', redirectTo: 'Auth' },


    // Auth routes
    {
        path: 'Auth',
        loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule),
        providers: [
            provideTranslocoScope('auth'),
        ]
    },

    // Admin routes
    {
        path: 'Dashboard',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    // Profile
    {
        path: 'Profile',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/profile/profile.module').then(m => m.ProfileModule),
        providers: [
            provideTranslocoScope('profile'),
        ]
    },

    // Products routes
    {
        path: 'Products',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/products/products.module').then(m => m.ProductsModule),
        providers: [
            provideTranslocoScope('products'),
        ]
    },
    // Brand routes
    {
        path: 'Products/Brand',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/brands/brands.module').then(m => m.BrandsModule),
        providers: [
            provideTranslocoScope('brands'),
        ]
    },
    // Categories
    {
        path: 'Products/Categories',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/categories/categories.module').then(m => m.CategoriesModule),
        providers: [
            provideTranslocoScope('categories'),
        ]
    },
    // Coupons
    {
        path: 'Products/Coupons',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/coupons/coupons.module').then(m => m.CouponsModule),
        providers: [
            provideTranslocoScope('coupons'),
        ]
    },
    {
        path: 'orders',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/orders/orders.module').then(m => m.OrdersModule),
        providers: [
            provideTranslocoScope('orders'),
        ]
    },

    // Customers routes
    {
        path: 'customers',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/customers/customers.module').then(m => m.CustomersModule),
        providers: [
            provideTranslocoScope('customers'),
        ]
    },

    // Reporting`
    {
        path: 'Reporting',
        canActivate: [authGuard],
        component: LayoutComponent,
        loadChildren: () => import('./Modules/reporting/reporting.module').then(m => m.ReportingModule),
        providers: [
            provideTranslocoScope('reporting'),
        ]
    },
    // Settings
    // {
    //     path: 'Settings',
    //     canActivate: [authGuard],
    //     component: LayoutComponent,
    //     loadChildren: () => import('./Modules/settings/settings.module').then(m => m.SettingsModule),
    //     providers: [
    //         provideTranslocoScope('settings'),
    //     ]
    // },
    // theme builder

    {
        path:'Theme-Builder',
        canActivate:[authGuard],
        component  : LayoutComponent,
        loadChildren: () => import('./Modules/theme-builder/theme-builder/theme-builder.module').then( m => m.ThemeBuilderModule),
        providers:[
            provideTranslocoScope('theme-builder'),
        ]
    },

    // 404 & Catch all
    {
        path: '404-not-found', pathMatch: 'full',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: NotFoundComponent
            }
        ]
    },
    { path: '**', redirectTo: '404-not-found' }
];
