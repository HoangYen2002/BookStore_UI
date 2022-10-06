import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Icon } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext"; //chỗ này import từ export phương thức useAuth() của AuthContext -->chạy vào useAuth()
import { useSelector } from "react-redux";

//thứ tự các phương thức sẽ luôn được gọi trong 1 class component hoặc function component -->Constuctor > render/return > componentDidMount
function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth();
  const [top, settop] = useState("block");
  const [height, setheight] = useState(50);

  const quantityCarttt = useSelector((state) => state.quantityCartt + 1);

  const logout = () => {
    userLogout(); //nếu chạy dòng này nó sẽ gọi qua phương thức userLogout() của AuthContext
  };

  const CartStyle = () => {
    const user = getUser();
    return user && user.role === "ADMIN"
      ? { display: "none" }
      : { display: "block" };
  };
  useEffect(() => {
    window.addEventListener("scroll", isMouseDown);
  }, []);
  const isMouseDown = () => {
    const scrollWindowHeight = window.pageYOffset;
    // console.log(scrollWindowHeight);
    if (scrollWindowHeight >= 10) {
      settop("fixed");
      setheight(30);
    } else {
      settop("relative");
      setheight(50);
    }
  };
  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { display: "none" } : { display: "block" };
  };

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { display: "block" } : { display: "none" };
  };

  const adminPageStyle = () => {
    const user = getUser();
    return user && user.role === "ADMIN"
      ? { display: "block" }
      : { display: "none" };
  };

  const userPageStyle = () => {
    const user = getUser();
    return user && user.role === "USER"
      ? { display: "block" }
      : { display: "none" };
  };

  const getUserName = () => {
    const user = getUser();
    return user ? user.name : "";
  };

  //render/return sẽ luôn được chạy sau Constructor -->tất cả các phương thức trong return sẽ được chạy
  //trong render/return muốn hiển thị giá trị hoặc gọi bất kỳ phương thức nào thì dùng dấu {}
  return (
    <Menu
      inverted
      className="navbar"
      stackable
      size="massive"
      style={{ borderRadius: 0, position: top, height: height + "px" }}
    >
      <Container>
        <Menu.Item header>Book-UI</Menu.Item>
        <Menu.Item className="item_nav" as={Link} exact="true" to="/">
          Home
        </Menu.Item>
        <Menu.Item
          className="item_nav"
          as={Link}
          to="/adminpage"
          style={adminPageStyle()}
        >
          AdminPage
        </Menu.Item>
        <Menu.Item
          className="item_nav"
          as={Link}
          to="/userpage"
          style={userPageStyle()}
        >
          UserPage
        </Menu.Item>
        <Menu.Item
          className="item_nav"
          as={Link}
          to="/detail"
          style={adminPageStyle()}
        >
          Order
        </Menu.Item>

        <Menu.Item
          className="item_nav"
          as={Link}
          to="/orderuser"
          style={userPageStyle()}
        >
          Order
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            className="item_nav"
            as={Link}
            to="/login"
            style={enterMenuStyle()}
          >
            Login
          </Menu.Item>
          <Menu.Item
            className="item_nav"
            as={Link}
            to="/signup"
            style={enterMenuStyle()}
          >
            Sign Up
          </Menu.Item>
          <Menu.Item
            header
            style={logoutMenuStyle()}
          >{`Hi ${getUserName()}`}</Menu.Item>
          <Menu.Item
            className="item_nav"
            as={Link}
            to="/"
            style={logoutMenuStyle()}
            onClick={logout}
          >
            Logout
          </Menu.Item>
          <Menu.Item
            className="item_nav"
            as={Link}
            to="/cart"
            style={CartStyle()}
          >
            <Icon name="shopping cart" size="small">
              <label className="quantityCart">
                {quantityCarttt ? quantityCarttt : 0}
              </label>
            </Icon>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;
