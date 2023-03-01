import React, { Component } from "react";
import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';
export class Button extends Component {
  static propTypes = { onClick: PropTypes.func.isRequired };
  render() {
    return (
      <LoadMoreButton type="button" onClick={this.props.onClick}>
        Load more
      </LoadMoreButton>
    );
  }
}
