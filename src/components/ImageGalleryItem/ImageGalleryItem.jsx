import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageUrl, alt }) => {
    return (
        <li className="gallery-item">
            <img src={imageUrl} alt={alt} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;