import React from 'react';
import {ThemeProvider, CSSReset} from '@chakra-ui/core'
import {customTheme} from "./styles/theme"
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from './graphqls/client'
import Routes from './routes/main'
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={customTheme}>
                <CSSReset/>
                <Routes/>
            </ThemeProvider>
        </ApolloProvider>

    );
}

export default App;
