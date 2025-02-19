"use client";

import { Button, Modal } from "flowbite-react";
import { ReactNode, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useUser } from "../hooks/useUser";

interface Props {
  children: ReactNode;
  label: string;
  handleYes: () => void;
}

export function AlertModal({ children, label, handleYes }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const user = useUser();

  if (!user || user.role == "viewer") return "";

  return (
    <>
      <button className="text-red-500" onClick={() => setOpenModal(true)}>
        {label}
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto size-28 text-gray-400 " />
            <h3 className="mb-5 text-2xl font-bold text-gray-500">
              Advertencia
            </h3>
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              {children}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="w-full"
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  handleYes();
                }}
              >
                Si, seguro
              </Button>
              <Button
                className="w-full"
                color="gray"
                onClick={() => setOpenModal(false)}
              >
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
