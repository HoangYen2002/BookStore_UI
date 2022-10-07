import React from "react";
import ModelPopup from "./ModelPopup";
import { useEffect, useState } from "react";
import {
  Table,
  Item,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { bookApi } from "../misc/BookApi";
export default function Order() {
  const [orderUser, setOrderUser] = useState([]);
  const [user, setuser] = useState();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    setuser(user);
    if (user && user.role === "USER") {
      bookApi
        .getOrderUser(user, user.name)
        .then((response) => {
          setOrderUser(response.data);
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
                {orderUser.map((item) => {
                  return (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.orderNum}</Table.Cell>
                      <Table.Cell>{item.orderDate}</Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.totalQuantity}</Table.Cell>
                      <Table.Cell>{item.amount}</Table.Cell>
                      <Table.Cell>
                        <ModelPopup orderId={item.id} user={user} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Item.Group>
        </Segment>
      </Container>
    </div>
  );
}
