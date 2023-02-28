import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../Contexts/CartContext';

const ProductList = () => {
  const { search } = useContext(CartContext);
  return (
    <StyledProductList>
      {search?.map((produt) => (
        <ProductCard
          key={produt.id}
          id={produt.id}
          name={produt.name}
          category={produt.category}
          price={produt.price}
          img={produt.img}
          product={produt}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
