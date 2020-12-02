import React from 'react';
import styled from 'styled-components';
import Calculator from './calculator';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    @media screen and (max-width: 992px) {
        flex-direction: column;
    }
`;

const App = () => {
    return (
        <Container>
            <Calculator />
        </Container>
    );
};

export default App;
