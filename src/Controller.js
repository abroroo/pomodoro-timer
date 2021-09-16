  
import React, { Component } from 'react';
import './Controller.css';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';  
import { FaRedoAlt } from 'react-icons/fa';

export default class Controller extends Component {
  render() {
    return (
      <div className="controller">
        <button id="start_stop" onClick={this.props.onStartStop}>
          {this.props.isStart ? <FaPause /> : <FaPlay />}
        </button>
        <button id="reset" onClick={this.props.onReset}><FaRedoAlt /></button>
      </div>
    )
  }
}