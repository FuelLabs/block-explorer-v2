import styled from "styled-components"

export const Container = styled.section`

`

export const Content = styled.div`
  padding: 56px 32px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 425px) {
    padding: 40px 24px;
  }
`

export const Title = styled.h2`
  margin: 0 0 8px;
  font-family: SFProDisplay;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  white-space: break-spaces;
`

export const Subtitle = styled.span`
  margin: 0 0 32px;
  display: block;
  font-family: SFProText;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  color: #f8fefc;
`