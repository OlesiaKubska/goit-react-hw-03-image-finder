import React, { Component } from 'react';
import api from 'api';

const IMAGES_PER_PAGE = 12;

export class App extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const images = await api.fetchImages('nature', 1, IMAGES_PER_PAGE);
      console.log(images);
      // Делайте что-то с полученными изображениями
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        {/* Ваш код компонента */}
      </div>
    );
  }
}