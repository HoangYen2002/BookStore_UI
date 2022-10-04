import React from "react";
import { Icon, Button, Table, Image } from "semantic-ui-react";
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
    <Table.Row key={item.id}>
      <Table.Cell>{item.orderNum}</Table.Cell>
      <Table.Cell>{item.orderDate}</Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.totalQuantity}</Table.Cell>
      <Table.Cell>{item.amount}</Table.Cell>
      <Table.Cell>
        <Button
          circular
          color="blue"
          size="small"
          onClick={handleGetOrderDetails}
        >
          View Details <Icon name="chevron right" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
