import { MdSearch } from 'react-icons/md';
import { useContext, useState } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../Contexts/CartContext';

const SearchForm = () => {
  const { setSearchValue, searchInput, setSearchInput } =
    useContext(CartContext);

  const inputValue = () => {
    setSearchValue(searchInput);
  };
  return (
    <StyledSearchForm>
      <input
        value={searchInput}
        type='text'
        placeholder='Digitar pesquisa'
        onChange={(event) => setSearchInput(event.target.value)}
      />

      <StyledButton
        type='button'
        $buttonSize='medium'
        $buttonStyle='green'
        onClick={() => {
          inputValue();
        }}
      >
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
