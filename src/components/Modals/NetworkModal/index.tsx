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
import { ChainContext } from "../../../contexts/network";
import { Chain } from "../../../utils/models";

interface Props {
  onClose: () => void,
}

export function NetworkModal(props: Props) {
  const [selectedChain, selectChain] = useState<Chain | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);
  const { chains } = React.useContext(ChainContext);
  const [activeChain, setActiveChain] = useState<Chain>(chains?.[0]);
  const highlightedChain = useMemo(() => selectedChain || activeChain, [activeChain, selectedChain])

  useOnClickOutside(contentRef, onClickOutside)

  function onNetworkSelect(chain: Chain) {
    selectChain(chain)
  }

  function onNetworkSwitch() {
    if (selectedChain) {
      setActiveChain(selectedChain)
      props.onClose()
    }
    selectChain(undefined)
  }

  function onClickOutside() {
    props.onClose()
  }

  return (
    <Modal>
      <Container ref={contentRef}>
        <Title>Change Network</Title>
        {chains.map((chain, idx) => (
          <NetworkSelectorButton
            key={idx}
            onClick={() => { onNetworkSelect(chain) }}
            isSelected={chain === highlightedChain}
            isHighlighted={chain === activeChain}
          >
            <NetworkSelectorButtonText>
              {chain.name}
              {activeChain === chain && <ActiveNetworkIndicator />}
            </NetworkSelectorButtonText>
            <NetworkSelectorCheckbox />
          </NetworkSelectorButton>
        ))}
        <ConfirmNetworkButton onClick={() => { onNetworkSwitch() }}>Switch</ConfirmNetworkButton>
      </Container>
    </Modal>
  )
}
