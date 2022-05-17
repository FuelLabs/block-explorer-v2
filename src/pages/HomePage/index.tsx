import { useEffect, useState } from 'react';

import type { PageInfo } from '../../api/__generated__/types';
import { Header } from '../../components/Header';

import { RecentBlocks } from './RecentBlocks';
import { RecentTransactions } from './RecentTransactions';
import type { HomePageBlock, HomePageTransaction } from './__generated__/operations';
import {
  useHomePageBlocksQuery,
  useHomePageTransactionsQuery,
  useHomePageSearchQueryLazyQuery,
} from './__generated__/operations';
import {
  Container,
  Content,
  DataContainer,
  Input,
  InputContainer,
  SearchIcon,
  SearchNotFound,
} from './components';

const PAGE_LIMIT = 5;

export default function HomePage() {
  const [blocks, setBlocks] = useState<HomePageBlock[]>([]);
  const [transactions, setTransactions] = useState<HomePageTransaction[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchNotFound, setIsSearchNotFound] = useState(false);
  const transactionsQuery = useHomePageTransactionsQuery({
    variables: { last: PAGE_LIMIT },
  });
  const blocksQuery = useHomePageBlocksQuery({ variables: { count: 5 } });
  const [searchTransactionQuery, { loading, error, data: searchTransactionData }] =
    useHomePageSearchQueryLazyQuery({
      variables: { transaction: '', address: '' },
      fetchPolicy: 'network-only',
    });

  const isAllowedToSearch = searchText.length === 66;

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

  const handleClickSearch = async () => {
    if (isAllowedToSearch && searchText) {
      const result = await searchTransactionQuery({ variables: { transaction: searchText, address: searchText } });

      console.log(`result.data`, result.data);

      if (result.data?.transaction?.id) {
        window.location.assign(`/transaction/${searchText}`);

      } else if (result.data?.transactionsByOwner?.edges?.length) {
        window.location.assign(`/address/${searchText}`);

      } else {
        setIsSearchNotFound(true);
        setTimeout(() => setIsSearchNotFound(false), 1500);
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <InputContainer>
            <Input
              placeholder="Search for a transaction"
              onChange={(e) => setSearchText(e?.target?.value)}
            />
            <SearchIcon
              isDisabled={!isAllowedToSearch}
              onClick={isAllowedToSearch ? handleClickSearch : undefined}
            />
            {isSearchNotFound && <SearchNotFound>Not Found</SearchNotFound>}
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
