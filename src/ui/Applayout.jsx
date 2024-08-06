import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Hearder from "./Header";

const StyledApplayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
`;
function Applayout() {
  return (
    <StyledApplayout>
      <Sidebar />
      <StyledContainer>
        <Hearder />
        <StyledMain>
          <Outlet />
        </StyledMain>
      </StyledContainer>
    </StyledApplayout>
  );
}

export default Applayout;
