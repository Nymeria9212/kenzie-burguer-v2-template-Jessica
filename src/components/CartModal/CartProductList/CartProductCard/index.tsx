import { MdDelete } from 'react-icons/md';

import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { iProductCartModal } from '../../../../Interfaces/cartInterface';
import { CartContext } from '../../../../Contexts/CartContext';

const CartProductCard = ({ name, img, produt }: iProductCartModal) => {
  const { removeProductCart, removeUnitProduct, addProduct } =
    useContext(CartContext);

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
          <div className='counter'>
            <button
              type='button'
              onClick={() => {
                removeUnitProduct(produt);
              }}
            >
              -
            </button>
            <span>{produt.counter}</span>
            <button
              type='button'
              onClick={() => {
                addProduct(produt);
              }}
            >
              +
            </button>
          </div>
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => {
            removeProductCart(produt);
          }}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
