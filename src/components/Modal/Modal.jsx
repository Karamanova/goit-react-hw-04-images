import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled'
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const closeModal = ({ code, target, currentTarget }) => {
      if (code === 'Escape' || target === currentTarget) {
        onClose();
      };
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
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
