import {
  FiGrid,
  FiShoppingBag,
  // FiUsers,
  // FiUser,
  FiCompass,
  // FiGift,
  FiList,
  FiSettings,
  // FiSlack,
} from 'react-icons/fi';
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: '/dashboard', // the url
    icon: FiGrid, // icon
    name: 'Dashboard', // name that appear in Sidebar
  },
 
  {
    path: '/category',
    icon: FiList,
    name: 'Categories',
  },
  {
    path: '/products',
    icon: FiShoppingBag,
    name: 'Products',
  },
 
  {
    path: '/orders',
    icon: FiCompass,
    name: 'Orders',
  },
  {
    path: '/faq',
    icon: FiCompass,
    name: 'Faq',
  },

  {
    icon: FiSettings ,
    name: 'Setting',
    routes: [
      // submenu

      {
        path: '/settings/banner',
        name: 'Banner ',
      },
      {
        path: '/settings/app-promotion',
        name: 'App Promotion',
      },
    ],
  },
];

export default sidebar;
