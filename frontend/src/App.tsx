import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { FooterSection } from './components/FooterSection';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Clinic from './pages/Clinic';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-appointment" element={<BookingPage />} />
          </Routes>
        </main>
        <FooterSection />
      </div>
    </BrowserRouter>
  );
}