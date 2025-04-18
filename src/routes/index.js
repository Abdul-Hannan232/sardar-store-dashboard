import { lazy } from 'react';
import Faq from '../pages/Faq';

// use lazy for better code splitting
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Products'));
const Banner = lazy(() => import('../pages/Banner'));
const AppPromotion = lazy(() => import('../pages/AppPromotion'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Category = lazy(() => import('../pages/Category'));
// const Staff = lazy(() => import('../pages/Staff'));
// const Customers = lazy(() => import('../pages/Customers'));
// const CustomerOrder = lazy(() => import('../pages/CustomerOrder'));
const FaqDetails = lazy(() => import('../pages/FaqDetails'));
const Orders = lazy(() => import('../pages/Orders'));
const OrderInvoice = lazy(() => import('../pages/OrderInvoice'));
// const Coupons = lazy(() => import('../pages/Coupons'));
// const Setting = lazy(() => import("../pages/Setting"));
// const Page404 = lazy(() => import('../pages/404'));
// const ComingSoon = lazy(() => import('../pages/ComingSoon'));
// const EditProfile = lazy(() => import('../pages/EditProfile'));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/product/:id',
    component: ProductDetails,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/faq',
    component: Faq,
  },

  {
    path: '/faq/:id',
    component: FaqDetails,
  },

  {
    path: '/orders',
    component: Orders,
  },


  {
    path: '/order/:id',
    component: OrderInvoice,
  },
  {
   path: '/settings/banner',
    component: Banner,
  },
  {
    path: '/settings/app-promotion',
    component: AppPromotion,
  },
];

export default routes;
