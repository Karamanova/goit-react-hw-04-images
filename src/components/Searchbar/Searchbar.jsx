import React, { useState } from "react";
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import { SearchbarBox, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSearch }) => {
const [query, setQuery] = useState('');

  const handleChange = e =>
setQuery(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
e.preventDefault();
if (query.trim() === '') {
toast('🦄 There is nothing to search!');
return;
}
onSearch(query);
setQuery('');
};

  return (
<SearchbarBox>
  <SearchForm onSubmit={handleSubmit}>
    <SearchFormInput
       type="text"
       value={query}
       autoComplete="off"
       autoFocus
       onChange={handleChange}
       placeholder="Search images and photos"
     />
      <SearchFormButton type="submit">
      <GoSearch />
      </SearchFormButton>
    </SearchForm>
</SearchbarBox>
);
};

Searchbar.propTypes = {
onSearch: PropTypes.func.isRequired,
};
