import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled'
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({code, target, currentTarget}) => {
  if(code === 'Escape' || target === currentTarget){
    this.props.onClose();
  };
};

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.closeModal}>
        <ModalBox>
          {children}
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}
