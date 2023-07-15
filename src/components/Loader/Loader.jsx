import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';
import { LoaderContainer } from './Loader.styled';

class Loader extends Component {
    render() {

        return (
            <LoaderContainer>
                <DotLoader
                    color="#00BFFF"
                    size={80}
                />
            </LoaderContainer>
        );
    }
}

export default Loader;