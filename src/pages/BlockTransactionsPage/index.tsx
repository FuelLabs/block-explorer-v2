import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { TransactionsTable } from '../AddressPage';
import { Container, Content, Subtitle, Title } from './components';

export function BlockTransactionsPage() {
  const { block } = useParams() as any;

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>Transaction list</Title>
          <Subtitle>{`Block: #${block}`}</Subtitle>
          <TransactionsTable />
        </Content>
      </Container>
    </>
  ) 
}
