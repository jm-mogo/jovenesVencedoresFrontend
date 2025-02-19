import { Modal } from "flowbite-react";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

export default function EditModal({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const [openModal, setOpenModal] = useState(false);

  const user = useUser();

  if (!user || user.role == "viewer") return "";

  return (
    <>
      <button className="text-blue-500" onClick={() => setOpenModal(true)}>
        {label}
      </button>
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
