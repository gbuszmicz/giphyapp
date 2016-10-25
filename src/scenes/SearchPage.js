import React, { Component, PropTypes } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Map, List, fromJS } from 'immutable';

import { search } from '../actions/network';
import ListResults from '../components/ListResults';

class SearchPage extends Component {

  componentDidMount() {
    let { search, currentSearch } = this.props;
    search(currentSearch, 27);
  }

  handleLoadMore() {
    let { loadMore, currentSearch, pagination } = this.props;
    console.log(pagination);
  }

  render() {
    let { currentSearch, entries, pagination, fetching } = this.props;
    let list;
    if(fetching) list = (
      <ActivityIndicator
        style={[styles.centering, { height: 80 }]}
        size="large"
      />     
    )
    if(!fetching) list = (
      <ListResults entries={entries} handleLoadMore={this.handleLoadMore()} /> 
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
    search: (query, quantity) => dispatch(search(query, quantity)),
    loadMore: (query, quantity, offset) => dispatch(search(query, quantity, offset))
  }
}

const mapStateToProps = (state) => {
  let appState = state.get('app').toObject();
  // let currentSearch = state.get('app').toObject();
  // let isFetching = state.get('app').get('isFetching');
  // let data = appState.isFetching ? [] : appState.entries;
  let data = state.get('app').get('entries');
  let pag = state.get('app').get('pagination');
  return {
    currentSearch: appState.currentSearch,
    fetching: appState.isFetching,
    entries: data,
    pagination: pag
  }
/*  if(isFetching) {
    return {
      currentSearch,
      fetching: isFetching,
      entries: state.get('app').get('entries').toObject()
    }
  } else {
    return {
      currentSearch,
      fetching: false,
      entries: state.get('app').get('entries').toObject()

    }*/
  // return {
  //   currentSearch: state.get('search','currentSearch'),
  //   entries: state.get('trending', 'entries')
  // }
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
)(SearchPage);