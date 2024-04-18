import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function CustomModal({
  modalId,
  classColor,
  className,
  children,
}) {
  let [modalBoxClass, setModalBoxClass] = useState<string>(
    "modal-box modal-box-crud !w-11/12 !max-w-5xl"
  );
  useEffect(() => {
    if (classColor === undefined) return;
    setModalBoxClass(
      "modal-box modal-box-crud !w-11/12 !max-w-5xl " + classColor
    );
  }, [classColor]);
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label
        htmlFor={modalId}
        className={"modal modal-crud cursor-pointer " + (className ?? "")}
      >
        <label className={modalBoxClass} htmlFor="">
          <label
            htmlFor={modalId}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <XMarkIcon className="w-6" />
          </label>
          {children}
        </label>
      </label>
    </>
  );
}

export default CustomModal;
