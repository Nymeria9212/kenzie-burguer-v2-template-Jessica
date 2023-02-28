import { AxiosError } from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  iContextCart,
  iProduct,
  iProductCart,
} from '../Interfaces/cartInterface';
import { iContextProps } from '../Interfaces/userInterface';
import { apiBurguer } from '../Services';

export const CartContext = createContext({} as iContextCart);

export const CartProvider = ({ children }: iContextProps) => {
  const localCart = localStorage.getItem('@cart');
  const localItems = localStorage.getItem('@totalItems');
  const localValue = localStorage.getItem('@totalValue');

  const [products, setProducts] = useState<iProduct[]>();
  const [cart, setCart] = useState<iProductCart[]>(
    localCart ? JSON.parse(localCart) : []
  );
  const [cartValue, setCartValue] = useState<number>(
    localValue ? JSON.parse(localValue) : 0
  );
  const [totalItens, setTotalItens] = useState(
    localItems ? JSON.parse(localItems) : 0
  );
  const [modalCart, setModalCart] = useState(true);
  const navegate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const search = products?.filter((food) =>
    searchValue === ''
      ? true
      : food.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        food.category.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('@cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('@totalValue', JSON.stringify(cartValue));
  }, [cartValue]);

  useEffect(() => {
    localStorage.setItem('@totalItems', JSON.stringify(totalItens));
  }, [totalItens]);
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
      const cardProduct = { ...product, counter: 1 };
      setCart([...cart, cardProduct]);
      setCartValue(cartValue + cardProduct.price);
      setTotalItens(totalItens + 1);
      toast.success('Produto adicionado com sucesso', { autoClose: 1000 });
    } else {
      const newFindCard = { ...prodFind, counter: prodFind.counter + 1 };
      const filterNewItem = cart.filter((prod) => prod.id !== prodFind.id);
      setCart([...filterNewItem, newFindCard]);
      setCartValue(cartValue + product.price);
      setTotalItens(totalItens + 1);
      toast.success('Produto adicionado com sucesso', { autoClose: 1000 });
    }
  };
  const removeProductCart = (product: iProductCart) => {
    const prodFilter = cart.filter((produt) => produt.id !== product.id);
    setCart(prodFilter);
    setTotalItens(totalItens - product.counter);
    setCartValue(cartValue - product.price * product.counter);
    toast.success('Produto removido com sucesso', { autoClose: 1000 });
  };

  const removeUnitProduct = (product: iProductCart) => {
    const prodFind = cart.find((produt) => produt.id === product.id);
    if (prodFind && product.counter > 1) {
      const newProduct = { ...prodFind, counter: prodFind.counter - 1 };
      const filterProd = cart.filter((prod) => prod.id !== product.id);
      setCart([...filterProd, newProduct]);
      setCartValue(cartValue - product.price);
      setTotalItens(totalItens - 1);
      toast.success('Produto removido com sucesso', { autoClose: 1000 });
    } else {
      removeProductCart(product);
    }
  };
  const removeAllCart = () => {
    setCart([]);
    setTotalItens(0);
    setCartValue(0);
    toast.success('Todos os produtos foram removidos', { autoClose: 1000 });
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        setModalCart,
        modalCart,
        addProduct,
        cartValue,
        totalItens,
        removeProductCart,
        removeAllCart,
        searchValue,
        setSearchValue,
        search,
        searchInput,
        setSearchInput,
        removeUnitProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
