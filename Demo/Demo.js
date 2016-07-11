'use strict';

import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ScrollView,
  PixelRatio
} from 'react-native';


let red =  Math.round(Math.random() * 255);
let green =  Math.round(Math.random() * 255);
let blue =  Math.round(Math.random() * 255);

let randomColor = ('rgb('+ red +','+green+','+blue +')').toString();

import PortableView from 'react-native-portable-view';

let SECTIONS = [{color: 'red'}, {color: 'green'}, {color: 'blue'}, {color: 'yellow'}, {color: randomColor}];


export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: SECTIONS,
    };
  }

  renderContent(obj, i) {
    return (
      <View
        style={{marginLeft:20,marginTop:20,width:70,height:30,backgroundColor:obj.color,justifyContent:'center',alignItems:'center',borderWidth:1/PixelRatio.get(),borderRadius:15}}
      >
        <Text
        style = {{color: 'white'}}
        > # {i} # </Text>
      </View>
    )
  }

  render() {
    return (

      <View>
        <PortableView
          style={{flex:1,width:375,flexWrap:'wrap',alignItems:'center',flexDirection:'row',backgroundColor:'#dbdbdb',height:500,marginTop:20}}
          data={SECTIONS}
          renderContent={this.renderContent.bind(this)}
          positionHasBeenChanged={(position1,position2) => {

          // console.log("position1" + JSON.stringify(position1));
          // console.log("position2" + JSON.stringify(position2));
          }}
          setPanResponderHandler={(obj,position,index) => {
          // console.log('正在成为响应者');
          console.log("obj" + JSON.stringify(obj));
          console.log("position" + JSON.stringify(position));
          console.log("index" + index);
          }}
        />
        <View
        style = {{borderWidth:1/PixelRatio.get(),justifyContent:'center',alignItems:'center',alignSelf:'center',width:300,height:50,marginTop:20}}
        >
          <Text
            style = {{fontSize:20}}
            onPress={this.add.bind(this)}
          >Add</Text>
        </View>
        <View
          style = {{borderWidth:1/PixelRatio.get(),justifyContent:'center',alignItems:'center',alignSelf:'center',width:300,height:50,marginTop:20}}
        >
          <Text
            style = {{fontSize:20}}
            onPress={this.minus.bind(this)}
          >Minus</Text>
        </View>
      </View>
    )
  }

  add() {
    let sections = this.state.data;
    sections.splice(sections.length, 0, {color: this.getRandomColor()});
    this.forceUpdate();
  }

  minus() {
    let sections = this.state.data;
    sections.splice(sections.length - 1, 1);
    this.forceUpdate();
  }

  getRandomColor() {
    let red =  Math.round(Math.random() * 255);
    let green =  Math.round(Math.random() * 255);
    let blue =  Math.round(Math.random() * 255);

    return ('rgb('+ red +','+green+','+blue +')').toString();
  }
}