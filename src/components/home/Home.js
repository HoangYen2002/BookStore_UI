import React, { Component } from "react";
import {
  Statistic,
  Icon,
  Grid,
  Container,
  Image,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { bookApi } from "../misc/BookApi";
import { handleLogError } from "../misc/Helpers";
import AuthContext from "../context/AuthContext";
class Home extends Component {
  state = {
    numberOfUsers: 0,
    numberOfBooks: 0,
    isLoading: false,
    isAdmin: "",
  };
  static contextType = AuthContext;

  async componentDidMount() {
    const Auth = this.context;
    const user = Auth.getUser();
    if (user.role == "ADMIN") {
      this.setState({ isAdmin: true });
    } else {
      this.setState({ isAdmin: false });
    }

    this.setState({ isLoading: true });
    try {
      let response = await bookApi.numberOfUsers();
      const numberOfUsers = response.data;

      response = await bookApi.numberOfBooks();
      const numberOfBooks = response.data;

      this.setState({ numberOfUsers, numberOfBooks });
    } catch (error) {
      handleLogError(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
          <Dimmer active inverted>
            <Loader inverted size="huge">
              Loading
            </Loader>
          </Dimmer>
        </Segment>
      );
    } else {
      const { numberOfUsers, numberOfBooks } = this.state;

      return (
        <Container text>
          {this.state.isAdmin === true ? (
            <>
              <Grid stackable columns={2}>
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Segment color="blue">
                      <Statistic>
                        <Statistic.Value>
                          <Icon name="user" color="grey" />
                          {numberOfUsers}
                        </Statistic.Value>
                        <Statistic.Label>Users</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Segment color="blue">
                      <Statistic>
                        <Statistic.Value>
                          <Icon name="book" color="grey" />
                          {numberOfBooks}
                        </Statistic.Value>
                        <Statistic.Label>Books</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      style={{ height: "400px", width: "100%" }}
                      class="d-block w-100"
                      src="https://blog.dktcdn.net/files/kinhd-doanh-sach-bao.jpg"
                      alt="First slide"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      style={{ height: "400px", width: "100%" }}
                      class="d-block w-100"
                      src="https://blog.dktcdn.net/articles/ban-sach-online.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      style={{ height: "400px", width: "100%" }}
                      class="d-block w-100"
                      src="https://toplist.vn/images/800px/trung-tam-sach-kim-dong-532004.jpg"
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <Image
                src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png"
                style={{ marginTop: "2em" }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginTop: "2em" }}
              />
            </>
          ) : (
            <>
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      style={{ height: "400px", width: "100%" }}
                      class="d-block w-100"
                      src="https://blog.dktcdn.net/files/kinhd-doanh-sach-bao.jpg"
                      alt="First slide"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      style={{ height: "400px", width: "100%" }}
                      class="d-block w-100"
                      src="https://blog.dktcdn.net/articles/ban-sach-online.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      style={{ height: "400px", width: "100%" }}
                      class="d-block w-100"
                      src="https://toplist.vn/images/800px/trung-tam-sach-kim-dong-532004.jpg"
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <Image
                src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png"
                style={{ marginTop: "2em" }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginTop: "2em" }}
              />
            </>
          )}
        </Container>
      );
    }
  }
}

export default Home;
