import React, { Component } from 'react';
import { 
  View, 
  StyleSheet,
  Text, 
  TouchableOpacity,
  Image 
} from "react-native";
import AppStyleSheet from "../styles";
import Icon from 'react-native-vector-icons/Foundation';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  render() {
    let { icon, title, style } = this.props;
    return (
      <TouchableOpacity 
        onPress={() => 
          this.props.onSearch && 
          this.props.onSearch(title)} 
        >
        <View style={[styles.buttonContainer, style]}>
          <Image style={styles.buttonIcon} source={icon} />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  searchIcon: {
    padding: 8
  },
  searchInput: {
    flex: 1,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f5f8fa'
  },
});