import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') { 
            this.props.onClose();
        }
    };

    handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        const { modalData } = this.props;
        if (!modalData) {
            return null;
        }
        
        const { largeImageURL, alt } = modalData;

        return createPortal (
            <Overlay onClick={this.handleClickOutside}>
                <ModalContainer>
                    <img src={largeImageURL} alt={alt} />
                    
                </ModalContainer>
            </Overlay>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    modalData: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        alt: PropTypes.string,
    }), 
    onClose: PropTypes.func.isRequired,
};

export default Modal;