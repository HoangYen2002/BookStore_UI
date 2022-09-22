import React, { Component } from "react";
import { Image, Item, Container } from "semantic-ui-react";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }
  componentDidMount = () => {
    const datacart = localStorage.getItem("cart");
    let mang = JSON.parse(datacart);
    this.setState((pre) => {
      pre.cart = mang;
      return pre;
    });
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
                  <Item.Header className="Header_item_cart">
                    {book.title}
                  </Item.Header>
                  <Item.Meta className="Header_item_cart">
                    {book.isbn}
                  </Item.Meta>
                  <Item.Meta className="Header_item_cart">
                    quantity:{book.quantity}
                  </Item.Meta>
                </Item.Content>
              </Item>
            </>
          );
        })}
      </Container>
    );
  }
}

export default Cart;
