import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1200;
`;

export const ModalContainer = styled.div`
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
`;

export const ModalDescr = styled.p`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 16 px;
    width: 100%;
    color: #FD5523;
    background-color: rgba(185, 228, 201, 0.5);
    box-shadow: 0px -2px 4px 1px rgba(0, 0, 0, 0.2),
        0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(5.5px);
    text-align: center;
`;