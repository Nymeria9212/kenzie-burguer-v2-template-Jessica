import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../Contexts/CartContext';

const CartProductList = () => {
  const { cart, cartValue, removeAllCart } = useContext(CartContext);
  return (
    <StyledCartProductList>
      <ul>
        {cart.map((produt) => (
          <CartProductCard
            key={produt.id}
            name={produt.name}
            img={produt.img}
            produt={produt}
          />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {cartValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => {
          removeAllCart();
        }}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
