import { computeHeadingLevel } from "@testing-library/react";
import { useRef, useEffect } from "react";

const AddFolderModal = ({
  isOpen,
  handleAddNewFolder,
  folderNameRef,
  errorMessage,
  handleModalOpener,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // Clicked outside the modal, close it
        handleModalOpener();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleModalOpener]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewFolder();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNewFolder();
  };
  return (
    <div className="modal_container" ref={modalRef}>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Folder Name"
              id="folder_name"
              name="name"
              ref={folderNameRef}
              onKeyDown={handleKeyDown}
            />
            {errorMessage && (
              <p
                style={{
                  color: "red",
                  fontSize: "11px",
                  display: "hidden",
                }}
              >
                {errorMessage}
              </p>
            )}
            <div className="modal_button_group">
              <button className="cancel_btn" onClick={handleModalOpener}>
                cancel
              </button>
              <button className="create_btn" type="submit">
                create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFolderModal;
