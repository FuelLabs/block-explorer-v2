import {
  ContentItem,
  HeaderContainer,
  HeaderContent,
  Logo, LogoLink,
  NavigationLink,
  NavigationLinksContainer,
  NetworkSelectorButton,
  NetworkSelectorIcon
} from "./components";
import { useState } from "react";
import { NetworkModal } from "../Modals/NetworkModal";

const NavigationLinks = [{
  text: 'v1 Docs',
  link: "https://docs.fuel.sh"
}, {
  text: 'GitHub',
  link: 'https://github.com/FuelLabs'
}, {
  text: 'Discord',
  link: 'https://discord.com/invite/xfpK4Pe'
}, {
  text: 'Twitter',
  link: 'https://twitter.com/fuellabs_'
}, {
  text: 'Medium',
  link: 'https://fuellabs.medium.com'
}, {
  text: 'Jobs',
  link: 'https://jobs.lever.co/fuellabs'
}]

export function Header() {
  const [network, setNetwork] = useState('MAINNET')
  const [modal, setModal] = useState(false)

  function onClose() {
    setModal(false)
  }

  function showModal() {
    setModal(true)
  }

  function onNetworkSwitch(network: string) {
    setNetwork(network)
  }

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
              {network.toUpperCase()}
              <NetworkSelectorIcon />
            </NetworkSelectorButton>
            <NavigationLinksContainer>
              {NavigationLinks.map(navigationItem => (
                <NavigationLink href={navigationItem.link} target="_blank" rel="noreferrer">{navigationItem.text}</NavigationLink>
              ))}
            </NavigationLinksContainer>
          </ContentItem>
        </HeaderContent>
      </HeaderContainer>
      {modal && <NetworkModal onClose={onClose} onNetworkSwitch={onNetworkSwitch} />}
    </>
  )
}
