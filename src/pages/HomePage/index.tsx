import { useEffect, useState } from 'react';

import type { PageInfo } from '../../api/__generated__/types';
import { Header } from '../../components/Header';

import { RecentBlocks } from './RecentBlocks';
import { RecentTransactions } from './RecentTransactions';
import type { HomePageBlock, HomePageTransaction } from './__generated__/operations';
import { useHomePageBlocksQuery, useHomePageTransactionsQuery } from './__generated__/operations';
import { Container, Content, DataContainer, Input, InputContainer, SearchIcon } from './components';

const PAGE_LIMIT = 5;

export default function HomePage() {
  const [blocks, setBlocks] = useState<HomePageBlock[]>([]);
  const [transactions, setTransactions] = useState<HomePageTransaction[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsQuery = useHomePageTransactionsQuery({
    variables: { last: PAGE_LIMIT },
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
    setPageInfo(transactionsQuery.data?.transactions?.pageInfo);
  }, [transactionsQuery.loading, transactionsQuery.data, transactionsQuery.error]);

  const handleNextPage = () => {
    transactionsQuery.refetch({
      before: pageInfo?.startCursor,
      after: undefined,
      last: PAGE_LIMIT,
      first: undefined,
    });
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    transactionsQuery.refetch({
      after: pageInfo?.endCursor,
      before: undefined,
      last: undefined,
      first: PAGE_LIMIT,
    });
    setCurrentPage(currentPage - 1);
  };

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
            <RecentTransactions
              transactions={transactions}
              loading={transactionsQuery.loading}
              pageInfo={pageInfo}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              currentPage={currentPage}
            />
          </DataContainer>
        </Content>
      </Container>
    </>
  );
}
