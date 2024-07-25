import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/style.scss'

import React from 'react';
import { AuthProvider } from './context';
import ScrollToTop from './utils/ScrollToTop';
import Header from './components/Header/Header';
import useRoutes from './hooks/useRoutes';
import { MainRoutes } from './router';
import BasketProvider from './context/BasketProvider';


export default function App() {

    const _routes = useRoutes(MainRoutes);
    
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <BasketProvider>
                        <ScrollToTop />

                        <header className='app__header'>
                            <div className="container">
                                <Header />
                            </div>
                        </header>

                        <main className="app__main">
                            <div className="container">
                                <Routes>
                                    {
                                        _routes.map((item: any) => item)
                                    }
                                </Routes>
                            </div>
                        </main>
                    </BasketProvider>
                </AuthProvider>
            </Router>
            <footer className="footer" >Это подвал</footer>
        </div>
    );
}

