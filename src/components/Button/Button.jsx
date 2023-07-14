import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledButton} from './Button.styled';

class Button extends Component {
    render() {
        const { onClick, children } = this.props;
        
        return <StyledButton onClick={onClick}>{children}</StyledButton>
        
    }
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;