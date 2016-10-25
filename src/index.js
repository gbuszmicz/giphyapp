'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import Colors from './constants/Colors';
import { Scene, Router } from 'react-native-router-flux';

// Containers or Scenes or Screens
import HomePage from './scenes/HomePage';
import TrendingPage from './scenes/TrendingPage';
import SearchPage from './scenes/SearchPage';

const store = configureStore(
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default class GiphyApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router navigationBarStyle={styles.header} 
          titleStyle={styles.headerTitle} 
          backButtonTextStyle={styles.headerTitle} 
          sceneStyle={styles.content}>
          <Scene key="root">
            <Scene key="home" initial={true} component={HomePage} title="GiphyApp" />
            <Scene key="trending" component={TrendingPage} title="Trending"/>
            <Scene key="search" component={SearchPage} getTitle={(navState) => navState.title}/>
          </Scene>
        </Router>
      </Provider>
      )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flex: 1,
    height: 50,
    borderBottomColor: Colors.PRIMARY_DARKER
  },
  headerTitle:{
    color: Colors.PRIMARY_DARKER
  },
  content:{
    backgroundColor: 'white'
  }
});