import { Router } from 'express';
import { CategoriesRoutes } from '../modules/Categories/categories.route';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BlogsRoutes } from '../modules/Blogs/blogs.route';
import { ContactRoutes } from '../modules/Contact/contact.route';
import { SubCategoriesRoutes } from '../modules/SubCategories/subCategories.route';
import { ProductsRoutes } from '../modules/Products/products.route';
import { OrdersRoutes } from '../modules/Orders/orders.route';
import { CartRoutes } from '../modules/Cart/cart.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/subcategories',
    route: SubCategoriesRoutes,
  },
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/blogs',
    route: BlogsRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
