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
      <button onClick={() => setOpenModal(true)}>{label}</button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {children}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  handleYes();
                }}
              >
                Si, seguro
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
