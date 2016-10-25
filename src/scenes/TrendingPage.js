import React, { Component, PropTypes } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Map, List, fromJS } from 'immutable';

import { fetchTrending } from '../actions/network';
import ListResults from '../components/ListResults';

class TrendingPage extends Component {

  componentDidMount() {
    let { fetchTrending } = this.props;
    fetchTrending(21);
  }

  render() {
    let { entries, fetching } = this.props;
    let list;
    if(fetching) list = (
      <ActivityIndicator
        style={[styles.centering, { height: 80 }]}
        size="large"
      />     
    )
    if(!fetching) list = (
      <ListResults entries={entries} /> 
    )

    return (
      <View style={styles.container}>
        { list }
      </View>
    );
  }
}

// SearchPage.propTypes = {
//   search: PropTypes.func.isRequired,
//   entries: PropTypes.object,
//   currentSearch: PropTypes.string.isRequired,
//   fetching: PropTypes.bool.isRequired
// }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrending: (quantity) => dispatch(fetchTrending(quantity))
  }
}

const mapStateToProps = (state) => {
  let appState = state.get('app').toObject();
  let data = state.get('app').get('entries');
  return {
    fetching: appState.isFetching,
    entries: data
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column'
  }
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TrendingPage);