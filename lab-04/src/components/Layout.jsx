import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <>
            <Header />
            <main className="min-h-screen p-4">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}