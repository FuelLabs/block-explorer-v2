import styled from 'styled-components';

import { GreenLink } from '../../components/Link/components';

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
  margin: 0 0 8px;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  color: #f8fefc;
  white-space: break-spaces;
`;

export const Subtitle = styled.span`
  margin: 0 0 32px;
  display: block;
  font-family: SFProText;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`;

export const TxHashLink = styled(GreenLink)`
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

export const TxRecipientLink = styled(GreenLink)`
  display: block;
  margin: 0 0 12px;

  :last-of-type {
    margin: 0;
  }
`;

export const TxValue = styled.span`
  display: block;
  font-weight: 600;
  margin: 0 0 12px;

  :last-of-type {
    margin: 0;
  }
`;

export const CoinLink = styled(GreenLink)`
  display: block;
  font-weight: 600;
  margin: 0 0 12px;
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  :last-of-type {
    margin: 0;
  }
`;

export const HeadlineTransactionsNumber = styled.span`
  color: #f8fefc;
`;
