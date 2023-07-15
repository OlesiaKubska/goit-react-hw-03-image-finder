import React from 'react';
import PropTypes from 'prop-types';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ imageUrl, alt }) => {
    return (
        <StyledGalleryItem>
            <img src={imageUrl} alt={alt} />
        </StyledGalleryItem>
    );
};

ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;