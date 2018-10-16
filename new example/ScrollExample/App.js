
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native'

import SortableGrid from './library/react-native-sort-grid/index'

import {global} from '../constant/global'

const { height } = Dimensions.get('window');

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      scrollEnabled: true,
    }
    this.numbers = [0,1,2,3,4,5,6,7,8,9,10,11]
    this.currentOffset = 0;
  }

  getColor() {
    let r = this.randomRGB()
    let g = this.randomRGB()
    let b = this.randomRGB()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
  randomRGB = () => 160 + Math.random()*85

  startDelete = () => {
    console.log(
      this.refs.SortableGrid.toggleDeleteMode()
    )
  }

  onScroll = (event) => {
    var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    console.log(direction);
    console.log(currentOffset);
    global._ScrollOffset = currentOffset;
  }

  ScrollStart = () => {
    global._animation = true;
  }

  ScrollEnd = () => {
    global._animation = false;
  }

  render() {
    return (
      <ScrollView ref={ref => this.ScrollView = ref} scrollEventThrottle={16} horizontal = {false}
       onMomentumScrollEnd = {this.ScrollEnd}
       onMomentumScrollBegin = {this.ScrollStart}
       scrollEnabled = {this.state.scrollEnabled}  onScroll={this.onScroll}>
        <SortableGrid
          blockTransitionDuration      = { 400 }
          activeBlockCenteringDuration = { 200 }
          itemsPerRow                  = { 2}
          dragActivationTreshold       = { 200 }
          onDragRelease                = { (itemOrder) => this.setState({scrollEnabled: true}) }
          onDragStart                  = { ()          => this.setState({scrollEnabled: false}) }
          onDeleteItem                 = { (item)      => console.log("Item was deleted:", item) }
          parendRef                    = {this.ScrollView}
          windowHeight                 = {height}
          ref={'SortableGrid'}
          currentOffset                = {this.currentOffset}
        >
          {
            this.numbers.map( (letter, index) =>
              <View
                ref={ 'itemref_' + index }
                onTap={ this.startDelete }
                key={ index }
                style={[
                  styles.block,
                  { backgroundColor: this.getColor() }
                ]}
              >
                <Text style={{color: 'white', fontSize: 45}}>{letter}</Text>
              </View>
            )
          }
        </SortableGrid>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});