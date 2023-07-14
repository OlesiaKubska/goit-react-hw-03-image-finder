import React, { Component } from 'react';
import api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const IMAGES_PER_PAGE = 12;

export class App extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    this.fetchData('nature');
  }

  fetchData = async (query) => {
    try {
      const images = await api.fetchImages(query, 1, IMAGES_PER_PAGE);
      this.setState({ images });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearchSubmit = (query) => {
    this.fetchData(query);
  }

  render() {
    const { images } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} />
        
      </div>
    );
  }
}