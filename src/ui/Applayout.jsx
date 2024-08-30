import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Hearder from "./Header";

const StyledApplayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;
function Applayout() {
  return (
    <StyledApplayout>
      <Sidebar />
      <Hearder />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledApplayout>
  );
}

export default Applayout;
