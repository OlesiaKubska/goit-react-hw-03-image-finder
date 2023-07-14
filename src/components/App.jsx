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
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (query, page = 1) => {
    try {
      this.setState({ isLoading: true });
      const images = await api.fetchImages(query, page, IMAGES_PER_PAGE);
      
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        currentPage: page,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({ images: [], currentPage: 1, query }, () => {
      this.fetchData(query);
    });
  };

  handleLoadMore = () => {
    const { currentPage, query } = this.state;
    const nextPage = currentPage + 1;

    this.fetchData(query, nextPage, IMAGES_PER_PAGE);
  };

  render() {
    const { images, isLoading, query } = this.state;
    const showButton = images.length > 0 && !isLoading;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {query && <ImageGallery images={images} />}
        {showButton && <Button onClick={this.handleLoadMore}>Load More</Button>}
        {isLoading && <Loader />}
      </div>
    );
  }
}