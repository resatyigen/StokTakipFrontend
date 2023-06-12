import HomePage from "./views/homepage/HomePage";
import Login from "./views/login/Login";
import Registrer from "./views/register/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./views/dashboard/Dashboard";
import Categories from "./views/categories/Categories";
import AddCategory from "./views/categories/AddCategory";
import EditCategory from "./views/categories/EditCategory";
import Products from "./views/products/Products";
import AddProduct from "./views/products/AddProduct";
import EditProduct from "./views/products/EditProduct";
import UserProfile from "./views/user/UserProfile";
import PrivateRoute from "./components/Route/PrivateRoute";

const routes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Registrer />
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        auth: true,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "categories",
                element: <Categories />
            },
            {
                path: "add-category",
                element: <AddCategory />
            },
            {
                path: "edit-category/:id",
                element: <EditCategory />
            },
            {
                path: "products/:categoryId?",
                element: <Products />
            },
            {
                path: "add-product",
                element: <AddProduct />
            },
            {
                path: "edit-product/:id",
                element: <EditProduct />
            },
            {
                path: "user-profile",
                element: <UserProfile />
            }
        ]
    }
]

const authCheck = routes => routes.map(route => {
    if (route?.auth) {
        console.log("Auth var");
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }

    if (route?.children) {
        route.children = authCheck(route.children);
    }
    return route;
});

export default authCheck(routes);