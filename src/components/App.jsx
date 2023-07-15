import React, { Component } from 'react';
import api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const IMAGES_PER_PAGE = 12;

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    query: '',
    isLoading: false,
    hasLoadedAll: false,
  };

  // componentDidMount() {
  //   // this.fetchData();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { query, currentPage } = this.state;

    try {
      this.setState({ isLoading: true });
      const images = await api.fetchImages(query, currentPage, IMAGES_PER_PAGE);
      
      if (images.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          hasLoadedAll: false,
        }));  
      } else {
        this.setState({ hasLoadedAll: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = () => {
    this.setState({ images: [], currentPage: 1 }, () => {
      this.fetchData();
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }), () => {
      this.fetchData();
    });
  };

  render() {
    const { images, isLoading, hasLoadedAll } = this.state;
    const showButton = images.length > 0 && !isLoading && !hasLoadedAll;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} />
        )}

        {showButton && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
        {}
      </div>
    );
  }
}