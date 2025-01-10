import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function NewModal({ children, label }: any) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>{label}</Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
