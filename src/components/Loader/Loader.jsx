import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';

class Loader extends Component {
    render() {

        return (
            <div className="loader">
                <DotLoader
                    color="#00BFFF"
                    size={80}
                />
            </div>
        );
    }
}

export default Loader;