import React, {Component} from 'react';
import {View, Text, PanResponder, Animated,LayoutAnimation} from 'react-native';

let SECTIONS = [{color: 'red'}, {color: 'green'}, {color: 'blue'}, {color: 'black'}, {color: 'yellow'}];

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: SECTIONS,
      pan: new Animated.ValueXY({x: 0, y: 0}),
      translateX1: new Animated.Value(0),
      isChangePosition: false,
      currentPanIndex: 0
    },
      this.positions = [],
      this.animations = {
        duration: 200,
        create: {
          type: LayoutAnimation.Types.linear,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        }
      }
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

        // let position = this.positions[this.state.currentPanIndex];
        // let {x, y, width, height} = position;
        //

        // let pan = this.positions.splice(this.state.currentPanIndex,1);

        // let insert = this.positions.splice(this.state.currentPanIndex+1,1,pan);

        // for (let i = 0; i<this.positions.length ; i++) {
        //   let nextPositon = this.positions[i];
        //   let {nx, ny, nwidth, nheight} = nextPositon;
        //   if (x0 + dx >= nx ) {
        //
        //   }
        //
        // }

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
        this.state.pan.setValue({x: 0, y: 0});
        for (let i = 0; i < this.state.data.length; i++) {
          if (this.isInSquare(gestureState, this.positions[i])) {

            let pan = this.state.data[this.state.currentPanIndex];
            let sections = this.state.data;
            sections.splice(this.state.currentPanIndex, 1);
            sections.splice(i, 0, pan);
            this.forceUpdate();
          }
        }

      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  componentWillUpdate() {
    if (this.props.animated) {
      LayoutAnimation.configureNext(this.animations);
    }
  }

  isInSquare(gestureState, position) {
    let {x0, y0, dx, dy} = gestureState;
    let {x, y, width, height} = position;

    let endX = x0 + dx;
    let endY = y0 + dy;

    if ((endX >= x && endX <= x + width) && (endY >= y && endY <= y + height)) {
      return true;
    } else {
      return false;
    }

  }

  handleLayout(event, index) {
    let {nativeEvent: {layout: {x, y, width, height}}} = event;
    let positon = {x: x, y: y, width: width, height: height};
    this.positions[index] = positon;
  }

  render() {

    let {pan} = this.state;

    let [translateX,translateY] = [pan.x, pan.y];


    let content = this.state.data.map((obj, i) => {

      console.log(this.state.currentPanIndex);
      let animatedStyle = i == this.state.currentPanIndex ? {transform: [{translateX},{translateY}]} : {};

      return (
        <Animated.View
          key={i}
          ref={"pan" + i}
          {...this._panResponder.panHandlers}
          onLayout={(event) => this.handleLayout(event,i)}
          style={{...animatedStyle,marginLeft:20,marginTop:20,width:100,height:100,backgroundColor:obj.color}}
        />
      )
    });

    return (

      <View
        style={{flex:1,width:300,flexWrap:'wrap',justifyContent:'center',alignItems:'center',flexDirection:'row'}}
      >
        {content}

      </View>
    )
  }

}