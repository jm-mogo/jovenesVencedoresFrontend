import React from "react";
import { Navbar } from "flowbite-react";
import { DrawerSide } from "./Drawer";
import { Link } from "react-router-dom";

const NavMenu: React.FC = () => {
  return (
    <Navbar className="bg-gray-900 text-white">
      <Navbar.Brand>
        <Link to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Jovenes Vencedores
          </span>
        </Link>
      </Navbar.Brand>

      <div className="block md:hidden">
        <DrawerSide />
      </div>
    </Navbar>
  );
};

export default NavMenu;
