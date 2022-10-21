import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonReset } from '../../components/Button/components';
import { ArrowIcon, FileIcon } from '../../components/Icons';
import { StandardSurface } from '../../components/Surface/components';

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

export const Title = styled.h2`
  display: flex;
  align-items: baseline;
  margin: 0 0 40px;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  color: #f8fefc;
  white-space: break-spaces;

  span:first-of-type {
    width: 160px;
  }

  @media screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

export const TitleTransaction = styled.span`
  width: calc(100% - 160px);
  font-family: SFProText;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media screen and (max-width: 425px) {
    margin: 8px 0 0;
    width: 100%;
  }
`;

export const TransactionDataContainer = styled.div`
  margin: 0 0 36px;
  padding: 16px 32px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px #808080;
  border-radius: 8px;

  @media screen and (max-width: 425px) {
    padding: 12px 24px;
  }
`;

export const TransactionDataRow = styled.div`
  padding: 12px 0;
  display: flex;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    padding: 8px 0;
  }
`;

export const RowKeyColumn = styled.div`
  width: 280px;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;

  @media screen and (max-width: 768px) {
    width: 220px;
  }

  @media screen and (max-width: 500px) {
    margin: 0 0 4px;
    width: 100%;
  }
`;

export const RowValueColumn = styled.div`
  width: calc(100% - 280px);
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #f8fefc;

  @media screen and (max-width: 768px) {
    width: calc(100% - 220px);
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const WrapText = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RowValueLink = styled(Link)`
  display: block;
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  color: #58c09b;
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

export const TransactionStatus = styled.span`
  padding: 0 12px;
  border-radius: 10px;
  background-color: #58c09b;
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: #021d17;
`;

export const BaseLink = styled(Link)`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
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

export const UTXOContainer = styled.div``;

export const DetailsButtonContainer = styled.div`
  margin: 0 0 36px;
  display: flex;
  justify-content: flex-end;
`;

export const DetailsButton = styled(ButtonReset)<{ isActive?: boolean }>`
  padding: 8px 16px;
  border-radius: 1px;
  border: solid 1px #57c09b;
  background-color: ${({ isActive }) => (isActive ? '#1e2e2b' : '#081C17')};
  font-family: SFProDisplay;
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  color: #57c09b;

  :hover {
    background-color: #1e2e2b;
  }

  :active {
    background-color: #294842;
  }

  svg {
    width: 12px !important;
    height: 12px !important;
    margin: 0 0 0 6px;
  }
`;

export const UTXOBoxesContainer = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const UTXOBoxesColumn = styled.div`
  max-width: calc((100% - 98px) / 2);

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;
export const UTXOSeparatorColumn = styled.div`
  margin: 0 34px;

  @media screen and (max-width: 768px) {
    margin: 4px auto 24px;
  }
`;
export const UTXOBoxContainer = styled(StandardSurface)`
  margin: 0 0 24px;
  border: solid 3px #03261e;
`;

export const UTXOHeadlineContainer = styled.div`
  padding: 16px 16px 16px 24px;
  display: flex;
  justify-content: space-between;
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #f8fefc;
  background-color: #03261e;
`;

export const UTXOHeadlineColumn = styled.div`
  width: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const UTXOHeadlineColumn2 = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const UTXOTitle = styled.span`
  margin: 0 0 6px;
  display: block;
  font-weight: 600;
`;

export const UTXOHash = styled(BaseLink)`
  display: block;
  font-size: 13px;
  line-height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const HeadlineText = styled.span`
  display: block;
`;

export const UTXODetailsContainer = styled.div`
  padding: 32px 16px 24px 40px;

  @media screen and (max-width: 425px) {
    padding: 24px 16px 24px 24px;
  }
`;

export const UTXODetailsRow = styled.div`
  display: flex;
  margin: 0 0 16px;
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #f8fefc;

  :last-of-type {
    margin: 0;
  }
`;

export const UTXODetailsKey = styled.span`
  flex: 0 0 140px;

  @media screen and (max-width: 425px) {
    flex: 0 0 120px;
  }
`;

export const UTXODetailsValue = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const UTXODetailsLink = styled(Link)`
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  color: #58c09b;
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

export const UTXOSeparatorArrow = styled(ArrowIcon)`
  margin: 24px 0 0;
  width: 26px !important;
  height: 26px !important;
  color: #58c09b;

  @media screen and (max-width: 768px) {
    margin: 0;
    transform: rotate(90deg);
  }
`;

export const ScriptsContainer = styled.div`
  margin: 12px 0 0;
`;

export const ScriptTitle = styled.span`
  display: block;
  margin: 0 0 28px;
  font-family: SFProText;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
  color: #f8fefc;
`;

export const ScriptContainer = styled.div`
  margin: 0 0 36px;
  max-width: 442px;
  border: solid 1px #1e2e2b;
`;

export const ScriptTabsContainer = styled.div`
  display: flex;
`;

export const ScriptTabButton = styled(ButtonReset)<{ isSelected?: boolean }>`
  flex: 1 1 0;
  padding: 12px 0;
  justify-content: center;
  font-family: SFProText;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: ${({ isSelected }) => (isSelected ? '#eafff8' : '#808080')};
  transition: 0.2s ease-out;
  border-bottom: ${({ isSelected }) =>
    isSelected ? 'solid 1px #f9fefc' : 'solid 1px rgba(0, 0, 0, 0)'};
  text-shadow: ${({ isSelected }) => (isSelected ? '0 0 6px #e9fff8' : 'none')};

  :hover {
    text-shadow: 0 0 6px #f9fefc;
    color: #f8fefc;
  }

  :active {
    text-shadow: 0 0 6px #e9fff8;
    color: #eafff8;
  }
`;

export const ScriptPlaceholder = styled.div`
  height: 236px;
  background-color: #1e2e2b;
`;

export const Witnesses = styled.div``;

export const WitnessContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 2px;
`;

export const WitnessIndex = styled.span`
  flex-shrink: 0;
  width: 24px;
  text-align: center;
`;

export const WitnessIconContainer = styled.div`
  flex-shrink: 0;
  margin: 0 6px;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: #1e2e2b;
`;

export const WitnessIcon = styled(FileIcon)`
  width: 8px !important;
  width: 8px !important;
  color: #f8fefc;
`;

export const WitnessAddress = styled.span`
  flex: 1 1 0;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;
