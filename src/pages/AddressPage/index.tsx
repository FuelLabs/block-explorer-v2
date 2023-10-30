/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { CoinQuantity } from 'fuels';
import { bn, toBech32 } from 'fuels';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { QRModal } from '../../components/Modals/QRModal';
import { getB56Address } from '../../utils/address';
import { getTransactionDate } from '../../utils/transaction';

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
  HeadlineContainer,
  QRButtonIcon,
} from './components';

export default function AddressPage() {
  const params = useParams() as any;
  const address = getB56Address(params.address);
  const [copyTooltip] = useState('Copy address');
  const [modal, setModal] = useState(false);
  const { loading, data } = useAddressPageQuery({
    variables: { first: 10, owner: address },
  });
  const balances = useMemo(
    () =>
      data?.balances.edges.map((edge) => {
        const balance = edge!.node;
        const formattedBalance = { ...balance, amount: bn(balance.amount) };
        return formattedBalance;
      }) ?? [],
    [data]
  );
  const transactions = useMemo<AddressPageTransaction[]>(
    () => data?.transactionsByOwner!.edges!.map((edge) => edge!.node) ?? [],
    [data]
  );
  const sortedTransactions = transactions.sort((t1, t2) =>
    (getTransactionDate(t1)?.getTime() || 0) - (getTransactionDate(t2)?.getTime() || 0) <= 0
      ? 1
      : -1
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
                  <div>
                    <HeadlineAddress>{toBech32(address)}</HeadlineAddress>
                    <HeadlineAddress>{address}</HeadlineAddress>
                  </div>
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
                <div>
                  <HeadlineAddress>{toBech32(address)}</HeadlineAddress>
                  <HeadlineAddress>{address}</HeadlineAddress>
                </div>
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
          </HeadlineContainer>
          {balances ? <BalancesTable balances={Object.values(balances)} /> : null}
          <div style={{ height: 16 }} />
          <TransactionsTable transactions={sortedTransactions} />
        </Content>
      </Container>
    </>
  );
}
