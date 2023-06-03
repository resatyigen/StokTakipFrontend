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
                path: "edit-vategory",
                element: <EditCategory />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "add-product",
                element: <AddProduct />
            },
            {
                path: "edit-product",
                element: <EditProduct />
            }
        ]
    }
]

const authCheck = routes => routes.map(route => {
    // if (route?.auth) {
    //     route.element = <PrivateRoute>{route.element}</PrivateRoute>
    // }

    if (route?.children) {
        route.children = authCheck(route.children);
    }
    return route;
});

export default authCheck(routes);