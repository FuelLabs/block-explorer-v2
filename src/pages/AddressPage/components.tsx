import styled from "styled-components";
import { ButtonReset } from "../../components/Button/components";
import { CopyIcon, PlusIcon, QRIcon, ArrowIcon } from "../../components/Icons";
import { Link } from "react-router-dom";

export const Container = styled.section``;

export const Content = styled.div`
  padding: 56px 32px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 425px) {
    padding: 40px 24px;
  }
`;

export const HeadlineContainer = styled.div`
  margin: 0 0 52px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media screen and (max-width: 425px) {
    margin: 0 0 40px;
  }
`;

export const HeadlineAddressContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;
`;

export const HeadlineCoinsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (max-width: 1000px) {
    margin: 16px 0 0;
    align-items: flex-start;
  }
`;

export const HeadlineAddressHeader = styled.h2`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  margin: 0;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  white-space: break-spaces;
  color: #f8fefc;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const HeadlineAddress = styled.span`
  display: block;
  margin: 4px 16px 0 0;
  font-family: SFProText;
  font-size: 17px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media screen and (max-width: 560px) {
    font-size: 15px;
    margin: 4px 0 0 0;
  }
`;

export const Tooltip = styled.span`
  padding: 2px 8px;
  display: none;
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #58c09b;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  line-height: 16px;
`;

export const HeadlineAddressButton = styled(ButtonReset)`
  position: relative;
  margin: 0 0 0 12px;
  width: 24px;
  height: 24px;
  justify-content: center;
  background-color: #58c09b;
  border-radius: 12px;
  color: #081c17;
  margin: 8px 16px 0 0;

  :first-of-type {
  }

  :hover {
    box-shadow: 0 0 3px 0 #58c09b;
  }

  :hover ${Tooltip} {
    display: block;
  }
`;

export const CopyButtonIcon = styled(CopyIcon)`
  width: 14px !important;
  height: 14px !important;
`;

export const QRButtonIcon = styled(QRIcon)`
  width: 14px !important;
  height: 14px !important;
`;

export const CoinsCounterLabel = styled.div`
  margin: 0 0 12px;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  border-radius: 13px;
  background-color: #03261e;
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: #f8fefc;
`;

export const CoinsCounter = styled.span`
  margin: 0 0 0 4px;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SFProText;
  font-size: 11px;
  font-weight: 500;
  line-height: 11px;
  color: #021d17;
  background-color: #f8fefc;
  border-radius: 7px;
`;

export const TokenDropdownContainer = styled.div`
  position: relative;
`;

export const TokenButtonSeparator = styled.span`
  width: 1px;
  height: 36px;
  background-color: #808080;
  transition: 0.2s ease-out;
`;

export const TokenButton = styled(ButtonReset)<{ isActive?: boolean }>`
  padding: 0;
  width: 190px;
  height: 36px;
  border-radius: 5px;
  border: solid 1px #808080;
  background-color: #192f2b;
  box-shadow: ${({ isActive }) => (isActive ? "0 0 2px 0 #58c09b" : "none")};

  :hover {
    border: solid 1px #58c09b;
  }

  :hover ${TokenButtonSeparator} {
    background-color: #58c09b;
  }
`;

export const TokenButtonSymbol = styled.span`
  margin: 0 0 0 14px;
  font-family: SFProText;
  font-size: 18px;
  font-weight: normal;
  color: #f8fefc;
`;

export const TokenButtonAmount = styled.span`
  margin: 0 14px 0 0;
  flex: 1 1 0;
  font-family: SFProDisplay;
  font-size: 17px;
  font-weight: 600;
  color: #f8fefc;
  text-align: right;
`;

export const TokenButtonIconContainer = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f9fefc;
`;

export const TokenDropdownIcon = styled(ArrowIcon)`
  transform: rotate(90deg);
  width: 12px !important;
  height: 12px !important;
`;

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

export const TableHeadlineTitle = styled.h3`
  margin: 0 32px 0 0;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 600;
  color: #f8fefc;
`;

export const TableHeadlineDisclaimer = styled.span`
  margin: 4px 0 0;
  font-family: SFProText;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #808080;
  white-space: nowrap;
`;

export const HeadlineHighlighedDisclaimer = styled.span`
  color: #f8fefc;
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

export const TableRow = styled.tr`
  td {
    border-bottom: 1px solid #21302d;
  }

  :last-of-type td {
    border: none;
  }
`;

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

export const TableCell = styled.td`
  vertical-align: top;
  padding: 18px 12px;
  font-family: SFProText;
  font-size: 13px;
  font-weight: normal;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  color: #f8fefc;
`;

const BaseLink = styled(Link)`
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #58c09b;
  transition: 0.2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`;

export const TxHash = styled(BaseLink)`
  display: block;
  max-width: 124px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const InputsAddresses = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputAddressContainer = styled.div`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  color: #f8fefc;
`;

export const InputAddressLink = styled(Link)`
  font-family: SFProText;
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;
  color: #58c09b;
  cursor: pointer;
  transition: 0.2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`;

export const InputsExpandButton = styled(ButtonReset)`
  justify-content: center;
  margin: 0 0 0 40px;
  width: 18px;
  height: 18px;
  background-color: #58c09b;
  border-radius: 9px;
  color: #081c17;

  :hover {
    box-shadow: 0 0 3px 0 #58c09b;
  }
`;

export const ExpandIcon = styled(PlusIcon)<{ rotated?: boolean }>`
  width: 16px !important;
  height: 16px !important;
  transform: ${({ rotated }) => (rotated ? "rotate(45deg)" : "rotate(0deg)")};
  transition: 0.2s ease-out;
`;

export const TxRecipient = styled(BaseLink)`
  display: block;
  margin: 0 0 12px;

  :last-of-type {
    margin: 0;
  }
`;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const TransactionValue = styled.span`
  display: block;
  font-weight: 600;
  margin: 0 0 12px;

  :last-of-type {
    margin: 0;
  }
`;

export const CoinLink = styled(BaseLink)`
  display: block;
  font-weight: 600;
  margin: 0 0 12px;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;

  :last-of-type {
    margin: 0;
  }
`;

export const TableNavigationButtons = styled.div`
  margin: 4px 0 0;
  display: flex;
  font-family: SFProText;
  font-size: 11px;
  line-height: 14px;
  font-weight: normal;
  color: #808080;

  @media screen and (max-width: 560px) {
    margin: 12px 0 0;
  }
`;

export const TableNavigationButton = styled(ButtonReset)<{ isSelected?: boolean }>`
  height: 13px;
  color: ${({ isSelected }) => (isSelected ? "#d1d4d7;" : "#808080")};
  background-color: ${({ isSelected }) => (isSelected ? "#192f2b;" : "rgba(0, 0, 0, 0)")};

  :hover {
    color: #d1d4d7;
  }

  :disabled {
    color: #192f2b;
  }
`;

export const TableNavigationNumbersContainer = styled.div`
  display: flex;
  margin: 0 12px;
`;

export const TableNavigationNumberButton = styled(TableNavigationButton)`
  margin: 0 2px;
  width: 13px;
  justify-content: center;
`;

export const TableNavigationTextButton = styled(TableNavigationButton)`
  line-height: 14px;
  margin: 0 12px;

  @media screen and (max-width: 425px) {
    :first-of-type {
      margin: 0 12px 0 0;
    }

    :last-of-type {
      margin: 0 0 0 12px;
    }
  }
`;

export const TableNextNavigationTextButton = styled(TableNavigationTextButton)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
