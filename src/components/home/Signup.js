import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { bookApi } from "../misc/BookApi";
import { handleLogError } from "../misc/Helpers";

class Signup extends Component {
  static contextType = AuthContext;

  state = {
    username: "",
    password: "",
    name: "",
    email: "",
    isLoggedIn: false,
    isError: false,
    errorMessage: "",
    validEmail: false,
    validName: false,
  };

  componentDidMount() {
    const Auth = this.context;
    const isLoggedIn = Auth.userIsAuthenticated();
    this.setState({ isLoggedIn });
  }

  handleInputChange = (e, { name, value }) => {
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regexname =
      /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;

    this.setState({ [name]: value });

    if (name === "email") {
      if (regexEmail.exec(value)) {
        this.setState({
          validEmail: false,
        });
      } else {
        this.setState({
          validEmail: true,
        });
      }
    }
    if (name === "name") {
      if (regexname.exec(value)) {
        this.setState({
          validName: false,
        });
      } else {
        this.setState({
          validName: true,
        });
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, name, email, validEmail, validName } =
      this.state;
    if (!(username && password && name && email)) {
      this.setState({
        isError: true,
        errorMessage: "Please, inform all fields!",
      });
      return;
    } else if (validEmail === true || validName === true) {
      return;
    }

    const user = { username, password, name, email };
    bookApi
      .signup(user)
      .then((response) => {
        const { id, name, role, username, email } = response.data;

        const authdata = window.btoa(username + ":" + password);
        const user = { id, name, role, authdata, username, email };
        console.log(user);

        const Auth = this.context;
        Auth.userLogin(user);

        this.setState({
          username: "",
          password: "",
          isLoggedIn: true,
          isError: false,
          errorMessage: "",
        });
      })
      .catch((error) => {
        handleLogError(error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          let errorMessage = error.response.data.message;
          if (errorData.status === 409) {
            errorMessage = errorData.message;
          } else if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage;
          }
          this.setState({
            isError: true,
            errorMessage,
          });
        }
      });
  };

  render() {
    const { isLoggedIn, isError, errorMessage } = this.state;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input
                  fluid
                  autoFocus
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name="name"
                  icon="address card"
                  iconPosition="left"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                />
                {this.state.validName === true ? (
                  <p className="validPhone">Not Type Name</p>
                ) : (
                  <></>
                )}
                <Form.Input
                  fluid
                  name="email"
                  icon="at"
                  iconPosition="left"
                  placeholder="Email"
                  onChange={this.handleInputChange}
                />
                {this.state.validEmail === true ? (
                  <p className="validPhone">Not Type Email</p>
                ) : (
                  <></>
                )}

                <Button color="blue" fluid size="large">
                  Signup
                </Button>
              </Segment>
            </Form>
            <Message>
              {`Already have an account? `}
              <a href="/login" color="teal" as={NavLink} to="/login">
                Login
              </a>
            </Message>
            {isError && <Message negative>{errorMessage}</Message>}
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default Signup;
