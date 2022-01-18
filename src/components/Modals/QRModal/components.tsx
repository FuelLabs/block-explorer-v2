import styled from "styled-components";

export const Container = styled.div`
  padding: 0 40px 48px;
  width: 100%;
  max-width: 432px;
  border-radius: 6px;
  box-shadow: 0 0 25px 0 #58c09b;
  border: solid 1px #58c09c;
  background-color: #021d17;

  @media screen and (max-width: 425px) {
    padding: 0 24px 48px;
  }
`;

export const Title = styled.h2`
  margin: 20px 0;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  color: #f8fefc;
`;

export const QRAddress = styled.p`
  margin: 16px 0 40px;
  font-family: SFProText;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  color: #f8fefc;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const QRCodeContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
`;
