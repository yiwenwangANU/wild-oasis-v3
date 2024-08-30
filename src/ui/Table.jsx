import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  transition: none;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const tableContext = createContext();

function Table({ children, $columns, data, render }) {
  return (
    <tableContext.Provider value={{ $columns, data, render }}>
      <StyledTable>{children}</StyledTable>
    </tableContext.Provider>
  );
}

function TableHeader({ children }) {
  const { $columns } = useContext(tableContext);
  return <StyledHeader $columns={$columns}>{children}</StyledHeader>;
}

function TableBody() {
  const { data, render } = useContext(tableContext);

  return data.map(render);
}

function TableRow({ children }) {
  const { $columns } = useContext(tableContext);
  return <StyledRow $columns={$columns}>{children}</StyledRow>;
}

Table.TableHeader = TableHeader;
Table.TableBody = TableBody;
Table.TableRow = TableRow;

export default Table;
