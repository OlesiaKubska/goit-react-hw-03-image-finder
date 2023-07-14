import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

class ImageGallery extends Component {
    render() {
        const { images } = this.props;

        return (
            <StyledImageGallery>
                {images.map((image) => (
                    <ImageGalleryItem
                        key={image.id}
                        imageUrl={image.webformatURL}
                        alt=""
                    />
                ))}
            </StyledImageGallery>
        );
    }
}

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