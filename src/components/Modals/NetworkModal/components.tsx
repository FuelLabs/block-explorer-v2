import styled from 'styled-components';

import { ButtonReset } from '../../Button/components';

export const Container = styled.div`
  width: 100%;
  max-width: 348px;
  border-radius: 6px;
  box-shadow: 0 0 25px 0 #58c09b;
  border: solid 1px #58c09c;
  background-color: #021d17;
`;

export const Title = styled.h2`
  margin: 20px 0;
  font-family: SFProDisplay;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  color: #f8fefc;
`;

export const SubTitle = styled.h3`
  margin: 20px 0;
  font-family: SFProDisplay;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #f8fefc;
  cursor: pointer;
`;

export const CustomInputContainer = styled.form<{ show: boolean }>`
  margin: 22px 40px 22px 32px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
`;

export const CustomInputField = styled.input`
  flex-grow: 1;
  margin-right: 8px;
`;

export const CustomInputReset = styled(ButtonReset)`
  font-family: SFProDisplay;
  width: calc(100%);
  justify-content: center;
  padding: 2px 4px;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 24px;
  color: #ffffff9b;
`;

export const NetworkSelectorCheckbox = styled.div`
  width: 24px;
  height: 24px;

  :hover {
    border: solid 1px #f9fefc !important;
  }
`;

export const NetworkSelectorButton = styled(ButtonReset)<{
  isSelected?: boolean;
  isHighlighted?: boolean;
}>`
  width: 100%;
  padding: 22px 40px 22px 32px;
  justify-content: space-between;
  border-bottom: solid 1px #1c2e2a;
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  color: #f8fefc;

  :first-of-type {
    border-top: solid 1px #1c2e2a;
  }

  :hover ${NetworkSelectorCheckbox} {
    border: ${({ isSelected }) => (isSelected ? 'solid 1px #f9fefc' : 'solid 1px #f9fefc')};
  }

  ${NetworkSelectorCheckbox} {
    background-color: ${({ isSelected }) => (isSelected ? '#58c09b' : 'none')};
    box-shadow: ${({ isHighlighted, isSelected }) =>
      isHighlighted && isSelected ? '0 0 3px 0 #58c09b' : 'none'};
    border: ${({ isSelected }) => (isSelected ? 'none' : 'solid 1px #808080')};
  }
`;

export const NetworkSelectorButtonText = styled.div`
  display: flex;
  align-items: center;
`;

export const ActiveNetworkIndicator = styled.span`
  margin: 0 0 0 8px;
  display: block;
  width: 6px;
  height: 6px;
  box-shadow: 0 0 6px 0 #58c09b;
  background-color: #58c09b;
  border-radius: 3px;
`;

export const ConfirmNetworkButton = styled(ButtonReset)`
  width: calc(100% - 48px);
  margin: 12px 24px;
  padding: 8px 8px;
  justify-content: center;
  background-color: #58c09b;
  font-family: SFProDisplay;
  font-size: 16px;
  line-height: 28px;
  font-weight: 500;
  color: #fff;

  :hover,
  :active {
    box-shadow: 0 0 6px 0 #58c09b;
  }
`;
