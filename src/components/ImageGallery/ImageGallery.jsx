import React from 'react'; 
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
    return (
        <ul className="gallery">
            {images.map((image) => (
                <ImageGalleryItem
                    key={image.id}
                    imageUrl={image.webformatURL}
                    alt=""
                />
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