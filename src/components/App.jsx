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
  state = {
    images: [],
    currentPage: 1,
    query: '',
    error: null,
    totalHits: 0,
    isLoading: false,
    hasLoadedAll: false,
    isFirstLoad: true,
    isShowModal: false,
    modalData: {},
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { query, currentPage } = this.state;

    try {
      this.setState({ isLoading: true });

      const { hits, totalHits } = await api.fetchImages(query, currentPage, IMAGES_PER_PAGE);
      
      if (hits.length === 0) {
        return alert("No results found.");
      }
      
      this.setState(prev => ({
        images: [...prev.images, ...hits],
        hasLoadedAll: currentPage >= Math.ceil(totalHits/ IMAGES_PER_PAGE),
      }))
    } catch (error) {
      this.setState({ error });
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
    const modalData = { largeImageURL: imageUrl, alt: imageAlt };
    this.setState({ isShowModal: true, modalData });
  };

  closeModal = () => {
    this.setState({ isShowModal: false, modalData: {} });
  };
  
  render() {
    const { images, isLoading, hasLoadedAll, isShowModal, modalData, error } = this.state;
    const showButton = !hasLoadedAll && !isLoading && images.length > 0;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {isLoading && <Loader />}
        {error && <p>Oops... Something went wrong.</p>}
        {images.length > 0 && <ImageGallery images={images} openModal={this.openModal} />}

        {showButton && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}

        {isShowModal && (
          <Modal modalData={modalData} onClose={this.closeModal} />
        )}
        
        <GlobalStyle />
      </Container>
    );
  }
}