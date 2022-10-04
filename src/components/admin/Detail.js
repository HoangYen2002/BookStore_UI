import React from "react";
import { useEffect, useState } from "react";
import { bookApi } from "../misc/BookApi";

import {
  Item,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
  Table,
} from "semantic-ui-react";
// import PageNotF from "../home/PageNotF";
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
            <Table compact striped selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={2}>Order Num</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Order Date</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Total Quantity</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Total Amount</Table.HeaderCell>
                  <Table.HeaderCell width={2}>View Details</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {order.map((item) => {
                  return <ModelOrderDetail item={item}></ModelOrderDetail>;
                })}
              </Table.Body>
            </Table>
          </Item.Group>
        </Segment>
      </Container>
    </div>
  );
}

export default Detail;
