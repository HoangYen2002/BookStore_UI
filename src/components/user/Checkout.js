import React from "react";

import { Button, Form, Grid, Segment, Item, Image } from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react";
import { bookApi } from "../misc/BookApi";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [customerName, setcustomerName] = useState();
  const [customerPhone, setcustomerPhone] = useState();
  const [customerEmail, setcustomerEmail] = useState();
  const [customerAddress, setcustomerAddress] = useState();
  const [sum, setSum] = useState();
  const [orderDetail, setorderDetail] = useState([]);
  const [isBooksLoading, setisBooksLoading] = useState(false);

  useEffect(() => {
    const datacart = localStorage.getItem("cart");
    let mang = JSON.parse(datacart);
    setCart(mang);
    handleSum(mang);
    setOrderDetaill(mang);
  }, []);

  const handleSum = (mang) => {
    var Sum = 0;
    for (var i = 0; i < mang.length; i++) {
      Sum += mang[i].price * mang[i].quantity;
    }
    setSum(Sum);
  };
  const setOrderDetaill = (mang) => {
    var mangOrderDetail = [];

    mangOrderDetail = mang;

    setorderDetail(mangOrderDetail);
  };
  const handleOnChange = (e) => {
    if (e.target.name === "customerName") {
      setcustomerName(e.target.value);
    } else if (e.target.name === "customerPhone") {
      setcustomerPhone(e.target.value);
    } else if (e.target.name === "customerEmail") {
      setcustomerEmail(e.target.value);
    } else if (e.target.name === "customerAddress") {
      setcustomerAddress(e.target.value);
    }
  };
  const handleSubmitForm = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    //api custumer
    setisBooksLoading(true);
    bookApi
      .addOrder(user, {
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        customerAddress: customerAddress,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // handleLogError(error);
      })
      .finally(() => {});

    //api detail

    bookApi
      .addDetail(user, cart)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // handleLogError(error);
      })
      .finally(() => {
        setisBooksLoading(false);
      });
  };
  return (
    <Segment>
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 850, maxHeight: 800 }}>
          <Form size="large">
            <Segment loading={isBooksLoading}>
              <Form.Input
                fluid
                autoFocus
                name="customerName"
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                onChange={handleOnChange}
              />
              <Form.Input
                fluid
                name="customerPhone"
                icon="phone"
                iconPosition="left"
                placeholder="Numberphone"
                type="number"
                onChange={handleOnChange}
              />
              <Form.Input
                fluid
                name="customerAddress"
                icon="address card"
                iconPosition="left"
                placeholder="Address"
                onChange={handleOnChange}
              />
              <Form.Input
                fluid
                name="customerEmail"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                onChange={handleOnChange}
              />
              <Button
                onClick={handleSubmitForm}
                color="blue"
                fluid
                size="large"
              >
                Gửi
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      {/* asdasdasasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd */}
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 850, maxHeight: 800 }}>
          {cart.map((item) => {
            return (
              <Item.Group>
                <Item key={item.isbn}>
                  <Image
                    src={`http://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`}
                    size="tiny"
                    bordered
                    rounded
                  />
                  <Item.Content>
                    <Item.Header>{item.title}</Item.Header>
                    <Item.Meta>{item.isbn}</Item.Meta>
                    <Item.Meta>Quantity: {item.quantity}</Item.Meta>
                    <Item.Meta>Price: {item.price}VND</Item.Meta>
                  </Item.Content>
                </Item>
              </Item.Group>
            );
          })}
          <div>Price all:{sum}</div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
