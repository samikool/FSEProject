import React from 'react';
import {
  Button, ButtonGroup, FormControl, InputGroup,
} from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', resp: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // eslint-disable-next-line no-useless-concat
    console.log(`Variable Name: ${name} ` + `Value: ${value}`);
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    console.log(`Submitted: Username: '${this.state.username}' Password: '${this.state.password}'`);
    fetch('http://localhost:5000/loginRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line react/destructuring-assignment
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ resp: res });
        // eslint-disable-next-line no-console
        console.log(res);
      });
  }

  render() {
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <div style={{ padding: 100 }}>
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="uname">Email Address:</label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email Address"
              aria-label="Email Address"
              aria-describedby="basic-addon2"
              id="uname"
                            /* eslint-disable-next-line react/destructuring-assignment */
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="pass">Password:</label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              id="pass"
                            /* eslint-disable-next-line react/destructuring-assignment */
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </InputGroup>
          <ButtonGroup>
            <Button
              variant="secondary"
              type="submit"
              value="Submit"
            >
              Login
            </Button>
            <Button
              variant="secondary"
              type="register"
              value="register"
            >
              Register
            </Button>
          </ButtonGroup>
        </form>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <h4>{this.state.resp}</h4>
      </div>
    );
  }
}

export default Login;
