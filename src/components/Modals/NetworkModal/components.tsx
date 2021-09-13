import styled from "styled-components";
import {ButtonReset} from "../../Button/components";

export const Container = styled.div`
  width: 100%;
  max-width: 348px;
  border-radius: 6px;
  box-shadow: var(--modal-content-box-shadow);
  border: solid 1px var(--modal-content-border-color);
  background-color: var(--modal-context-bg-color);
`

export const Title = styled.h2`
  margin: 20px 0;
  font-family: SFProDisplay;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  color: var(--head-color);
`

export const NetworkSelectorCheckbox = styled.div`
  width: 24px;
  height: 24px;
  
  :hover {
    border: solid 1px #f9fefc !important;
  }
`

export const NetworkSelectorButton = styled(ButtonReset)<{ isSelected?: boolean, isHighlighted?: boolean }>`
  width: 100%;
  padding: 22px 40px 22px 32px;
  justify-content: space-between;
  border-bottom: solid 1px var(--border-color-1);
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-color);
  
  :first-of-type {
    border-top: solid 1px var(--border-color-1);
  }
  
  :hover ${NetworkSelectorCheckbox} {
      border: ${({ isSelected }) => isSelected ? 'solid 1px #f9fefc' : 'solid 1px #f9fefc'};
  }
  
  ${NetworkSelectorCheckbox} {
    background-color: ${({isSelected}) => isSelected ? '#58c09b' : 'none'};
    box-shadow: ${({ isHighlighted, isSelected }) => isHighlighted && isSelected ? '0 0 3px 0 #58c09b' : 'none'};
    border: ${({ isSelected }) => isSelected ? 'none' : 'solid 1px #808080'};
  }
`

export const NetworkSelectorButtonText = styled.div`
  display: flex;
  align-items: center;
`

export const ActiveNetworkIndicator = styled.span`
  margin: 0 0 0 8px;
  display: block;
  width: 6px;
  height: 6px;
  box-shadow: 0 0 6px 0 #58c09b;
  background-color: #58c09b;
  border-radius: 3px;
`

export const ConfirmNetworkButton = styled(ButtonReset)`
  width: calc(100% - 48px);
  margin: 24px 24px;
  padding: 16px 8px;
  justify-content: center;
  background-color: #58c09b;
  font-family: SFProDisplay;
  font-size: 21px;
  line-height: 28px;
  font-weight: 500;
  color: #fff;
  
  :hover, :active {
    box-shadow: 0 0 6px 0 #58c09b;
  }
`