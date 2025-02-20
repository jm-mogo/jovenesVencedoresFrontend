import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { DrawerSide } from "./Drawer";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import { useUser } from "../hooks/useUser";

const NavMenu: React.FC = () => {
  const user = useUser();

  return (
    <Navbar className="bg-gray-900 text-white">
      <Navbar.Brand>
        <Link to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Jovenes Vencedores
          </span>
        </Link>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" rounded />}
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">
              {user?.username}
            </span>
          </Dropdown.Header>
          <Link to={"/myaccount"}>
            <Dropdown.Item>Cuenta</Dropdown.Item>
          </Link>
          <Dropdown.Divider />

          <Dropdown.Item>
            <LogoutButton />
          </Dropdown.Item>
        </Dropdown>
        <div className="block md:hidden">
          <DrawerSide />
        </div>
      </div>
    </Navbar>
  );
};

export default NavMenu;
