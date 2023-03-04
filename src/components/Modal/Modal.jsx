import React, { useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled'
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  const closeModal = useCallback(({ code, target, currentTarget }) => {
    if (code === 'Escape' || target === currentTarget) {
      onClose();
    };
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalBox onClose={onClose}>
        {children}
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
