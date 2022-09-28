import React, { Component } from "react";
import { Item, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      Sum_Price: 0,
      quantityCart: 0,
    };
  }
  saveLocalstorate = (arr_cart) => {
    let data_save = JSON.stringify(arr_cart);
    localStorage.setItem("cart", data_save);
  };
  handleRemoveItemCart = (item) => {
    let mang = this.state.cart;

    for (var i = 0; i < mang.length; i++) {
      if (mang[i].isbn === item.isbn) {
        mang.splice(i, 1);
      }
    }
    this.setState((prevState) => {
      prevState.cart = mang;
      prevState.quantityCart = mang.quantity;
      return prevState;
    });
    this.handleSum(mang);
    this.saveLocalstorate(mang);
  };

  handleTangSoLuong = (item) => {
    let mang = this.state.cart;
    for (var i = 0; i < mang.length; i++) {
      if (mang[i].isbn === item.isbn) {
        if (mang[i].quantity > 1) {
          mang[i].quantity += 1;
        } else {
        }
      }
    }
    this.setState((prevState) => {
      prevState.cart = mang;
      prevState.quantityCart = this.state.quantityCart + 1;
      return prevState;
    });
    this.saveLocalstorate(mang);
    this.handleSum(mang);
  };
  handlegiamSoLuong = (item) => {
    let mang = this.state.cart;
    for (var i = 0; i < mang.length; i++) {
      if (mang[i].isbn === item.isbn) {
        if (mang[i].quantity > 1) {
          mang[i].quantity -= 1;
        } else {
          this.handleRemoveItemCart(item);
          this.setState((prevState) => {
            prevState.quantityCart = this.state.quantityCart;
            return prevState;
          });
        }
      }
    }
    this.setState((prevState) => {
      prevState.cart = mang;
      prevState.quantityCart = this.state.quantityCart - 1;
      return prevState;
    });
    this.saveLocalstorate(mang);
    this.handleSum(mang);
  };

  handleSum = (mang) => {
    var Sum = 0;
    for (var i = 0; i < mang.length; i++) {
      Sum += mang[i].price * mang[i].quantity;
    }
    this.setState((pre) => {
      pre.Sum_Price = Sum;
      return pre;
    });
  };
  handleQuantityCart = (mang) => {
    var quantitycartt = this.state.quantityCart;
    for (var i = 0; i < mang.length; i++) {
      quantitycartt += mang[i].quantity;
    }

    this.setState({ quantityCart: quantitycartt }, () =>
      this.setState({ quantityCart: this.state.quantityCart })
    );
  };
  componentDidMount = () => {
    const datacart = localStorage.getItem("cart");
    let mang = JSON.parse(datacart);

    this.setState((pre) => {
      pre.cart = mang;
      return pre;
    });
    this.handleQuantityCart(mang);
    this.handleSum(mang);
  };
  render() {
    return (
      <>
        {this.state.Sum_Price === 0 ? (
          <Container>
            <div className="Cart_emty">
              <div>
                <img
                  src="https://www.novelty.com.vn/assets/empty_cart.jpeg"
                  alt=""
                />
              </div>
              <div>
                <Link className="link_icon_cart" to={"/userpage"}>
                  <button className="button_quay_lai">Tiếp Tục Mua Hàng</button>
                </Link>
              </div>
            </div>
          </Container>
        ) : (
          <Container>
            <h1>My Cart {this.state.quantityCart} </h1>
            {this.state.cart.map((book) => {
              return (
                <>
                  {this.state.cart.length === 0 ? (
                    <div key={book.isbn}>haha</div>
                  ) : (
                    <ItemCart
                      handleTangSoLuong={this.handleTangSoLuong}
                      handlegiamSoLuong={this.handlegiamSoLuong}
                      key={book.isbn}
                      handleRemoveItemCart={this.handleRemoveItemCart}
                      book={book}
                    ></ItemCart>
                  )}
                </>
              );
            })}
            <Item className="Header_item_cart">
              Tổng Tiền là:{this.state.Sum_Price}
            </Item>

            <Item className="Header_item_cart">
              <Button href="/checkout">mua</Button>
            </Item>
          </Container>
        )}
      </>
    );
  }
}

export default Cart;
