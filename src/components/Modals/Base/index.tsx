import type * as React from 'react';

import { Container, Wrapper } from './components';

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
