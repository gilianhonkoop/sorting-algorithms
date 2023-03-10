import React from 'react'
import '../style/array.scss'

//var ARRAYLENGTH = 7;

function Block(props) {

  return (
    <div className='block' id={"block-" + props.setter}>
        {props.value}
    </div>
  )
}

class Blocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data : Array(this.props.arraylength)};
  }

  initBlocks() {
    return (
      Array.from(Array(this.props.arraylength)).map((e, i) => {

        const num = Math.floor(Math.random() * 50 + 1)
        this.state.data[i] = num;
        return (
          <Block key={i} setter={i} value={this.state.data[i]}/>
        );
      })
    )
  }

  render() {

    return (
      <>
        {this.initBlocks()}
      </>
    );
  }
}

const Arr = React.forwardRef((props, ref) => {

  return (
    <div className='array-container'>
      <Blocks ref={ref} arraylength={props.arraylength}/>
    </div>
  )
})

export default Arr