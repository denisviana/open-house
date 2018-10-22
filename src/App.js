import React, { Component } from 'react';
import './App.css';
import "./css/header.css";
import "./css/navbar.css";
import "./css/content.css";
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {urls} from './utils/UrlUtils'
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Add from './components/Add';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffb300',
    },
    secondary: {
      main: '#5e35b1',
    },
  },
  typography: {
    "fontFamily": "\"Quicksand\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline/>
            <Router>
              <MainLayout>
                <Switch>
                  <Route path={urls.home.path} exact component={Home} />
                  <Route path={urls.add.path} exact component={Add}/>
                </Switch>              
              </MainLayout>
            </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
