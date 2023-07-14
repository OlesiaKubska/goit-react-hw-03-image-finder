import React, { Component } from 'react'; 
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
    return (
        <ul className="gallery">
            {images.map((image) => (
                <li key={image.id}>
                    <img src={image.webformatURL} alt="" />
                </li>
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ImageGallery;