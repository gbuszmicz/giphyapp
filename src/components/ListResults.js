import React, { Component } from 'react';
import { 
  StyleSheet, 
  ListView
} from 'react-native';
import ListResultItem from './ListResultItem';

export default class ListResults extends Component {

  constructor(props) {
    super(props);
    this._renderCell = this._renderCell.bind(this);

    let { entries } = this.props;
    const rowHasChanged = (r1, r2) => r1 !== r2;
    let ds = new ListView.DataSource({rowHasChanged});
    this.state = {
      dataSource: ds.cloneWithRows(entries),
      canLoadMore: true
    };
  }

  _renderCell(rowData) {
    const imageAnimated = ( // Sometimes ['fixed_height_small'].url is emtpy
      rowData.images['fixed_height_small'].url == '' ? 
      rowData.images['fixed_height'].url :
      rowData.images['fixed_height_small'].url
    );
    const imageStill = (
      rowData.images['fixed_height_small_still'].url == '' ?
      rowData.images['fixed_height_still'].url :
      rowData.images['fixed_height_small_still'].url
    );
    return (
      <ListResultItem still={imageStill} animated={imageAnimated} />
    )
  }

  // _loadMoreAsync() { // For pagination. Not used
  //   console.log("outside InteractionManager")
  //   InteractionManager.runAfterInteractions(() => {
  //     console.log("is loading moooore...")
  //   });
  // }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.content}
        dataSource={this.state.dataSource}
        renderRow={this._renderCell}
        scrollRenderAheadDistance={500}
        enableEmptySections
        initialListSize={15}
        pageSize={3}
      />
    )
  }
}

ListResults.propTypes = {
  entries: React.PropTypes.array
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: 'red',
    margin: 1
  }
});