import { useContext, useState } from "react";

import { ChainContext } from "../../contexts/network";
import { NetworkModal } from "../Modals/NetworkModal";

import {
  ContentItem,
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoLink,
  NetworkSelectorButton,
  NetworkSelectorIcon,
} from "./components";

export function Header() {
  const [modal, setModal] = useState(false);
  const { chains } = useContext(ChainContext);

  const onClose = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <ContentItem>
            <LogoLink to="/">
              <Logo />
              NETWORK EXPLORER
            </LogoLink>
          </ContentItem>
          <ContentItem>
            <NetworkSelectorButton onClick={() => showModal()}>
              {chains?.[0]?.name}
              <NetworkSelectorIcon />
            </NetworkSelectorButton>
          </ContentItem>
        </HeaderContent>
      </HeaderContainer>
      {modal && <NetworkModal onClose={onClose} />}
    </>
  );
}
