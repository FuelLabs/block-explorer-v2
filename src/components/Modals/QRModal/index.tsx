import QRCode from 'qrcode.react';
import { useRef } from 'react';

import { useOnClickOutside } from '../../../hooks';
import { Modal } from '../Base';

import { Title, Container, QRAddress, QRCodeContainer } from './components';

interface Props {
  onClose: () => void;
  address: string;
}

export function QRModal(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(contentRef, onClickOutside);

  function onClickOutside() {
    props.onClose();
  }

  return (
    <Modal>
      <Container ref={contentRef}>
        <Title>QR Code</Title>
        <QRAddress>{props.address}</QRAddress>
        <QRCodeContainer>
          <QRCode value={props.address} fgColor="#f8fefc" bgColor="#021d17" />
        </QRCodeContainer>
      </Container>
    </Modal>
  );
}
