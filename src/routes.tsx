import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './Contexts/CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { ProtectRoute } from './ProtectRoute/protectRout';

const Router = () => (
  <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/shop' element={<ProtectRoute />}>
      <Route
        index
        element={
          <CartProvider>
            <ShopPage />
          </CartProvider>
        }
      />
    </Route>
  </Routes>
);

export default Router;
