import { AxiosError } from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iProduct, iProductCart } from '../Interfaces/cartInterface';
import { iContextProps } from '../Interfaces/userInterface';
import { apiBurguer } from '../Services';

interface iContextCart {
  products: iProduct[] | undefined;
  cart: iProduct[];
  setModalCart: React.Dispatch<React.SetStateAction<boolean>>;
  modalCart: boolean;
  addProduct: (product: iProduct) => void;
}

export const CartContext = createContext({} as iContextCart);

export const CartProvider = ({ children }: iContextProps) => {
  const [products, setProducts] = useState<iProduct[]>();
  const [cart, setCart] = useState([] as iProductCart[]);
  const [modalCart, setModalCart] = useState(true);
  const navegate = useNavigate();

  useEffect(() => {
    const productsApi = async () => {
      const token = localStorage.getItem('@tokenUser');
      if (token) {
        try {
          const response = await apiBurguer.get<iProduct[]>('/products', {
            headers: { Authorization: `Bearer ${token}` },
          });
          navegate('/shop');
          setProducts(response.data);
        } catch (error) {
          const currentError = error as AxiosError<string>;
        }
      }
    };
    productsApi();
  }, []);
  const addProduct = (product: iProduct) => {
    const prodFind = cart.find((produt) => produt.id === product.id);
    if (!prodFind) {
      setCart([...cart, product]);
    } else {
      toast('O produto já está no carrinho');
    }
  };
  return (
    <CartContext.Provider
      value={{ products, cart, setModalCart, modalCart, addProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};
