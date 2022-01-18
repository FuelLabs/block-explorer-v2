import { Container, Wrapper } from "./components";
import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export function Modal(props: Props) {
  return (
    <Container>
      <Wrapper>{props.children}</Wrapper>
    </Container>
  );
}
