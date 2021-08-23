import {
  Title,
  Container,
  NetworkSelectorButton,
  NetworkSelectorCheckbox,
  NetworkSelectorButtonText, ActiveNetworkIndicator, ConfirmNetworkButton
} from "./components";
import * as React from "react";
import {Modal} from "../Base";
import {useMemo, useRef, useState} from "react";
import {useOnClickOutside} from "../../../hooks";

const Networks = ['Mainnet', 'Robsin', 'Gorli', 'Rinkeby']

interface Props {
  onClose: () => void,
  onNetworkSwitch: (network: string) => void,
}
export function NetworkModal(props: Props) {
  const [activeNetwork, setActiveNetwork] = useState('Mainnet');
  const [selectedNetwork, selectNetwork] = useState<string | undefined>();
  const highlightedNetwork = useMemo(() => selectedNetwork || activeNetwork, [activeNetwork, selectedNetwork])
  const contentRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(contentRef, onClickOutside)


  function onNetworkSelect(network: string) {
    selectNetwork(network)
  }

  function onNetworkSwitch() {
    if (selectedNetwork) {
      setActiveNetwork(selectedNetwork)
      props.onNetworkSwitch(selectedNetwork)
      props.onClose()
    }
    selectNetwork(undefined)
  }

  function onClickOutside() {
    props.onClose()
  }

  return (
    <Modal>
      <Container ref={contentRef}>
        <Title>Change Network</Title>
        {Networks.map((network, idx) => (
          <NetworkSelectorButton
            key={idx}
            onClick={() => { onNetworkSelect(network) }}
            isSelected={network === highlightedNetwork}
            isHighlighted={network === activeNetwork}
          >
            <NetworkSelectorButtonText>
              {network}
              {activeNetwork === network && <ActiveNetworkIndicator />}
            </NetworkSelectorButtonText>
            <NetworkSelectorCheckbox />
          </NetworkSelectorButton>
        ))}
        <ConfirmNetworkButton onClick={() => { onNetworkSwitch() }}>Switch</ConfirmNetworkButton>
      </Container>
    </Modal>
  )
}
