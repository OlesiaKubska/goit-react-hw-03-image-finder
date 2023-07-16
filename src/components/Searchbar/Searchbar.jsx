import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }

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
            <Header>
                <Form onSubmit={this.handleSubmit}>
                    <Button type="submit">
                        <HiMagnifyingGlass />
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>

                    <Input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={this.handleChange}
                    />
                </Form>
            </Header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;