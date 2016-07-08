'use strict';

import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';

import PortableView from './PortableGirdDemo.js';
import Test from './Test';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      row: 3
    };
  }

  render () {
    return (
      <Test/>
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