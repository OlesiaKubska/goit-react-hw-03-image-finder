import React, { Component } from 'react';
import api from 'api';
import Searchbar from './Searchbar/Searchbar';

const IMAGES_PER_PAGE = 12;

export class App extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const images = await api.fetchImages(1, IMAGES_PER_PAGE);
      this.setState({ images });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearchSubmit = query => {
    this.fetchData(query);
  }

  render() {
    const { images } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        
        <div>
          {images.map((image) => (
            <img key={image.id} src={image.webformatURL} alt="" />
          ))}
        </div>
      </div>
    );
  }
}