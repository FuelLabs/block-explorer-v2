import styled from "styled-components";
import {Link} from "react-router-dom";
import { ButtonReset } from "../../components/Button/components";
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

export const TitleTransaction = styled.span`
  margin: 0 0 0 32px;
  font-family: SFProText;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`

export const TransactionDataContainer = styled.div`
  margin: 0 0 36px;
  padding: 16px 32px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px #808080;
  border-radius: 8px;
`

export const TransactionDataRow = styled.div`
  padding: 12px 0;
  display: flex;
`

export const RowKeyColumn = styled.div`
  width: 250px;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`

export const RowValueColumn = styled.div`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #f8fefc;
`

export const TransactionStatus = styled.span`
  padding: 0 12px;
  border-radius: 10px;
  background-color: #58c09b;
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: #021d17;
`

export const BaseLink = styled(Link)`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #58c09b;
  transition: .2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`

export const UTXOContainer = styled.div`

`

export const DetailsButtonContainer = styled.div`
  margin: 0 0 36px;
  display: flex;
  justify-content: flex-end;
`

export const DetailsButton = styled(ButtonReset)<{ isActive?: boolean }>`
  padding: 8px 16px;
  border-radius: 1px;
  border: solid 1px #57c09b;
  background-color: ${({ isActive }) => isActive ? '#1e2e2b' : '#081C17'};
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
`

export const UTXOBoxesContainer = styled.div`
  display: flex;
`

export const UTXOBoxesColumn = styled.div`
  flex: 1 1 0;
`
export const UTXOSeparatorColumn = styled.div`
  margin: 0 34px;
`
export const UTXOBoxContainer = styled.div`
  margin: 0 0 24px;
  border: solid 3px #03261e;
`

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
`

export const UTXOHeadlineColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const UTXOTitle = styled.span`
  margin: 0 0 6px;
  display: block;
  font-weight: 600;
`

export const UTXOHash = styled(BaseLink)`
  display: block;
  max-width: 368px;
  font-size: 13px;
  line-height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const HeadlineText = styled.span`
  display: block;
`

export const UTXODetailsContainer = styled.div`
  padding: 32px 16px 24px 40px;
`

export const UTXODetailsRow = styled.div`
  display: flex;
  margin: 0 0 16px;
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #f8fefc;

  :last-of-type {
    margin: 0
  }
`

export const UTXODetailsKey = styled.span`
  display: block;
  width: 170px;
`

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
`

export const UTXOSeparatorArrow = styled(ArrowIcon)`
  margin: 72px 0 0;
  width: 26px !important;
  height: 26px !important;
  color: #58c09b;
`

export const ScriptsContainer = styled.div`
  margin: 12px 0 0;
`

export const ScriptTitle = styled.span`
  display: block;
  margin: 0 0 28px;
  font-family: SFProText;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
  color: #f8fefc;
`

export const ScriptContainer = styled.div`
  margin: 0 0 36px;
  max-width: 442px;
  border: solid 1px #1e2e2b;
`

export const ScriptTabsContainer = styled.div`
  display: flex;
`

export const ScriptTabButton = styled(ButtonReset)<{ isSelected?: boolean }>`
  flex: 1 1 0;
  padding: 12px 0;
  justify-content: center;
  font-family: SFProText;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: ${({ isSelected }) => isSelected ? '#eafff8' : '#808080'};
  transition: .2s ease-out;
  border-bottom: ${({ isSelected }) => isSelected ? 'solid 1px #f9fefc' : 'solid 1px rgba(0, 0, 0, 0)'};
  text-shadow: ${({ isSelected }) => isSelected ? '0 0 6px #e9fff8' : 'none'};
  
  :hover {
    text-shadow: 0 0 6px #f9fefc;
    color: #f8fefc;
  }
  
  :active {
    text-shadow: 0 0 6px #e9fff8;
    color: #eafff8;
  }
`

export const ScriptPlaceholder = styled.div`
  height: 236px;
  background-color: #1e2e2b;
`