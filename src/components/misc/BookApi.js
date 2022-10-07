import axios from "axios";
import { config } from "../../Constants";

export const bookApi = {
  authenticate,
  signup,
  numberOfUsers,
  numberOfBooks,
  getUsers,
  deleteUser,
  getBooks,
  deleteBook,
  addBook,
  addDetail,
  getDetail,
  getOrderDetail,
  getOrderUser,
};

function authenticate(username, password) {
  return instance.post(
    "/auth/authenticate",
    { username, password },
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

function signup(user) {
  return instance.post("/auth/signup", user, {
    headers: { "Content-type": "application/json" },
  });
}

function numberOfUsers() {
  return instance.get("/public/numberOfUsers");
}

function numberOfBooks() {
  return instance.get("/public/numberOfBooks");
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : "/api/users";
  return instance.get(url, {
    headers: { Authorization: basicAuth(user) },
  });
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { Authorization: basicAuth(user) },
  });
}

function getBooks(user, text) {
  const url = text ? `/api/books?text=${text}` : "/api/books";
  return instance.get(url, {
    headers: { Authorization: basicAuth(user) },
  });
}

function deleteBook(user, isbn) {
  return instance.delete(`/api/books/${isbn}`, {
    headers: { Authorization: basicAuth(user) },
  });
}

function addBook(user, book) {
  return instance.post("/api/books", book, {
    headers: {
      "Content-type": "application/json",
      Authorization: basicAuth(user),
    },
  });
}

function addDetail(user, detail) {
  console.log(detail);
  return instance.post("/api/order/checkout", detail, {
    headers: {
      "Content-type": "application/json",
      Authorization: basicAuth(user),
    },
  });
}

function getDetail(user) {
  return instance.get("/api/orders", {
    headers: {
      "Content-type": "application/json",
      Authorization: basicAuth(user),
    },
  });
}

function getOrderDetail(user, id) {
  return instance.get(`/api/orders/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: basicAuth(user),
    },
  });
}
function getOrderUser(user, text) {
  return instance.get(`/api/orders?text=${text}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: basicAuth(user),
    },
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

// -- Helper functions

function basicAuth(user) {
  return `Basic ${user.authdata}`;
}
