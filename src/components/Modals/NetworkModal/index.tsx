import * as React from "react";
import { useMemo, useRef, useState } from "react";

import type { Chain } from "../../../api";
import { ChainContext } from "../../../contexts/network";
import { useOnClickOutside, useLocalStorage } from "../../../hooks";
import { Modal } from "../Base";

import {
  Title,
  Container,
  NetworkSelectorButton,
  NetworkSelectorCheckbox,
  NetworkSelectorButtonText,
  ActiveNetworkIndicator,
  ConfirmNetworkButton,
  SubTitle,
  CustomInputContainer,
  CustomInputField,
  CustomInputReset,
} from "./components";

interface Props {
  onClose: () => void;
}

const { REACT_APP_GRAPHQL_API_ENDPOINT = "" } = process.env;

export function NetworkModal(props: Props) {
  const [customEndpoint, setCustomEndpoint] = useLocalStorage<string>(
    "GRAPHQL_API_ENDPOINT",
    REACT_APP_GRAPHQL_API_ENDPOINT
  );
  const [showCustomInput, setshowCustomInput] = useState<boolean>(false);
  const [inputField, setInputField] = useState<string>(customEndpoint);

  const [selectedChain, selectChain] = useState<Chain | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);
  const { chains } = React.useContext(ChainContext);
  const [activeChain, setActiveChain] = useState<Chain>(chains?.[0]);
  const highlightedChain = useMemo(
    () => selectedChain || activeChain,
    [activeChain, selectedChain]
  );

  useOnClickOutside(contentRef, onClickOutside);

  function onNetworkSelect(chain: Chain) {
    selectChain(chain);
  }

  function onNetworkSwitch() {
    if (selectedChain) {
      setActiveChain(selectedChain);
      setCustomEndpoint(REACT_APP_GRAPHQL_API_ENDPOINT);
      props.onClose();
    }
    selectChain(undefined);
  }

  function onClickOutside() {
    props.onClose();
  }

  return (
    <Modal>
      <Container ref={contentRef}>
        <Title>Change Network</Title>
        {chains.map((chain, idx) => (
          <NetworkSelectorButton
            key={idx}
            onClick={() => {
              onNetworkSelect(chain);
            }}
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
        <SubTitle onClick={() => setshowCustomInput(!showCustomInput)}>
          Add Custom Network
        </SubTitle>
        <CustomInputContainer
          onSubmit={() => {
            setCustomEndpoint(inputField);
            window.location.reload();
          }}
          show={showCustomInput}
        >
          <CustomInputField
            type="text"
            placeholder="Custom Network"
            required
            value={inputField}
            onChange={(event) => {
              setInputField(encodeURI(event.target.value));
            }}
          />
          <CustomInputReset
            type="button"
            onClick={() => {
              setCustomEndpoint(REACT_APP_GRAPHQL_API_ENDPOINT);
              window.location.reload();
            }}
          >
            Reset
          </CustomInputReset>
        </CustomInputContainer>
        <ConfirmNetworkButton
          onClick={() => {
            if (showCustomInput) {
              setCustomEndpoint(inputField);
              window.location.reload();
            } else {
              onNetworkSwitch();
            }
          }}
        >
          Switch
        </ConfirmNetworkButton>
      </Container>
    </Modal>
  );
}
