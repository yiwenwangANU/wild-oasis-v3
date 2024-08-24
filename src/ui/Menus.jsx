import { createContext, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  width: 100%;
  background: none;
  border: none;
  margin: 0;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledButton = styled.button`
  width: fit-content;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 1.2rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const menusContext = createContext();

function Menus({ children }) {
  const [menuId, setMenuId] = useState("");
  const openRef = useRef();
  const handleOpenMenu = (id) => {
    setMenuId(id);
  };
  const handleCloseMenu = () => {
    setMenuId("");
  };

  return (
    <menusContext.Provider
      value={{
        menuId,
        openRef,
        handleOpenMenu,
        handleCloseMenu,
      }}
    >
      <StyledMenu>{children}</StyledMenu>
    </menusContext.Provider>
  );
}

function MenusOpen({ children, id }) {
  const { openRef, handleOpenMenu } = useContext(menusContext);
  return (
    <StyledButton ref={openRef} onClick={() => handleOpenMenu(id)}>
      {children}
    </StyledButton>
  );
}

function MenusList({ children, id }) {
  const { menuId, openRef, handleCloseMenu } = useContext(menusContext);
  const menusListRef = useRef();
  const [offset] = useState({ top: 20, left: 20 });

  useEffect(() => {
    const handleScroll = () => {
      if (openRef.current && menusListRef.current && menuId === id) {
        const rect = openRef.current.getBoundingClientRect();
        menusListRef.current.style.top = `${rect.top + offset.top}px`;
        menusListRef.current.style.left = `${rect.left + offset.left}px`;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, menuId, offset, openRef]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menusListRef.current && !menusListRef.current.contains(event.target))
        handleCloseMenu(id);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleCloseMenu, id]);

  if (menuId !== id) return;
  else return <StyledList ref={menusListRef}>{children}</StyledList>;
}

function MenusItem({ children }) {
  const { handleCloseMenu, menuId } = useContext(menusContext);
  return (
    <StyledToggle onClick={() => handleCloseMenu(menuId)}>
      {children}
    </StyledToggle>
  );
}

Menus.MenusOpen = MenusOpen;
Menus.MenusList = MenusList;
Menus.MenusItem = MenusItem;

export default Menus;
