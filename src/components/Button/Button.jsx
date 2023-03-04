import React, { useCallback } from "react";
import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <LoadMoreButton type="button" onClick={handleClick}>
      Load more
    </LoadMoreButton>
  );
}

Button.propTypes = { onClick: PropTypes.func.isRequired };


