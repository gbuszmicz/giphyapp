import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  Image
} from 'react-native';
import AppStyleSheet from '../styles';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Foundation';

export default class Trending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  _handleOnPress() {
    Actions.trending();
  }

  render() {
    let { style, title } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this._handleOnPress()}>
          <View style={[styles.buttonContainer, style]} >
          <Image
            style={styles.buttonIcon}
            source={require('../images/trending.jpg')}
          />
          <Text style={styles.text}>{title}</Text>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f5f8fa'
  },
  buttonIcon: {
    marginLeft: 0,
    width: 45,
    height: 45
  },
  text: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    backgroundColor: '#f5f8fa'
  }
});