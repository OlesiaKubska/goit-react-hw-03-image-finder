import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
    handleClick = (e) => {
        e.preventDefault();
        const { item, openModal } = this.props;
        const { largeImageURL, alt } = item;
        openModal(largeImageURL, alt);
    };

    render() {
        const { item } = this.props;
        const { alt, webformatURL } = item;

        return (
            <StyledGalleryItem onClick={this.handleClick}>
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