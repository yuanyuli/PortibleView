import React, {Component} from 'react';
import {View, Text, PanResponder, Animated} from 'react-native';

let SECTIONS = [{color:'red'}, {color:'green'}];

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({x: 0, y: 0}),
      translateX1: new Animated.Value(0),
      isChangePosition: false,
      currentPanIndex: 0
    },
      this.positions = []

  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
        console.log('正在点击');
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0})

        let {x0, y0} = gestureState;

        for (let i = 0; i < this.positions.length; i++) {
          let position = this.positions[i];
          let {x, y, width, height} = position;

          if ((x0 >= x && x0 <= x + width) && (y0 >= y && y0 <= y + height)) {
            this.setState({currentPanIndex: i});
            let pan = this.refs["pan" + i];
            pan = this._panResponder.panHandlers
          }
        }

      },
      onPanResponderMove: (evt, gestureState) => {
        let {x0, y0, dx, dy} = gestureState;

        this.state.pan.x.setValue(gestureState.dx);
        this.state.pan.y.setValue(gestureState.dy);
        // console.log('x0' + '=' + x0);
        // console.log('y0' + '=' + y0);
        // console.log('dx' + '=' + dx);
        // console.log('dy' + '=' + dy);

        // if (x0 + dx >= (this.state.gX - this.state.gW / 2 ) && !this.state.isChangePosition) {
        //   this.setState({isChangePosition: true});
        //   Animated.timing(this.state.translateX1, {
        //     toValue: this.state.rX - this.state.gX,
        //     duration: 50
        //   }).start(this.setState({gX: 72.5}));
        // } else if (x0 + dx <= (this.state.gX + this.state.gW / 2 ) && this.state.isChangePosition) {
        //   this.setState({isChangePosition: false});
        //   Animated.timing(this.state.translateX1, {
        //     toValue: this.state.rX - this.state.gX,
        //     duration: 50
        //   }).start(this.setState({gX: 202.5}));
        // }

      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.state.pan.flattenOffset();

      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  handleLayout(event, index) {
    let {nativeEvent: {layout: {x, y, width, height}}} = event;
    let positon = {x: x, y: y, width: width, height: height};
    this.positions[index] = positon;
  }
  
  render() {

    let {pan, translateX1} = this.state;

    let [translateX,translateY] = [pan.x, pan.y];


    let content = SECTIONS.map((obj,i) => {

      console.log(this.state.currentPanIndex);
      let animatedStyle = i == this.state.currentPanIndex ? {transform: [{translateX}]} : {};

      return (
        <Animated.View
          key={i}
          ref={"pan" + i}
          {...this._panResponder.panHandlers}
          onLayout={(event) => this.handleLayout(event,i)}
          style={{...animatedStyle,width:100,height:100,backgroundColor:obj.color}}
        />
      )
    });

    return (

      <View
        style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}
      >
        {content}
      </View>
    )
  }
}