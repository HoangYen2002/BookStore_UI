import React from "react";
import { Table } from "semantic-ui-react";

import { useEffect } from "react";
import ModelPopup from "./ModelPopup";
export default function ModelOrderDetail({ item }) {
  const [orderDetailList, setOrderDetailList] = React.useState([]);

  const [user, setuser] = React.useState([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setuser(user);
  }, []);

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
}
