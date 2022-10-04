import React from "react";
import {
  Item,
  //  Image,
  Button,
  Table,
  Image,
  //   Grid,
  //   Header,
  //   Icon,
  //   Segment,
  // Input,
  // Form,
} from "semantic-ui-react";
import { bookApi } from "../misc/BookApi";
export default function ModelOrderDetail({ item }) {
  const [orderDetailList, setOrderDetailList] = React.useState([]);

  async function handleGetOrderDetails() {
    let user = JSON.parse(localStorage.getItem("user"));
    let response = await bookApi
      .getOrderDetail(user, item.id)
      .then((response) => {
        console.log(response.data);
      });

    if (response != "") {
      let list = response.data.map((orderDetail) => {
        return (
          <Table.Row key={orderDetail.id}>
            <Table.Cell>
              <Image
                src={`http://covers.openlibrary.org/b/isbn/${orderDetail.book.isbn}-M.jpg`}
                size="tiny"
                bordered
                rounded
              />
            </Table.Cell>
            <Table.Cell>{orderDetail.book.isbn}</Table.Cell>
            <Table.Cell>{orderDetail.book.title}</Table.Cell>
            <Table.Cell>{orderDetail.book.price}</Table.Cell>
            <Table.Cell>{orderDetail.quantity}</Table.Cell>
            <Table.Cell>{orderDetail.amount}</Table.Cell>
          </Table.Row>
        );
      });
      setOrderDetailList(list);
    }
  }

  return (
    <Item key={item.id}>
      <Item.Content>
        <Item.Header>Name: {item.name}</Item.Header>
        <Item.Meta>Total Amount: {item.amount}</Item.Meta>
        <Item.Meta>Date: {item.orderDate}</Item.Meta>
        <Button onClick={handleGetOrderDetails}>View Detail</Button>
        <Item.Meta>orderDetailList</Item.Meta>
      </Item.Content>
    </Item>
  );
}
