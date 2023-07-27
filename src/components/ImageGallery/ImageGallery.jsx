import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
    state = {
        isShowModal: false,
        modalData: {},
    };
    
    openModal = (imageUrl, imageAlt) => {
        const modalData = { largeImageURL: imageUrl, alt: imageAlt };
        this.setState({ isShowModal: true, modalData });
    };

    closeModal = () => {
        this.setState({ isShowModal: false });
    };
    
    
    render() {
        const { images } = this.props;
        const { isShowModal, modalData } = this.state;
        // console.log(this.openModal);

        return (
            <>
                <StyledImageGallery>
                    {images.map((image) => (
                        <ImageGalleryItem
                            key={image.id}
                            item={image}
                            openModal={this.openModal.bind(this)}
                        />
                    ))}
                </StyledImageGallery>
                {isShowModal && (
                    <Modal modalData={modalData} onClose={this.closeModal} />
                )}
            </>
        );
    }
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            alt: PropTypes.string,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ImageGallery;