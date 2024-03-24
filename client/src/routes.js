    import Admin from "./pages/Admin";
    import {ADMIN_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, ABOUT_ROUTE, PROCEDURE_ROUTE, CATEGORY_ROUTE, SALON_ROUTE, MASTER_ROUTE, CLIENT_ROUTE, MANAGER_ROUTE, DISCOUNT_ROUTE, CATEGORY_LIST_ROUTE, SALON_LIST_ROUTE} from "./utils/consts";
    import Profile from "./pages/Profile";
    import Home from "./pages/Home";
    import Auth from "./pages/Auth";
    import AboutUs from "./components/AboutUs";
    import AdmCategory from "./pages/AdmCategory";
    import AdmProcedure from "./pages/AdmProcedure";
    import AdmSalon from "./pages/AdmSalon";
    import AdmMaster from "./pages/AdmMaster";
    import AdmClient from "./pages/AdmClient";
    import AdmManager from "./pages/AdmManager";
    import AdmDiscount from "./pages/AdmDiscount";
    import CategoryList from "./components/CategoryList";
    import SalonList from "./components/SalonList";

    export const authRoutes = [
        {
            path: ADMIN_ROUTE,
            Component: Admin
        },
        {
            path: PROCEDURE_ROUTE + '/:id',
            Component: AdmProcedure
        },
        {
            path: CATEGORY_ROUTE + '/:id',
            Component: AdmCategory
        },
        {
            path: SALON_ROUTE + '/:id',
            Component: AdmSalon
        },
        {
            path: MASTER_ROUTE + '/:id',
            Component: AdmMaster
        },
        {
            path: CLIENT_ROUTE + '/:id',
            Component: AdmClient
        },
        {
            path: MANAGER_ROUTE + '/:id',
            Component: AdmManager
        },
        {
            path: DISCOUNT_ROUTE + '/:id',
            Component: AdmDiscount
        },
        {
            path: PROFILE_ROUTE,
            Component: Profile
        },
    ]

    export const publicRoutes = [
        {
            path: HOME_ROUTE,
            Component: Home
        },
        {
            path: LOGIN_ROUTE,
            Component: Auth
        },
        {
            path: REGISTRATION_ROUTE,
            Component: Auth
        },
        {
            path: ABOUT_ROUTE,
            Component: AboutUs
        },
        {
            path: CATEGORY_LIST_ROUTE,
            Component: CategoryList
        },
        {
            path: SALON_LIST_ROUTE,
            Component: SalonList
        },
    ]
