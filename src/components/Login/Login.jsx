import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'components';

// Services and redux
import { UserAction } from 'actions';
import { ApiService } from 'services';

class Login extends Component {

  constructor(props) {

    super(props);
    // Form username, key and just a message to control errors sintaxis
    this.state = {
      form: {
        username: '',
        key: '',
        error: '',
      },
    }
    // Bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Update the React state with the user data  
  handleChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [name]: value,
        error: '',
      },
    });
  }

  //Sends a login transaction to the blockchain
  handleSubmit(event) {
    // Hide data from the url browser
    event.preventDefault();
    
    const { form } = this.state;
    const { setUser } = this.props;

    // Send a login transaction to the blockchain by calling the ApiService
    return ApiService.login(form)
      .then(() => {
        setUser({ name: form.username });  // If it successes, save the username to redux store
      })
      .catch(err => {
        this.setState({ error: err.toString() }); // Otherwise, save the error state for displaying the message
      });
  }

  render() {
    // Extract data from state
    const { form, error } = this.state;

    return (
      <div className="Login">
        <div className="title">Sports Activity Manager EOS</div>
        <div className="description">Please use the Account Name and Private Key generated in the beginning to log into the system.</div>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Account name</label>
            <input
              type="text"
              name="username"
              value={form.username}
              placeholder="All small letters, a-z, 1-5 or dot, max 12 characters"
              onChange={this.handleChange}
              pattern="[\.a-z1-5]{2,12}"
              required
            />
          </div>
          <div className="field">
            <label>Private key</label>
            <input
              type="password"
              name="key"
              value={form.key}
              onChange={this.handleChange}
              pattern="^.{51,}$"
              required
            />
          </div>
          <div className="field form-error">
            {error && <span className="error">{error}</span>}
          </div>
          <div className="bottom">
            <Button type="submit" className="green">
              {"CONFIRM"}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
