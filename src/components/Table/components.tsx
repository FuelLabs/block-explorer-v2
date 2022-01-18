import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #808080;
  border-radius: 8px;
`;

export const TableHeadlineContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 8px 16px 16px;

  @media screen and (max-width: 768px) {
    padding: 8px 12px 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TableCounterText = styled.span`
  margin: 4px 0 0;
  font-family: SFProText;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #808080;
  white-space: nowrap;
`;

export const TableHeadlineTitle = styled.h3`
  margin: 0 32px 0 0;
  font-family: SFProText;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: #f8fefc;
`;

export const TableHeadlinerContentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0;

  @media screen and (max-width: 768px) {
    align-self: stretch;
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeadRow = styled.tr``;

export const TableHeadCell = styled.th`
  padding: 20px 12px;
  background-color: #03261e;
  font-family: SFProText;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  text-align: left;
  color: #f8fefc;
`;

export const TableRow = styled.tr`
  td {
    border-bottom: 1px solid #21302d;
  }

  :last-of-type td {
    border: none;
  }
`;

export const TableCell = styled.td<{ bold?: boolean }>`
  vertical-align: top;
  padding: 18px 12px;
  font-family: SFProText;
  font-size: 13px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  color: #f8fefc;
`;
