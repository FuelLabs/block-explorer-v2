import { BigNumber } from '@ethersproject/bignumber';
import type {
  CoinQuantity,
  // NativeAssetId
} from 'fuels';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { QRModal } from '../../components/Modals/QRModal';

import BalancesTable from './BalancesTable';
import TransactionsTable from './TransactionsTable';
import type { AddressPageTransaction } from './__generated__/operations';
import { useAddressPageQuery } from './__generated__/operations';
import {
  Container,
  Content,
  CopyButtonIcon,
  Tooltip,
  HeadlineAddress,
  HeadlineAddressButton,
  HeadlineAddressContainer,
  HeadlineAddressHeader,
  HeadlineCoinsContainer,
  HeadlineContainer,
  QRButtonIcon,
  CoinsCounterLabel,
  CoinsCounter,
  // TokenDropdownContainer,
  // TokenButton,
  // TokenButtonSymbol,
  // TokenButtonAmount,
  // TokenButtonSeparator,
  // TokenButtonIconContainer,
  // TokenDropdownIcon,
} from './components';

export default function AddressPage() {
  const { address } = useParams() as any;
  const [copyTooltip] = useState('Copy address');
  const [modal, setModal] = useState(false);
  const { loading, data } = useAddressPageQuery({
    variables: { first: 10, owner: address },
  });
  const coins = data?.coins!.edges!.map((edge) => edge!.node);
  const balances =
    coins?.reduce<{ [assetId: string]: CoinQuantity }>(
      (acc, { assetId, amount }) => ({
        ...acc,
        [assetId]: {
          assetId,
          amount: BigNumber.from(amount).add(acc[assetId]?.amount ?? 0),
        },
      }),
      {}
    ) ?? null;
  const transactions = useMemo<AddressPageTransaction[]>(
    () => data?.transactionsByOwner!.edges!.map((edge) => edge!.node) ?? [],
    [data]
  );

  const onClose = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(address);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <Content>
            <HeadlineContainer>
              <HeadlineAddressContainer>
                <HeadlineAddressHeader>
                  {`Address:  `}
                  <HeadlineAddress>{address}</HeadlineAddress>
                </HeadlineAddressHeader>
              </HeadlineAddressContainer>
            </HeadlineContainer>
          </Content>
        </Container>
      </>
    );
  }
  return (
    <>
      {modal && <QRModal onClose={onClose} address={address} />}
      <Header />
      <Container>
        <Content>
          <HeadlineContainer>
            <HeadlineAddressContainer>
              <HeadlineAddressHeader>
                {`Address:  `}
                <HeadlineAddress>{address}</HeadlineAddress>
              </HeadlineAddressHeader>
              <HeadlineAddressButton
                onClick={() => {
                  onClickCopy();
                }}
              >
                <CopyButtonIcon />
                <Tooltip>{copyTooltip}</Tooltip>
              </HeadlineAddressButton>
              <HeadlineAddressButton onClick={showModal}>
                <QRButtonIcon />
                <Tooltip>Click to copy QR code</Tooltip>
              </HeadlineAddressButton>
            </HeadlineAddressContainer>
            {/* <HeadlineCoinsContainer>
              <CoinsCounterLabel>
                Coins:
                <CoinsCounter>{coins?.length ?? '...'}</CoinsCounter>
              </CoinsCounterLabel>
              <TokenDropdownContainer>
                <TokenButton>
                  <TokenButtonSymbol>ETH:</TokenButtonSymbol>
                  <TokenButtonAmount>
                    {balances?.[NativeAssetId]?.amount.toString() ?? 0}
                  </TokenButtonAmount>
                  <TokenButtonSeparator></TokenButtonSeparator>
                  <TokenButtonIconContainer>
                    <TokenDropdownIcon />
                  </TokenButtonIconContainer>
                </TokenButton>
              </TokenDropdownContainer>
            </HeadlineCoinsContainer> */}
          </HeadlineContainer>
          {balances ? <BalancesTable balances={Object.values(balances)} /> : null}
          <div style={{ height: 16 }} />
          <TransactionsTable transactions={transactions} />
        </Content>
      </Container>
    </>
  );
}
