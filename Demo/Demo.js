'use strict';

import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';

import PortableView from './Test';

let SECTIONS = [{color: 'red'}, {color: 'green'}, {color: 'blue'}, {color: 'black'}, {color: 'yellow'}];


export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      row: 3
    };
  }

  renderContent(obj,i) {
    return (
      <View
        style={{marginLeft:20,marginTop:20,width:100,height:100,backgroundColor:obj.color}}

      >
        <Text> {obj.color} + {i} </Text>
      </View>
    )
  }

  render () {
    return (
      <PortableView
        style={{flex:1,width:300,flexWrap:'wrap',justifyContent:'center',alignItems:'center',flexDirection:'row'}}
        data = {SECTIONS}
        renderContent = {this.renderContent.bind(this)}
      />
    )
  }

  // render() {
  //   return (
  //     <PortableView
  //       data={days}
  //       row={this.state.row}
  //       changeRow={() => {
  //       this.setState({row:this.state.row <4? this.state.row+1 : 2})
  //       }}
  //     >
  //     </PortableView>
  //   );
  // }
}