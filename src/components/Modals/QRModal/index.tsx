import {
  Title,
  Container, QRAddress,
} from "./components";
import {Modal} from "../Base";
import {useRef} from "react";
import {useOnClickOutside} from "../../../hooks";
import QRCode from 'qrcode.react'

interface Props {
  onClose: () => void,
  address: string,
}

export function QRModal(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(contentRef, onClickOutside)

  function onClickOutside() {
    props.onClose()
  }

  return (
    <Modal>
      <Container ref={contentRef}>
        <Title>QR Code</Title>
        <QRAddress>{props.address}</QRAddress>
        <QRCode value={props.address} fgColor="#f8fefc" bgColor="#021d17" />
      </Container>
    </Modal>
  )
}
