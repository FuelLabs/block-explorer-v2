import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import {
  Container,
  Content,
  DataContainer,
  Input,
  InputContainer,
  SearchIcon
} from "./components";
import { queries } from '../../api';
import { Block } from "../../utils/models";
import { Transaction } from "../../utils/model";
import { RecentBlocks } from "./RecentBlocks";
import { RecentTransactions } from "./RecentTransactions";

export function Homepage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsQuery = useQuery(queries.getHomeTransactions, { variables: { count: 50 } });
  const blocksQuery = useQuery(queries.getHomeBlocks, { variables: { count: 5 }});

  useEffect(() => {
    if (blocksQuery.loading) return;
    if (blocksQuery.error) return;
    const edges: any[] = blocksQuery.data?.blocks?.edges || [];
    const blocks: Block[] = edges.map(edge => edge.node);
    setBlocks(blocks);
  }, [blocksQuery])

  useEffect(() => {
    if (transactionsQuery.loading) return;
    if (transactionsQuery.error) return;
    const edges: any[] = transactionsQuery.data?.transactions?.edges || [];
    const transactions: Transaction[] = edges.map(edge => edge.node);
    setTransactions(transactions);
  }, [transactionsQuery])

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
  )
}
