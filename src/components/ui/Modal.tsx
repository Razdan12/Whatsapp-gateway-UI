import React from "react";
import type { FC } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Props {
  id: string;
  children: React.ReactNode;
  width?: string;
  onClose?: () => void;
}

const openModal = (id: string, fun?: () => void) => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
    fun?.();
  }
};

const closeModal = (id: string, fun?: () => void) => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal) {
    modal.close();
    fun?.();
  }
};

const Modal: FC<Props> = ({ id, children, width, onClose = () => {} }) => {
  return (
    <div>
      <dialog id={id} onClose={onClose} className="modal modal-middle">
        <div className={`modal-box  ${width} `}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost absolute right-0 top-0 text-2xl">
              <IoCloseCircleOutline/>
            </button>
          </form>
          <div className="pt-5">{children}</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export { closeModal, openModal };
export default Modal;
