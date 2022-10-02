import React from "react";
import { Image, Item, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { quantityCart } from "../reducers/action";
import { useSelector } from "react-redux";
function ItemCart({
  book,
  handleRemoveItemCart,
  handlegiamSoLuong,
  handleTangSoLuong,
}) {
  const processRemoveItemCart = () => {
    handleRemoveItemCart(book);
    dispatchh();
  };

  const dispatch = useDispatch();
  const quantityCarttt = useSelector((state) => state.quantityCartt);
  // console.log(quantityCarttt);

  const processhandlegiamSoLuong = () => {
    handlegiamSoLuong(book);
  };

  const processhandleTangSoLuong = () => {
    handleTangSoLuong(book);
  };
  const dispatchh = () => {
    dispatch(
      quantityCart({
        quantityCarttt,
      })
    );
  };
  return (
    <Item key={book.isbn} className="all_cart">
      <Image
        className="img_item_cart"
        src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
        bordered
        rounded
      />
      <Item.Content>
        <Item.Header className="Header_item_cart1">{book.title}</Item.Header>
        <Item.Meta className="Header_item_cart">{book.isbn}</Item.Meta>
        <Item.Meta className="Header_item_cart">
          <button onClick={processhandlegiamSoLuong}>-</button>
          quantity:{book.quantity}
          <button onClick={processhandleTangSoLuong}>+</button>
        </Item.Meta>
        <Item.Meta className="Header_item_cart">Price:{book.price}</Item.Meta>
        <Item.Meta className="Header_item_cart">Amount:{book.amount}</Item.Meta>
      </Item.Content>
      <button onClick={processRemoveItemCart} className="remove_item_cart">
        <Icon name="trash alternate"></Icon>
      </button>
    </Item>
  );
}

export default ItemCart;
