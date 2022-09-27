import React from "react";
import { Button, Form, Grid, Segment, Item, Image } from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const datacart = localStorage.getItem("cart");
    let mang = JSON.parse(datacart);
    setCart(mang);
  }, []);
  return (
    <div>
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 850, maxHeight: 800 }}>
          <Form size="large">
            <Segment>
              <Form.Input
                fluid
                autoFocus
                name="name"
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
              />
              <Form.Input
                fluid
                name="phone"
                icon="phone"
                iconPosition="left"
                placeholder="Numberphone"
                type="number"
              />
              <Form.Input
                fluid
                name="address"
                icon="address card"
                iconPosition="left"
                placeholder="Address"
              />
              <Form.Input
                fluid
                name="email"
                icon="at"
                iconPosition="left"
                placeholder="Email"
              />
              <Button color="blue" fluid size="large">
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
        </Grid.Column>
      </Grid>
    </div>
  );
}
