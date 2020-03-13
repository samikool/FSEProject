import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <div style={{ padding: 10 }}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <h4>{this.state.date.toLocaleTimeString()}</h4>
      </div>
    );
  }
}

export default Clock;
