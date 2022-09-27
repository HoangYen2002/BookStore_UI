import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import BookList from "./BookList";
import AuthContext from "../context/AuthContext";
import { bookApi } from "../misc/BookApi";

export default class UserPage extends Component {
  static contextType = AuthContext;

  state = {
    cart: [],
    books: [],
    bookTextSearch: "",
    isUser: true,
    isBooksLoading: false,
    quantityCart: 0,
  };

  componentDidMount() {
    let data_string_manggiohang = localStorage.getItem("cart");

    if (
      data_string_manggiohang &&
      data_string_manggiohang !== "undefined" &&
      data_string_manggiohang !== "null"
    ) {
      let mang = JSON.parse(data_string_manggiohang);
      this.setState((pre) => {
        pre.cart = mang;
        return pre;
      });
    }

    const Auth = this.context;
    const user = Auth.getUser();
    const isUser = user.role === "USER";
    this.setState({ isUser });

    this.handleGetBooks();
  }

  saveLocalstorate = (arr_cart) => {
    let data_save = JSON.stringify(arr_cart);
    localStorage.setItem("cart", data_save);
  };

  handleAllItemCart(mang) {
    var tong = 0;

    for (var i = 0; i < mang.length; i++) {
      tong += mang[i].quantity;
    }
    console.log("tongg" + tong);

    this.setState({ quantityCart: tong }, () =>
      console.log("tongg" + this.state.quantityCart)
    );
  }

  handleAddToCard = (item) => {
    let mang = this.state.cart;
    if (mang) {
      let flag = 0;
      for (var i = 0; i < mang.length; i++) {
        if (mang[i].isbn === item.isbn) {
          mang[i].quantity += 1;
          flag = 1;
        }
      }
      if (flag === 0) {
        item.quantity = 1;
        mang.push(item);
      }
    } else {
      item.quantity = 1;
      mang.push(item);
    }
    this.setState((prevState) => {
      prevState.cart = mang;
      return prevState;
    });

    this.saveLocalstorate(mang);
    this.handleAllItemCart(mang);
    console.log("tongggg" + this.state.quantityCart);
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleGetBooks = () => {
    const Auth = this.context;
    const user = Auth.getUser();

    this.setState({ isBooksLoading: true });
    bookApi
      .getBooks(user)
      .then((response) => {
        this.setState({ books: response.data });
      })
      .catch((error) => {
        // handleLogError(error);
      })
      .finally(() => {
        this.setState({ isBooksLoading: false });
      });
  };

  handleSearchBook = () => {
    const Auth = this.context;
    const user = Auth.getUser();

    const text = this.state.bookTextSearch;
    bookApi
      .getBooks(user, text)
      .then((response) => {
        const books = response.data;
        this.setState({ books });
      })
      .catch((error) => {
        //  handleLogError(error);
        this.setState({ books: [] });
      });
  };

  render() {
    if (!this.state.isUser) {
      return <Redirect to="/" />;
    } else {
      const { isBooksLoading, books, bookTextSearch } = this.state;
      return (
        <Container>
          <BookList
            quantityCartt={this.state.quantityCart}
            handleAddToCard={this.handleAddToCard}
            cart={this.state.cart}
            isBooksLoading={isBooksLoading}
            bookTextSearch={bookTextSearch}
            books={books}
            handleInputChange={this.handleInputChange}
            handleSearchBook={this.handleSearchBook}
          />
        </Container>
      );
    }
  }
}
