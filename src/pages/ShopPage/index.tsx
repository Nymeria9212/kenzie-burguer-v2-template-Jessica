import { useContext } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../Contexts/CartContext';

const ShopPage = () => {
  const { modalCart, searchValue, setSearchValue, setSearchInput } =
    useContext(CartContext);
  return (
    <StyledShopPage>
      {modalCart ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          {searchValue && (
            <button
              type='button'
              onClick={() => {
                setSearchValue('');
                setSearchInput('');
              }}
            >
              Limpar Busca
            </button>
          )}
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
