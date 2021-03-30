import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { deDE, enUS } from '@material-ui/core/locale';
import {
  appWideSettingsContext,
  useAppWideSettingsContext,
} from './contexts/appWideSettings';
import { Provider } from 'react-redux';
import store from './redux/store';

const IndexComponent = () => {
  // providing global settings object for other components (subject to refactor)
  const { darkMode, langDe } = useAppWideSettingsContext(
    appWideSettingsContext,
  );
  // build theme based on global settings object

  let theme = createMuiTheme(
    {
      palette: {
        type: darkMode ? 'dark' : 'light',
      },
    },
    langDe ? deDE : enUS,
  );
  theme = responsiveFontSizes(theme);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

// render root of DOM
ReactDOM.render(<IndexComponent />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
