import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { iProductCartModal } from '../../../../Interfaces/cartInterface';

const CartProductCard = ({ name, img }: iProductCartModal) => (
  <StyledCartProductCard>
    <div className='imageBox'>
      <img src={img} alt={name} />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        {name}
      </StyledTitle>
      <button type='button' aria-label='Remover'>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
);

export default CartProductCard;
