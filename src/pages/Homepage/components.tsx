import styled from 'styled-components'
import {InputReset} from "../../components/Input/components";
import { SearchIcon as SearchSvg } from "../../components/Icons";
import {Link} from "react-router-dom";

export const Container = styled.section`

`

export const Content = styled.div`
  padding: 56px 32px 0;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 425px) {
    padding: 40px 24px;
  }
`

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
`

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
`

export const SearchIcon = styled(SearchSvg)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
`

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 48px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const DataItem = styled.div`
  max-width: 560px;
  width: 100%;

  :first-of-type {
    margin: 0 28px 0 0;
  }

  :last-of-type {
    margin: 0 0 0 28px;
  }

  @media screen and (max-width: 1000px) {
    :first-of-type {
      margin: 0 16px 0 0;
    }

    :last-of-type {
      margin: 0 0 0 16px;
    }
  }

  @media screen and (max-width: 768px) {
    :first-of-type {
      margin: 0 0 32px;
    }

    :last-of-type {
      margin: 0;
    }
  }
`

export const DataTitle = styled.h2`
  margin: 0 0 16px;
  font-family: SFProDisplay;
  font-size: 21px;
  font-weight: 600;
  color: #eafff8;
`

export const DataBox = styled.div`
  border-radius: 12px;
  border: solid 1px #808080;
`

export const DataBoxRow = styled.div`
  display: flex;
  border-bottom: solid 1px #21302d;
  
  :last-of-type {
    border-bottom: none;
  }
`

export const BlocksDataBoxRow = styled(DataBoxRow)`
  padding: 24px 0 22px;
`

export const TransactionsDataBoxRow = styled(DataBoxRow)`
  padding: 24px 0;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`

export const DataBoxColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const DataTimestamp = styled.span`
  font-family: SFProText;
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  color: #808080;
`

export const ProducerRow = styled.div`
  display: flex;
`

export const DataLabel = styled.span`
  font-family: SFProText;
  font-size: 15px;
  line-height: 18px;
  font-weight: normal;
  color: #808080;
`

export const BaseLink = styled(Link)`
  font-family: SFProText;
  font-size: 15px;
  line-height: 18px;
  font-weight: normal;
  color: #58c09b;
  cursor: pointer;
  transition: .2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`

export const ProducerAddress = styled(BaseLink)`
  font-family: SFProText;
  font-size: 15px;
  color: #58c09b;
  cursor: pointer;
  transition: .2s ease-out;
  
  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`

export const BlockNumber = styled(Link)`
  margin: 0;
  font-family: SFProText;
  font-size: 21px;
  font-weight: normal;
  color: #58c09b;
  cursor: pointer;
  transition: .2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`

export const TxCount = styled(BaseLink)`
  
`

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
`

export const TransactionAddress = styled(Link)`
  margin: 0 0 4px;
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  color: #58c09b;
  cursor: pointer;
  transition: .2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`

export const TransactionRecipientLabel = styled(DataLabel)`
  font-weight: 500;
`

export const TransactionRecipientRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TransactionRecipientLink = styled(BaseLink)`
  margin: 0 0 2px;
  font-weight: 500;
`

export const TransactionTypeColumn = styled(DataBoxColumn) `
  margin: 0 0 0 20px;
`

export const TransactionHashColumn = styled(DataBoxColumn) `
  margin: 0 0 0 20px;
`

export const TransactionRecipientsColumn = styled(DataBoxColumn)`
  margin: 0 32px 0;
  flex: 1 1 0;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    margin: 16px 20px 0;
  }

  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`

export const TransactionRecipientsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  :first-of-type {
    margin: 0 24px 0 0;
  }
`

export const BlocksRowSpace1 = styled.div`
  flex: 1 1 0;
  max-width: 80px;
`

export const BlocksRowSpace2 = styled.div`
  flex: 1 1 0;
`

export const BlockNumberColumn = styled(DataBoxColumn)`
  margin: 0 0 0 22px;
`

export const BlockProducerColumn = styled(DataBoxColumn)`
  /* margin: 0 0 0 80px; */
`

export const TransactionRowColumn = styled.div`
  display: flex;
`