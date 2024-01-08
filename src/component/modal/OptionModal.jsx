const OptionModal = ({
  handleOptionModal,
  colorList,
  handleFolderColor,
  handleAlertModal,
  color,
}) => {
  return (
    <div className="option_modal">
      <div className="option_modal-content">
        <div className="color_option">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "94%",
            }}
          >
            <p style={{ paddingLeft: "10px" }}> Change Color</p>
            <p
              style={{
                color: "#969696",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={handleOptionModal}
            >
              X
            </p>
          </div>
          <div>
            <p style={{ fontSize: "10px", color: "gray" }}>Pick color</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {colorList.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    margin: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleFolderColor(color)}
                ></div>
              ))}
            </div>
          </div>
          {/* <input
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              background: `linear-gradient(to right, #fff, ${color})`,
            }}
            type="color"
            value={""}
            onChange={""}
          /> */}
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "gray",
          }}
        ></div>
        <div>
          <p
            style={{
              fontSize: "14px",
              height: "35px",
              width: "200px",
              borderRadius: "5px",
              backgroundColor: "#f0dcdc",
              paddingTop: "12px",
              cursor: "pointer",
            }}
            onClick={handleAlertModal}
          >
            Move to trash
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptionModal;
