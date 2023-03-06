import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled'
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({children, onClose}) => {
useEffect(() => {
  window.addEventListener('keydown', closeModal);
  return () => window.removeEventListener('keydown', closeModal);
});

const closeModal = ({code, target, currentTarget}) => {
  if(code === 'Escape' || target === currentTarget){
    onClose();
  };
};

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalBox>
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
