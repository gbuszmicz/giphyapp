import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import AppStyleSheet from "../styles";
import Icon from 'react-native-vector-icons/Foundation';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  render() {
    return (
      <View style={[styles.searchContainer, this.props.style]}>
        <Icon name="magnifying-glass" 
          size={30} 
          style={[AppStyleSheet.defaultButton, styles.searchIcon]} />
        <TextInput 
          style={styles.searchInput} 
          onChangeText={(search) => this.setState({search})}
          value={this.state.search}
        />
        <TouchableOpacity 
          style={AppStyleSheet.defaultButton} 
          onPress={() => 
            this.props.onSearch && 
            this.props.onSearch(this.state.search)} 
          >
          <Text style={AppStyleSheet.defaultButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
  }
});