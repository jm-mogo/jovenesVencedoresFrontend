import { Modal } from "flowbite-react";
import { useState } from "react";

export default function EditModal({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setOpenModal(true)}>{label}</button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        onSubmit={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
