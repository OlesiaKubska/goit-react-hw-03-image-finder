import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
    render() {
        const { item, openModal } = this.props;
        const { tags, webformatURL, largeImageURL } = item;

        const handleClick = () => {
            openModal(largeImageURL, tags);
        };
        
        return (
            <StyledGalleryItem onClick={handleClick}>
                <img src={webformatURL} alt={tags} />
            </StyledGalleryItem>
        );
    }
}

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
        tags: PropTypes.string,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;