import Basket from "../pages/Basket/Basket";
import BookItem from "../pages/BookItem/BookItem";
import Books from "../pages/Books/Books";
import BookSearch from "../pages/BookSearch/BookSearch";
import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Profile from "../pages/Profile/Profile";
import Propaganda from "../pages/Propaganda/Propaganda";


export const MainRoutes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    {
        path: '/books', component: Books,
    },
    {
        path: '/books/:bookID', component: BookItem
    },
    {
        path: '/books/search', component: BookSearch
    },
    { path: '/profile', component: Profile },
    { path: '/propaganda', component: Propaganda },
    { path: '/basket', component: Basket },
    { path: '/bookInformation/:id_book', component: BookItem },
]