import React, { Component } from 'react';
import Settings from './Settings';
import Times from './Times';
import Controller from './Controller';
import './App.css';
import ToDoList from "./ToDoList";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.audioBeep = React.createRef();

    this.state = {
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
}

    this.onIncreaseBreak = this.onIncreaseBreak.bind(this);
    this.onDecreaseBreak = this.onDecreaseBreak.bind(this);
    this.onIncreaseSession = this.onIncreaseSession.bind(this);
    this.onDecreaseSession = this.onDecreaseSession.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onStartStop = this.onStartStop.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
  }


   onIncreaseBreak() {
    if (this.state.breakLength < 60 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }

  onDecreaseBreak() {
    if (this.state.breakLength > 1 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  onIncreaseSession() {
    if (this.state.sessionLength < 60 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeftInSecond: (this.state.sessionLength + 1) * 60
      });
    }
  }

  onDecreaseSession() {
    if (this.state.sessionLength > 1 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeftInSecond: (this.state.sessionLength - 1) * 60
      });
    }
  }

  onReset() {
    this.setState({
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    });

    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStartStop() {
    if (!this.state.isStart) {
      this.setState({
        isStart: !this.state.isStart,
        timerInterval: setInterval(() => {
          this.decreaseTimer();
          this.phaseControl();
        }, 1000)
      })
    } else {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);

      this.setState({
        isStart: !this.state.isStart,
        timerInterval: null
      });
    }
  }

  decreaseTimer() {
    this.setState({
      timeLeftInSecond: this.state.timeLeftInSecond - 1
    });
  }

  phaseControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audioBeep.current.play();
    } else if (this.state.timeLeftInSecond === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break',
          timeLeftInSecond: this.state.breakLength * 60
        });
      } else {
        this.setState({
          timeLabel: 'Session',
          timeLeftInSecond: this.state.sessionLength * 60
        });
      }
    }
  }

   render() {
    return (
      
      <div className="pomodoro-clock">
        <div className="pomodoro-clock-header">
          <h1 className="pomodoro-clock-header-name">Pomodoro</h1>
        </div>
        <div className="container">
        <Settings
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          isStart={this.state.isStart}
          onDecreaseBreak={this.onDecreaseBreak}
          onDecreaseSession={this.onDecreaseSession}
          onIncreaseBreak={this.onIncreaseBreak}
          onIncreaseSession={this.onIncreaseSession}
        />

        <Times
          timeLabel={this.state.timeLabel}
          timeLeftInSecond={this.state.timeLeftInSecond}
        />

        <Controller
          onReset={this.onReset}
          onStartStop={this.onStartStop}
          isStart={this.state.isStart}
        />

        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={this.audioBeep}></audio>
       </div>

      <ToDoList />

         <div className="body-text">
          <div className="text-box">

              <h1>An online Pomodoro Timer to boost your productivity</h1>
                <h2>What is Pomodoro?</h2>
                <hr />
                <p>Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser. The aim of this app is to help you focus on any task you are working on, such as study, writing, or coding. This app is inspired by Pomodoro Technique which is a time management method developed by Francesco Cirillo.</p>
                <h2>What is Pomodoro Technique?</h2>
                <hr />
                <p>The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student. - Wikipedia</p>
                <h2>How to use the Pomodoro Timer?</h2>
                <hr />
                <ol>
                  <li>Add tasks to work on today</li>
                  <li>Set estimate pomodoros (1 = 25min of work) for each tasks</li>
                  <li>Select a task to work on</li>
                  <li>Start timer and focus on the task for 25 minutes</li>
                  <li>Take a break for 5 minutes when the alarm ring</li>
                  <li>Iterate 3-5 until you finish the tasks</li>
                </ol>
                <h2>Features</h2>
                <hr />
                <ul>
                  <li>Responsive design that works with desktop and mobile</li>
                  <li>Color transition to switch moods between work time and rest time</li>
                  <li>Audio notification at the end of a timer period</li>
                  <li>Customizable timer intervals to suit your preference</li>
                </ul>

          </div>
            
        </div>
      </div>
    );
  }
}