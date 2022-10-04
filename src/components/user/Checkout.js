import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Segment, Item, Image } from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react";
import { bookApi } from "../misc/BookApi";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [customerPhone, setcustomerPhone] = useState();
  const [customerAddress, setcustomerAddress] = useState();
  const [sum, setSum] = useState();
  const [orderDetail, setorderDetail] = useState([]);
  const [isBooksLoading, setisBooksLoading] = useState(false);
  const [nameuser, setnameuser] = useState("");
  const [emailuser, setemailuser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const datacart = localStorage.getItem("cart");
    handletotalQuantity();
    setnameuser(user.name);
    console.log(user);
    setemailuser(user.email);
    let mang = JSON.parse(datacart);
    setCart(mang);
    handleSum(mang);
    setOrderDetaill(mang);
  }, []);

  const handletotalQuantity = () => {};
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
    if (e.target.name === "customerPhone") {
      setcustomerPhone(e.target.value);
    } else if (e.target.name === "customerAddress") {
      setcustomerAddress(e.target.value);
    }
  };

  const saveLocalstorate = (arr_cart) => {
    let data_save = JSON.stringify(arr_cart);
    localStorage.setItem("cart", data_save);
  };

  const handleSubmitForm = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    let allQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
      allQuantity += cart[i].quantity;
    }
    console.log(cart);
    handletotalQuantity();
    let mycart = {
      totalAmount: sum,
      totalQuantity: allQuantity,
      username: nameuser,
      books: cart,
      phone: customerPhone,
      address: customerAddress,
      email: emailuser,
    };

    //api custumer
    setisBooksLoading(true);

    //api detail
    bookApi
      .addDetail(user, mycart)
      .then((response) => {
        alert("Complete Request");
        setCart([]);
        saveLocalstorate([]);
        setSum(0);
      })
      .catch((error) => {
        //   handleLogError(error);
      })
      .finally(() => {
        setisBooksLoading(false);
        return <Redirect to="/" />;
      });
  };
  return (
    <Segment>
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 850, maxHeight: 800 }}>
          <Form size="large">
            <Segment loading={isBooksLoading}>
              <Form.Input
                readOnly
                fluid
                block
                autoFocus
                name="customerName"
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                value={nameuser}
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
                readOnly
                name="customerEmail"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                value={emailuser}
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
