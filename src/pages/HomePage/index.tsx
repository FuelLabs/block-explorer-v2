import { useEffect, useState } from "react";

import { Header } from "../../components/Header";

import { RecentBlocks } from "./RecentBlocks";
import { RecentTransactions } from "./RecentTransactions";
import type {
  HomePageBlock,
  HomePageTransaction,
} from "./__generated__/operations";
import {
  useHomePageBlocksQuery,
  useHomePageTransactionsQuery,
} from "./__generated__/operations";
import {
  Container,
  Content,
  DataContainer,
  Input,
  InputContainer,
  SearchIcon,
} from "./components";

export default function HomePage() {
  const [blocks, setBlocks] = useState<HomePageBlock[]>([]);
  const [transactions, setTransactions] = useState<HomePageTransaction[]>([]);
  const transactionsQuery = useHomePageTransactionsQuery({
    variables: { count: 50 },
  });
  const blocksQuery = useHomePageBlocksQuery({ variables: { count: 5 } });

  useEffect(() => {
    if (blocksQuery.loading) return;
    if (blocksQuery.error) return;
    const edges: any[] = blocksQuery.data?.blocks?.edges || [];
    const blocks: HomePageBlock[] = edges.map((edge) => edge.node);
    setBlocks(blocks);
  }, [blocksQuery.loading, blocksQuery.error, blocksQuery.data]);

  useEffect(() => {
    if (transactionsQuery.loading) return;
    if (transactionsQuery.error) return;
    const edges: any[] = transactionsQuery.data?.transactions?.edges || [];
    const transactions: HomePageTransaction[] = edges.map((edge) => edge.node);
    setTransactions(transactions);
  }, [
    transactionsQuery.loading,
    transactionsQuery.data,
    transactionsQuery.error,
  ]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <InputContainer>
            <Input placeholder="Search an address, transaction or block" />
            <SearchIcon />
          </InputContainer>
          <DataContainer>
            <RecentBlocks blocks={blocks} />
            <RecentTransactions transactions={transactions} />
          </DataContainer>
        </Content>
      </Container>
    </>
  );
}
