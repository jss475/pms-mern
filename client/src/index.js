import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import "@fontsource/urbanist";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UnsplashProvider } from './context/UnsplashContext';
import "./index.css"
import { persistor, store } from './store';

const theme = createTheme({
  palette: {
    background: '#abd1c6',
    headline: '#001e1d',
    subHeadline: '#0f3433',
    cardBg: '#004643',
    cardHeading: '#fffffe',
    cardParagraph: '#abd1c6',
    main: '#e8e4e6',
    highlight: '#f9bc60',
    tertiary: '#e16162'
  },
  typography: {
    fontFamily: [
      "Urbanist",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
})

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.0rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.4rem',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <UnsplashProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </ThemeProvider>
        </UnsplashProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
