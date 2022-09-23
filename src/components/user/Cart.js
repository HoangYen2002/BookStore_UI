import React, { Component } from "react";
import { Image, Item, Container, Icon, Button } from "semantic-ui-react";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      Sum_Price: 0,
    };
  }

  componentDidMount = () => {
    var Sum = this.state.Sum_Price;
    const datacart = localStorage.getItem("cart");
    let mang = JSON.parse(datacart);
    this.setState((pre) => {
      pre.cart = mang;
      return pre;
    });
    for (var i = 0; i < mang.length; i++) {
      Sum += mang[i].price * mang[i].quantity;
      this.setState((pre) => {
        pre.Sum_Price = Sum;
        return pre;
      });
    }
  };
  render() {
    return (
      <Container>
        <h1>My Cart </h1>
        {this.state.cart.map((book) => {
          return (
            <>
              <Item key={book.isbn} className="all_cart">
                <Image
                  className="img_item_cart"
                  src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                  bordered
                  rounded
                />
                <Item.Content>
                  <Item.Header className="Header_item_cart1">
                    {book.title}
                  </Item.Header>
                  <Item.Meta className="Header_item_cart">
                    {book.isbn}
                  </Item.Meta>
                  <Item.Meta className="Header_item_cart">
                    quantity:{book.quantity}
                  </Item.Meta>
                  <Item.Meta className="Header_item_cart">
                    Price:{book.price}
                  </Item.Meta>
                </Item.Content>
                <button className="remove_item_cart">
                  <Icon name="trash alternate"></Icon>
                </button>
              </Item>
            </>
          );
        })}
        <Item className="Header_item_cart">
          Tổng Tiền là:{this.state.Sum_Price}
        </Item>
      </Container>
    );
  }
}

export default Cart;
