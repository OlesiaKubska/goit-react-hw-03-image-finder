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
      totalHits: 0,
      isLoading: false,
      hasLoadedAll: false,
      isFirstLoad: true,
      isShowModal: false,
      modalData: { img: null, tags: '' },
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
    const { query, currentPage, isFirstLoad, images } = this.state;

    try {
      this.setState({ isLoading: true });

      if (!isFirstLoad || query.trim() !== '') {
        const response = await api.fetchImages(query, currentPage, IMAGES_PER_PAGE);
        const { hits, totalHits } = response;

        if (hits.length > 0) {
          const newImages = [...images, ...hits];
          const hasLoadedAll = currentPage >= Math.ceil(totalHits/ IMAGES_PER_PAGE);
          
          this.setState({
            images: newImages,
            hasLoadedAll,
            totalHits,
          });
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
    const modalData = { largeImageURL: imageUrl, tags: imageAlt };
    this.setState({ isShowModal: true, modalData });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { images, isLoading, hasLoadedAll, isShowModal, modalData } = this.state;
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

        {isShowModal && (
          <Modal modalData={modalData} onClose={this.closeModal} />
        )}

        <GlobalStyle />
      </Container>
    );
  }
}