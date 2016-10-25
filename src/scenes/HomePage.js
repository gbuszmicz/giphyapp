import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { setCurrentSearch } from '../actions/network';
import SearchBox from '../components/SearchBox';
import Trending from '../components/Trending';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Foundation';
import AppStyleSheet from '../styles';

class HomePage extends Component {

  goToSearchScene(query) {
    this.props.setCurrentSearch(query);
    Actions.search({ title: query });
  }

  goToScene() {
    Actions.trending();
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBox style={styles.searchBox} onSearch={(search) => this.goToSearchScene(search)} />
        <Trending style={styles.button} title="Trending" />
        <Button 
          style={styles.button} 
          icon={require('../images/batman.jpg')} 
          title="Batman"
          onSearch={() => this.goToSearchScene('Batman')} />
        <Button 
          style={styles.button} 
          icon={require('../images/cat.jpg')} 
          title="Cats"
          onSearch={() => this.goToSearchScene('Cats')} />
        <Button 
          style={styles.button} 
          icon={require('../images/welldone.gif')} 
          title="Well done"
          onSearch={() => this.goToSearchScene('Well done')} />
        <Button 
          style={styles.button} 
          icon={require('../images/byebye.gif')} 
          title="Bye bye"
          onSearch={() => this.goToSearchScene('Bye bye')} />
        <Button 
          style={styles.button} 
          icon={require('../images/what.gif')} 
          title="What?"
          onSearch={() => this.goToSearchScene('What')} />
        <Button 
          style={styles.button} 
          icon={require('../images/excited.gif')} 
          title="Excited!"
          onSearch={() => this.goToSearchScene('Excited')} />
      </View>
    );
  }
}

HomePage.propTypes = {
  setCurrentSearch: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSearch: (query) => dispatch(setCurrentSearch(query))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: Colors.PRIMARY_DARKER,
    flexDirection: 'column'
  },
  buttonsContainer: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    height: 45,
    margin: 15
  },
  button: {
    height: 45,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35
  },
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);