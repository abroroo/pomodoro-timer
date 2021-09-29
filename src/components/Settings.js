import React, { Component } from 'react';
import './styles/Settings.css';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

export default class Settings extends Component {
  render() {
    const btnClassName = this.props.isStart ? 'disable' : '';

    return (
      <div className="settings">
        <div className="settings-section">
          <label id="break-label">Break Length</label>
          <div>
            <button className={btnClassName} id="break-decrement" onClick={this.props.onDecreaseBreak}><FaMinus /></button>
            <span id="break-length">{this.props.breakLength}</span>
            <button className={btnClassName} id="break-increment" onClick={this.props.onIncreaseBreak}><FaPlus /></button>
          </div>
        </div>
        <div className="settings-section">
          <label id="session-label">Session Length</label>
          <div>
            <button className={btnClassName} id="session-decrement" onClick={this.props.onDecreaseSession}><FaMinus /></button>
            <span id="session-length">{this.props.sessionLength}</span>
            <button className={btnClassName} id="session-increment" onClick={this.props.onIncreaseSession}><FaPlus /></button>
          </div>
        </div>
      </div>
    )
  }
}