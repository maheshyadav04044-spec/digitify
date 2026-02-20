import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProductsPage from '@/components/pages/ProductsPage';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import FAQPage from '@/components/pages/FAQPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "products",
        element: <ProductsPage />,
        routeMetadata: {
          pageIdentifier: 'products',
        },
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
        routeMetadata: {
          pageIdentifier: 'product-detail',
        },
      },
      {
        path: "faq",
        element: <FAQPage />,
        routeMetadata: {
          pageIdentifier: 'faq',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
