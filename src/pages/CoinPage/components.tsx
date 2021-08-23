import { Link } from "react-router-dom"
import styled from "styled-components"
import { ButtonReset } from "../../components/Button/components"
import { LogoIcon } from "../../components/Icons"

export const Container = styled.section`

`

export const Content = styled.div`
  padding: 56px 32px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`

export const Title = styled.h2`
  display: flex;
  align-items: center;
  margin: 0 0 48px;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  color: #f8fefc;
  white-space: break-spaces;
`

export const CoinSymbolContainer = styled.div`
  margin: 0 0 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 11px;
`

export const CoinName = styled.span`
  margin: 0 0 0 8px;
  font-family: SFProText;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`

export const CoinIcon = styled(LogoIcon)`

`

export const CoinDetailsContainer = styled.div`
  margin: 0 0 40px;
  padding: 20px 24px;
  border: solid 1px #808080;
  border-radius: 8px;
`

export const CoinDetailsRow = styled.div`
  display: flex;
  margin: 0 0 24px;

  :last-of-type {
    margin: 0;
  }
`

export const KeyLabel = styled.span`
  width: 260px;
  display: block;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`

export const KeyValue = styled.span`
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #f8fefc;
`

export const ContractLink = styled(Link)`
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

export const TableHeadlineDisclaimer = styled.span`
  font-family: SFProText;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #808080;
`

export const TableTabsContainer = styled.div`
  position: relative;
  display: flex;

  ::after {
    content: "";
    position: absolute;
    height: 1px;
    left: -8px;
    right: -8px;
    bottom: 0;
    background-color: #21302d;
    z-index: -1;
  }
`

export const TableTabButton = styled(ButtonReset)<{ isSelected?: boolean }>`
  padding: 14px 18px 18px 18px;
  min-width: 64px;
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