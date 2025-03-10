"use client";

import { Drawer, Navbar } from "flowbite-react";
import { useState } from "react";
import { SidebarComponent } from "./Sidebar";

export function DrawerSide() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
          <Navbar.Toggle />
          {/* <HiMenu className="text-4xl" /> */}
        </button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <SidebarComponent handleClose={handleClose} />
        </Drawer.Items>
      </Drawer>
    </>
  );
}
