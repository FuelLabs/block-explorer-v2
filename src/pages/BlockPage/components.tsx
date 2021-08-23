import styled from "styled-components";
import {Link} from "react-router-dom";
import { ArrowIcon } from "../../components/Icons";

export const Container = styled.section`

`

export const Content = styled.div`
  padding: 56px 32px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`

export const Title = styled.h2`
  margin: 0 0 40px;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  color: #f8fefc;
  white-space: break-spaces;
`

export const BlockDataContainer = styled.div`
  padding: 16px 32px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px #808080;
  border-radius: 8px;
`

export const BlockDataRow = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: center;
`

export const RowKeyColumn = styled.div`
  width: 250px;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`

export const ProducerLink = styled(Link)`
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

export const BlockHash = styled(Link)`
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

export const BlockNumber = styled.div`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #f8fefc;
`

export const EtherscanBlockLink = styled.a`
  margin: 0 0 0 8px;
  color: #58c09b;
  
  svg {
    height: 12px !important;
    width: 12px !important;
  }
`

export const AddressesCount = styled.div`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #f8fefc;
`

export const TransactionsCount = styled(Link)`
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

export const BlockHeightContainer = styled.div`
  display: flex;
  align-items: center;
`

export const BlockHeight = styled.div`
  margin: 0 12px;
  text-align: center;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`

export const BlockNavigationButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  justify-content: center;
  border-radius: 2px;
  border: solid 0.2px #58c09b;
  background-color: #03261e;
  color: #58c09b;

  :hover {
    box-shadow: 0 0 2px 0 #58c09b;
  }
`

export const BlockNavigationIcon = styled(ArrowIcon)<{rotate?: boolean}>`
  width: 6px !important;
  height: 6px !important;
  transform: ${({ rotate }) => rotate ? 'rotate(180deg)' : 'none'};
`
