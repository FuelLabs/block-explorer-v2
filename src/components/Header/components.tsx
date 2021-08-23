import styled from 'styled-components'
import {ArrowIcon, LogoIcon} from "../Icons";
import {ButtonReset} from "../Button/components";
import {Link} from "react-router-dom";

export const HeaderContainer = styled.header`
  
`

export const HeaderContent = styled.div`
  padding: 56px 32px 0;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

export const ContentItem = styled.div`
  display: flex;
  align-items: center;
`

export const Logo = styled(LogoIcon)`
  margin: 0 8px 0 0;
  width: 48px !important;
  height: 48px !important;
`

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  font-family: Cyberspace-Raceway-Front;
  font-size: 14px;
  font-weight: normal;
  color: #eefef8;
`

export const NavigationLink = styled.a`
  padding: 4px 10px;
  font-family: SFProText;
  font-size: 16px;
  font-weight: 500;
  color: #808080;
  transition: .2s ease-out;
  
  :hover {
    text-shadow: 0 0 6px #f9fefc;
    color: #f8fefc;
  }
  
  :active {
    text-shadow: 0 0 6px #e9fff8;
    color: #eafff8;
  }
`

export const NetworkSelectorButton = styled(ButtonReset)`
  margin: 0 16px 0 8px;
  padding: 8px 12px 8px 16px;
  font-family: SFProDisplay;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
  color: #081C17;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #58c09b;
  transition: .2s ease-out;
  
  :hover, :active {
    box-shadow: 0 0 6px 0 #58c09b;
  }
`

export const NetworkSelectorIcon = styled(ArrowIcon)`
  margin: 0 0 0 8px;
  width: 8px !important;
  height: 8px !important;
  transform: rotate(90deg);
`
