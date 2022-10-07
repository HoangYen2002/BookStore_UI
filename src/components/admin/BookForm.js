import React from "react";
import { Button, Form, Icon } from "semantic-ui-react";

function BookForm({
  bookIsbn,
  bookTitle,
  handleInputChange,
  handleAddBook,
  price,
}) {
  const createBtnDisabled =
    bookIsbn.trim() === "" || bookTitle.trim() === "" || price === 0;

  return (
    <Form onSubmit={handleAddBook}>
      <Form.Group>
        <Form.Input
          name="bookIsbn"
          placeholder="ISBN *"
          value={bookIsbn}
          onChange={handleInputChange}
        />
        <Form.Input
          name="bookTitle"
          placeholder="Title *"
          value={bookTitle}
          onChange={handleInputChange}
        />
        <Form.Input
          name="price"
          placeholder="Price *"
          value={price}
          onChange={handleInputChange}
        />
        <Button icon labelPosition="right" disabled={createBtnDisabled}>
          Create
          <Icon name="add" />
        </Button>
      </Form.Group>
    </Form>
  );
}

export default BookForm;
