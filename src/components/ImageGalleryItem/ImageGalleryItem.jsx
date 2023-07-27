import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
    render() {
        const { item, openModal } = this.props;
        const { alt, webformatURL } = item;

        const handleClick = () => {
            openModal(webformatURL, alt);
        };
        
        return (
            <StyledGalleryItem onClick={handleClick}>
                <img src={webformatURL} alt={alt} />
            </StyledGalleryItem>
        );
    }
}

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
        alt: PropTypes.string,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;