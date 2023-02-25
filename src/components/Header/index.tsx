import { useContext, useState } from 'react';

import { ChainContext } from '../../contexts/network';
import { getNetworkVersion } from '../../providers/NetworkProvider/utils';
import { NetworkModal } from '../Modals/NetworkModal';

import {
  ContentItem,
  ContentItemButtons,
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoLink,
  NetworkSelectorButton,
  NetworkSelectorIcon,
  NetworkVersion,
} from './components';

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
              NETWORK EXPLORER2
            </LogoLink>
          </ContentItem>
          <ContentItemButtons>
            <NetworkVersion>{getNetworkVersion()}</NetworkVersion>
            <NetworkSelectorButton onClick={() => showModal()}>
              {chains?.[0]?.name}
              <NetworkSelectorIcon />
            </NetworkSelectorButton>
          </ContentItemButtons>
        </HeaderContent>
      </HeaderContainer>
      {modal && <NetworkModal onClose={onClose} />}
    </>
  );
}
