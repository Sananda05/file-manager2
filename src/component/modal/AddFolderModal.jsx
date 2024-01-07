const AddFolderModal = ({
  isOpen,
  handleAddNewFolder,
  folderNameRef,
  errorMessage,
  handleModalOpener,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewFolder(e);
    }
  };
  return (
    <div className="modal_container">
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <form onSubmit={handleAddNewFolder}>
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
