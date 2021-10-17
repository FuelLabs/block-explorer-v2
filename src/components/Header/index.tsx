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
import { useContext, useState } from "react";
import { NetworkModal } from "../Modals/NetworkModal";
import { ChainContext } from "../../contexts/network";

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
  const [modal, setModal] = useState(false)
  const { chains } = useContext(ChainContext);

  function onClose() {
    setModal(false)
  }

  function showModal() {
    setModal(true)
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
              {chains?.[0]?.name}
              <NetworkSelectorIcon />
            </NetworkSelectorButton>
            <NavigationLinksContainer>
              {NavigationLinks.map((navigationItem, idx) => (
                <NavigationLink key={idx} href={navigationItem.link} target="_blank" rel="noreferrer">{navigationItem.text}</NavigationLink>
              ))}
            </NavigationLinksContainer>
          </ContentItem>
        </HeaderContent>
      </HeaderContainer>
      {modal && <NetworkModal onClose={onClose} />}
    </>
  )
}
