import React, { Component } from 'react';
import api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.Styled';
import Modal from './Modal/Modal';

const IMAGES_PER_PAGE = 12;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentPage: 1,
      query: '',
      totalPages: 0,
      isLoading: false,
      hasLoadedAll: false,
      isFirstLoad: true,
      isModalOpen: false,
      selectedImage: null,
      selectedImageAlt: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { query, currentPage, isFirstLoad } = this.state;

    try {
      this.setState({ isLoading: true });

      if (!isFirstLoad || query.trim() !== '') {
        const images = await api.fetchImages(query, currentPage, IMAGES_PER_PAGE);
      
        if (images.length > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            hasLoadedAll: false,
          }));
        } else {
          this.setState({ hasLoadedAll: true });
        }
      }

      if (isFirstLoad) {
        this.setState({ isFirstLoad: false });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = newQuery => {
    this.setState({ query: newQuery, currentPage: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  openModal = (imageUrl, imageAlt) => {
    this.setState({ isModalOpen: true, selectedImage: imageUrl, selectedImageAlt: imageAlt });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedImage: null, selectedImageAlt: '' });
  };

  render() {
    const { images, isLoading, hasLoadedAll, isModalOpen, selectedImage, selectedImageAlt } = this.state;
    const showButton = images.length > 0 && !isLoading && !hasLoadedAll;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={this.state.images} onClickImage={this.openModal} />
        )}

        {showButton && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}

        <Modal isOpen={isModalOpen} imageUrl={selectedImage || ''} alt={selectedImageAlt} onClose={this.closeModal} />

        <GlobalStyle />
      </Container>
    );
  }
}