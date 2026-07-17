import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OurStory from './pages/OurStory'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

/** Fades each route in on navigation. */
function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}

const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/product/:id', element: <ProductDetail /> },
  { path: '/cart', element: <Cart /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/our-story', element: <OurStory /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
]

export default function App() {
  const location = useLocation()

  return (
    <CartProvider>
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Page>{route.element}</Page>}
            />
          ))}
        </Routes>
      </AnimatePresence>

      <Footer />
    </CartProvider>
  )
}
