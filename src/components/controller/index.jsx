import React from 'react'
import './styles.css'

export default class Controller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bpm: 128,
      step: null,
      interval: null,
      isPlaying: false,
    }
  }

  togglePlay = () => {
    const { isPlaying, interval, bpm } = this.state
    if (isPlaying) {
      clearInterval(interval)
      this.setState({ isPlaying: false, interval: null })
    } else {
      const interval = setInterval(() => {
        const { step } = this.state
        if (step === null || step === 15) {
          this.setState({ step: 0 })
        } else {
          this.setState({ step: step + 1 })
        }
      }, bpm)
      this.setState({ isPlaying: true, interval })
    }
  }

  renderPlayButton() {
    const { isPlaying } = this.state
    const innerHTML = isPlaying ? 'pause' : 'play'
    return <button onClick={this.togglePlay}>{innerHTML}</button>
  }

  renderSteps() {
    const { step } = this.state
    const steps = []
    for (let i = 0; i < 16; i++) {
      const playingClassname = step === i ? 'playing' : ''
      steps.push(<span key={i} className={`step ${playingClassname}`}>{i + 1}</span>)
    }
    return steps
  }

  render() {
    return (
      <div className="Controller">
        <div className="header">
          <h1 className="title">JS-808</h1>
          <span className="toolbar">
            <button>stop</button>
            {this.renderPlayButton()}
            <span>128</span>
            {/* <input value="128"/> */}
            <span>BPM</span>
            <span>Sequence 1</span>
          </span>
        </div>
        <div className="steps">
          {this.renderSteps()}
        </div>
      </div>
    )
  }
}
