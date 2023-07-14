import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
    state = {
        query: '',
    };

    handleChange = event => {
        this.setState({ query: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { query } = this.state;
        const { onSubmit } = this.props;
        onSubmit(query);
    };

    render() {
        const { query } = this.state;

        return (
            <header className="searchbar">
                <form className="form" onSubmit={this.handleSubmit}>
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={this.handleChange}
                />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
