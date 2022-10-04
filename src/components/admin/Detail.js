import React from "react";
import { useEffect, useState } from "react";
import { bookApi } from "../misc/BookApi";

import {
  Item,
  //  Image,
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
  // Input,
  // Form,
} from "semantic-ui-react";
import PageNotF from "../home/PageNotF";
import ModelOrderDetail from "./ModelOrderDetail";
function Detail() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role === "ADMIN") {
      bookApi
        .getDetail(user)
        .then((response) => {
          setOrder(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          //   handleLogError(error);
        })
        .finally(() => {});
    }
  }, []);
  const handleShowDetail = () => {};

  const handleOnclikOrderDetail = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    console.log(order);
    bookApi
      .getOrderDetail(user, order.id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        //   handleLogError(error);
      })
      .finally(() => {});
  };

  return (
    <div>
      <Container>
        <Segment color="blue">
          <Grid stackable divided>
            <Grid.Row columns="2">
              <Grid.Column width="3">
                <Header as="h2">
                  <Icon name="book" />
                  <Header.Content>History</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>
          <Item.Group divided unstackable relaxed link>
            {order.map((item) => {
              return <ModelOrderDetail item={item}></ModelOrderDetail>;
            })}
          </Item.Group>
        </Segment>
      </Container>
    </div>
  );
}

export default Detail;
