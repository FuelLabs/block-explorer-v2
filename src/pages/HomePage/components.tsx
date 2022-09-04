import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonReset } from '../../components/Button/components';
import { ArrowIcon, SearchIcon as SearchSvg } from '../../components/Icons';
import { InputReset } from '../../components/Input/components';

export const Container = styled.section``;

export const Content = styled.div`
  padding: 56px 32px 0;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 425px) {
    padding: 40px 24px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
`;

export const Input = styled(InputReset)`
  height: 40px;
  width: 100%;
  padding: 0 12px;
  border: solid 1px #808080;
  background-color: #192f2b;
  outline: none;
  font-size: 18px;
  font-weight: 500;

  :hover {
    border: solid 1px #f9fefc;
  }

  :focus {
    box-shadow: 0 0 2px 0 #58c09b;
    border: solid 1px #58c09b;
  }

  @media screen and (max-width: 425px) {
    font-size: 16px;
  }
`;

export const SearchIcon = styled(SearchSvg)<{ isDisabled?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};
  color: ${({ isDisabled }) => (isDisabled ? 'gray' : 'white')};
`;

export const SearchNotFound = styled.div`
  position: absolute;
  left: 0px;
  top: 50px;
`;

export const SearchNotValid = styled.div`
  position: absolute;
  left: 0px;
  top: 50px;
  color: #f54747;
`;

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 48px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DataItem = styled.div`
  width: 48%;

  @media screen and (max-width: 768px) {
    width: 100%;

    :first-of-type {
      margin: 0 0 32px;
    }
  }
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DataTitle = styled.h2`
  margin: 0 0 16px;
  font-family: SFProDisplay;
  font-size: 21px;
  font-weight: 600;
  color: #eafff8;
`;

export const DataPagination = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const DataPaginationTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

export const DataPaginationText = styled.div`
  font-family: SFProDisplay;
  font-size: 16px;
  color: #808080;
`;

export const DataPaginationTextCurrentPage = styled(DataPaginationText)`
  font-family: SFProDisplay;
  font-size: 18px;
  color: #eafff8;
  margin-top: 2px;
  margin-right: 2px;
`;

export const ArrowRightIcon = styled(ArrowIcon)`
  width: 10px !important;
  height: 10px !important;
`;

export const ArrowLeftIcon = styled(ArrowIcon)`
  width: 10px !important;
  height: 10px !important;
  transform: rotate(180deg);
`;

export const IconButton = styled(ButtonReset)<{ isDisabled?: boolean }>`
  border-radius: 100%;
  width: 30px;
  height: 30px;
  background-color: #081c17;
  color: ${({ isDisabled }) => (isDisabled ? '#808080' : '#eafff8')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};

  :hover {
    ${({ isDisabled }) => (isDisabled ? '' : 'background-color: #1e2e2b;')}
  }

  :active {
    ${({ isDisabled }) => (isDisabled ? '' : 'background-color: #294842;')}
  }

  @media screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

export const IconButtonLeft = styled(IconButton)`
  margin-right: 8px;

  @media screen and (max-width: 768px) {
    margin-right: 4px;
  }
`;

export const IconButtonRight = styled(IconButton)`
  margin-left: 8px;

  @media screen and (max-width: 768px) {
    margin-left: 4px;
  }
`;

export const DataBox = styled.div`
  border-radius: 12px;
  border: solid 1px #808080;
`;

export const DataBoxRow = styled.div`
  display: flex;
  border-bottom: solid 1px #21302d;

  :last-of-type {
    border-bottom: none;
  }
`;

export const RecentBlockRow = styled(DataBoxRow)`
  padding: 22px 24px;
`;

export const TransactionsDataBoxRow = styled(DataBoxRow)`
  padding: 22px 24px 22px 0;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const DataBoxColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataTimestamp = styled.span`
  font-family: SFProText;
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  color: #808080;
`;

export const ProducerRow = styled.div`
  display: flex;
`;

export const DataLabel = styled.span`
  display: flex;
  font-family: SFProText;
  font-size: 15px;
  line-height: 18px;
  font-weight: normal;
  color: #808080;
  white-space: pre;
`;

export const BlockProducerText = styled.span`
  display: flex;
  font-family: SFProText;
  font-size: 15px;
  line-height: 18px;
  font-weight: normal;
  color: #808080;
  white-space: pre;
  max-width: 204px;
`;

export const BaseLink = styled(Link)`
  font-family: SFProText;
  font-size: 15px;
  line-height: 18px;
  font-weight: normal;
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

export const ProducerAddress = styled(BaseLink)`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const BlockNumber = styled(Link)`
  margin: 0 0 2px 0;
  font-family: SFProText;
  font-size: 21px;
  line-height: 24px;
  font-weight: normal;
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

export const TxCount = styled(BaseLink)``;

export const TxType = styled.span`
  padding: 2px 8px;
  margin: 4px 0 0;
  height: 20px;
  border-radius: 10px;
  background-color: #f9fefc;
  font-family: SFProText;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  color: #021d17;
`;

export const TransactionAddress = styled(Link)`
  display: block;
  margin: 0 0 4px;
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  color: #58c09b;
  cursor: pointer;
  transition: 0.2s ease-out;
  text-overflow: ellipsis;
  overflow: hidden;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`;

export const TransactionRecipientLabel = styled(DataLabel)`
  font-weight: 500;
`;

export const TransactionRecipientLink = styled(BaseLink)`
  margin: 0 0 2px;
  font-weight: 500;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
`;

export const TransactionTypeColumn = styled(DataBoxColumn)`
  margin: 0 0 0 20px;
`;

export const TransactionHashColumn = styled(DataBoxColumn)`
  max-width: 124px;
  margin: 0 0 0 20px;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    max-width: 400px;
  }
`;

export const TransactionRecipientsColumn = styled.div`
  margin: 0 0 0 24px;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    margin: 16px 0 0 24px;
  }

  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`;

export const TransactionRecipientsWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
`;

export const RecentBlockColumn1 = styled(DataBoxColumn)`
  flex: 1 1 0;
  max-width: 124px;
`;

export const RecentBlockColumn2 = styled(DataBoxColumn)`
  flex: 1 1 0;
  padding: 0 0 0 16px;
  overflow: hidden;
`;

export const TransactionRowColumn = styled.div`
  display: flex;
`;
