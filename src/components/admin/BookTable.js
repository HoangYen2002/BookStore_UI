import React from "react";
import {
  Button,
  Form,
  Grid,
  Image,
  Input,
  Table,
  Icon,
} from "semantic-ui-react";
import BookForm from "./BookForm";

function BookTable({
  handleSetDataUpForm,
  price,
  books,
  bookIsbn,
  bookTitle,
  bookTextSearch,
  handleInputChange,
  handleAddBook,
  handleSearchBook,
  handleClear,
}) {
  let bookList;
  if (books.length === 0) {
    bookList = (
      <Table.Row key="no-book">
        <Table.Cell collapsing textAlign="center" colSpan="4">
          No book
        </Table.Cell>
      </Table.Row>
    );
  } else {
    bookList = books.map((book) => {
      const processhandleSetDataUpForm = () => {
        handleSetDataUpForm(book);
      };
      return (
        <Table.Row key={book.isbn} onClick={processhandleSetDataUpForm}>
          <Table.Cell>
            <Image
              src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              size="tiny"
              bordered
              rounded
            />
          </Table.Cell>
          <Table.Cell>{book.isbn}</Table.Cell>
          <Table.Cell>{book.title}</Table.Cell>
          <Table.Cell>{book.price}</Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns="2">
          <Grid.Column width="5">
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: "search" }}
                name="bookTextSearch"
                placeholder="Search by ISBN or Title"
                value={bookTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column width="4">
            <BookForm
              price={price}
              bookIsbn={bookIsbn}
              bookTitle={bookTitle}
              handleInputChange={handleInputChange}
              handleAddBook={handleAddBook}
            />
            <Button icon labelPosition="right" onClick={handleClear}>
              Clear
              <Icon name="x" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Cover</Table.HeaderCell>
            <Table.HeaderCell width={4}>ISBN</Table.HeaderCell>
            <Table.HeaderCell width={6}>Title</Table.HeaderCell>
            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{bookList}</Table.Body>
      </Table>
    </>
  );
}

export default BookTable;
