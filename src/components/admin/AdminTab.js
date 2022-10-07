import React from "react";
import { Tab } from "semantic-ui-react";
import UserTable from "./UserTable";
import BookTable from "./BookTable";

function AdminTab(props) {
  const { handleInputChange } = props;
  const {
    isUsersLoading,
    users,
    userUsernameSearch,
    handleDeleteUser,
    handleSearchUser,
    handleSetDataUpForm,
  } = props;
  const {
    isBooksLoading,
    books,
    bookIsbn,
    bookTitle,
    price,
    bookTextSearch,
    handleAddBook,
    handleDeleteBook,
    handleSearchBook,
    handleClear,
  } = props;

  const panes = [
    {
      menuItem: { key: "users", icon: "users", content: "Users" },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "books", icon: "book", content: "Books" },
      render: () => (
        <Tab.Pane loading={isBooksLoading}>
          <BookTable
            handleSetDataUpForm={handleSetDataUpForm}
            handleClear={handleClear}
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            price={price}
            bookTextSearch={bookTextSearch}
            handleInputChange={handleInputChange}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleSearchBook={handleSearchBook}
          />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab menu={{ attached: "top" }} panes={panes} />;
}

export default AdminTab;
