"use client";

import { Drawer } from "flowbite-react";
import { useState } from "react";
import { SidebarComponent } from "./Sidebar";
import { HiMenu } from "react-icons/hi";

export function DrawerSide() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
          <HiMenu className="text-4xl" />
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
