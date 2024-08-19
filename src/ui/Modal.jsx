import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const modalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  return (
    <modalContext.Provider
      value={{ isOpen, handleCloseModal, handleOpenModal }}
    >
      {children}
    </modalContext.Provider>
  );
}

const Open = ({ children }) => {
  const { handleOpenModal } = useContext(modalContext);
  return <div onClick={() => handleOpenModal()}>{children}</div>;
};

const Window = ({ children }) => {
  const { isOpen, handleCloseModal } = useContext(modalContext);

  const modalref = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalref.current && !modalref.current.contains(event.target))
        handleCloseModal();
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleCloseModal]);

  if (!isOpen) return;
  else
    return (
      <Overlay>
        <StyledModal ref={modalref}>
          <CloseButton onClick={() => handleCloseModal()}>
            <HiX />
          </CloseButton>
          {children}
        </StyledModal>
      </Overlay>
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
export { modalContext };
