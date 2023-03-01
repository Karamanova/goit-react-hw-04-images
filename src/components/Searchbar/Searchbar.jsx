import React, { Component } from "react";
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import { SearchbarBox, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';
export class Searchbar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = e =>
    this.setState({ query: e.currentTarget.value.toLowerCase() });

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSearch(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
<SearchbarBox>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormInput
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
            placeholder="Search images and photos"
    />
    <SearchFormButton type="submit">
    <GoSearch/>
      </SearchFormButton>
  </SearchForm>
      </SearchbarBox>
);
  }
}