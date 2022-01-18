import { Link } from "react-router-dom";
import styled from "styled-components";

export const GreenLink = styled(Link)`
  font-family: SFProText;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #58c09b;
  transition: 0.2s ease-out;

  :hover {
    text-shadow: 0 0 6px #58c09b;
  }

  :active {
    text-shadow: 0 0 6px #4fad83;
    color: #4fad83;
  }
`;
