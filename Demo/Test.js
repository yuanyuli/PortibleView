import React, {Component} from 'react';
import {View, Text, PanResponder, Animated, LayoutAnimation} from 'react-native';

export default class PortableView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      pan: new Animated.ValueXY({x: 0, y: 0}),
      currentPanIndex: 0
    };
    this.positions = []
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {

        //reset pan
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        this.setPanReaponderhandler(evt, gestureState);

      },
      onPanResponderMove: (evt, gestureState) => {

        let {x0, y0, dx, dy} = gestureState;

        this.state.pan.x.setValue(gestureState.dx);
        this.state.pan.y.setValue(gestureState.dy);

      },

      // do not release panResponder 
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {

        // reset pan
        this.state.pan.flattenOffset();
        this.state.pan.setValue({x: 0, y: 0});
        // change position
        this.updatePosition(evt, gestureState);


      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  setPanReaponderhandler(evt, gestureState) {
    let {x0, y0} = gestureState;

    for (let i = 0; i < this.positions.length; i++) {
      let position = this.positions[i];
      let {x, y, width, height} = position;
      if ((x0 >= x && x0 <= x + width) && (y0 >= y && y0 <= y + height)) {
        this.setState({currentPanIndex: i});
        let pan = this.refs["pan" + i];
        pan = this._panResponder.panHandlers;
        this.props.setPanResponderHandler && this.props.setPanResponderHandler(this.state.data[i], this.positions[i], i)
      }
    }
  }

  updatePosition(evt, gestureState) {
    for (let i = 0; i < this.state.data.length; i++) {

      if (this.isInSquare(gestureState, this.positions[i])) {
        let pan = this.state.data[this.state.currentPanIndex];
        let sections = this.state.data;

        sections.splice(this.state.currentPanIndex, 1);
        sections.splice(i, 0, pan);

        this.forceUpdate();
        this.positionHasBeenChanged(i);
      }
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

      let animatedStyle = i == this.state.currentPanIndex ? {transform: [{translateX}, {translateY}]} : {};

      return (
        <Animated.View
          key={i}
          ref={"pan" + i}
          style={{...animatedStyle}}
          {...this._panResponder.panHandlers}
          onLayout={(event) => this.handleLayout(event,i)}
        >
          {this.props.renderContent && this.props.renderContent(obj, i)}
        </Animated.View>
      )
    });

    return (

      <View
        {...this.props.style}
      >
        {content}
      </View>
    )
  }

  // callback

  positionHasBeenChanged(i) {
    this.props.positionHasBeenChanged && this.props.positionHasBeenChanged({
      position: this.positions[this.state.currentPanIndex],
      index: this.state.currentPanIndex
    }, {position: this.positions[i], index: i})
  }


  // private

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


}


PortableView.PropTypes = {
  renderContent: React.PropTypes.func,
  positionHasBeenChanged: React.PropTypes.func,
  setPanResponderHandler: React.PropTypes.func
};
PortableView.defaultProps = {};