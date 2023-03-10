import React, {useState, useEffect} from 'react'
import '../style/buttons.scss'
import insertionSort from '../lib/insertionSort.js';

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.data = null;
    this.i = 1;
    this.j = 0;
    this.previ = 0;
    this.prevj = 0;
  }

  componentDidMount() {
    this.data = this.props.aref.current.state.data
  }

  render() {

    return (
      <div className='buttons'>
        <div className='wrapper'>
          <button className='previous' onClick={async() => {
            [this.i, this.j] = await insertionSort(this.data, 'previous', this.i, this.j, 'normal', this.previ, this.prevj);
            console.log(this.i, this.j)
            }}></button>
        </div>
        <div className='wrapper'>
          <div className='play' 
          style={{transition: this.props.resizing ? 'none' : '0.5s',}} onClick={async () => {
            [this.i, this.j] = await insertionSort(this.data, 'play', this.i, this.j, 'normal');
            console.log(this.i, this.j)
            }}>
            <button className='triangle'></button>
            <div className='circle'></div>
          </div>
        </div>
        <div className='wrapper'>
          <button className='next' onClick={async () => {
            [this.i, this.j, this.previ, this.prevj] = await insertionSort(this.data, 'next', this.i, this.j, 'fast');
            console.log(this.i, this.j)
            }}></button>
        </div>
      </div>
      
    )
  }
}

export default Buttons