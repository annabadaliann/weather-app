import ReactDOM from "react-dom";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          X
        </button>
        {children}
      </div>
      <div style={backdropStyles} onClick={onClose}></div>
    </div>,
    document.getElementById("modal-root")
  );
};

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  zIndex: 1001,
  position: "relative",
};

const backdropStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
};

const closeButtonStyles = {
  background: "transparent",
  border: "none",
  position: "absolute",
  top: "2px",
  right: "2px",
  cursor: "pointer",
};

export default ModalWrapper;
