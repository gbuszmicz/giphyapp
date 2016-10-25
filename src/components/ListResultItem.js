'use strict';
import React, { Component, PropTypes } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  ActivityIndicator, 
  TouchableHighlight,
  Dimensions 
} from 'react-native';

export default class ListResultItem extends Component {

  constructor(props) {
    super(props);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);

    let screen = Dimensions.get('window');
    let screenWidth = (screen.width / 3) - 1
    this.state = {
      animationLoaded: false,
      loadingImage: false,
      startLoadingAnimation: false,
      screenWidth
    };
  }

  _onLoadEnd() {
    this.setState({
      loadingImage: false, // off spinner
      startLoadingAnimation: true
    })
  }

  _onLoadStart() {
    this.setState({
      loadingImage: true // To activate spinner
    })
  }

  _onPress(source) {
    // TODO;
  }

  render() {
    let source = {
      uri: this.props.still
    };
    let animatedSource = {
      uri: this.props.animated
    };
    let getWidthForImage = () => {
      return {
        width: this.state.screenWidth,
        height: this.state.screenWidth
      };
    };
    let makeThisVisible = () => {
      if (!this.state.animationLoaded) {
        return {
          position: 'absolute'
        }
      }
      return null;
    };


    return (
      <TouchableHighlight 
        style={[ styles.container, getWidthForImage() ]} 
        onPress={() => this._onPress(source)}>
        <View>
          { /* Loading spinner animation */
            this.state.loadingImage ? 
            <ActivityIndicator 
              size="large"
              color="white"
              style={{ marginTop:this.state.screenWidth }} /> : 
            null 
          }

          { /* Still image */
             !this.state.animationLoaded ?
              <Image source={source} 
                style={[ styles.image, getWidthForImage() ]}
                onLoadStart={ this._onLoadStart }
                onLoadEnd={ this._onLoadEnd } /> :
             null    

          }

          {  /* Animated Gif */
            this.state.startLoadingAnimation ?
            <Image source={animatedSource} 
              style={[ styles.image, getWidthForImage(), makeThisVisible() ]}
              onLoadEnd={() => this.setState({ animationLoaded:true }) } /> :
            null 
          }
       </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 0.5,
    backgroundColor: 'rgba(192,192,192,0.3)',
    alignItems: 'center'
  },
  image: {
    overflow: 'hidden'
  }
});
