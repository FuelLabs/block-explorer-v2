import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PageInfo } from '../../api/__generated__/types';
import { Header } from '../../components/Header';
import { getB56Address, getValidTransactionId, isValidAddress } from '../../utils/address';

import { RecentBlocks } from './RecentBlocks';
import { RecentTransactions } from './RecentTransactions';
import type { HomePageBlock, HomePageTransaction } from './__generated__/operations';
import {
  useHomePageBlocksQuery,
  useHomePageTransactionsQuery,
  useHomePageSearchQuery,
} from './__generated__/operations';
import {
  Container,
  Content,
  DataContainer,
  Input,
  InputContainer,
  SearchIcon,
  SearchNotFound,
  SearchNotValid,
} from './components';

const PAGE_LIMIT = 5;

export default function HomePage() {
  const [blocks, setBlocks] = useState<HomePageBlock[]>([]);
  const [transactions, setTransactions] = useState<HomePageTransaction[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchNotFound, setIsSearchNotFound] = useState(false);
  const timerRef = useRef<number | undefined>();
  const transactionsQuery = useHomePageTransactionsQuery({
    variables: { last: PAGE_LIMIT },
  });
  const blocksQuery = useHomePageBlocksQuery({ variables: { count: 5 } });
  const searchQuery = useHomePageSearchQuery({
    variables: { transaction: '', address: '' },
    fetchPolicy: 'network-only',
  });
  const navigate = useNavigate();

  const searchState = useMemo<{
    isValid: boolean;
    empty: boolean;
  }>(
    () => ({
      // Mark search as valid, when the text inputted has the length;
      // 66 witch indicates a valid hex address or txId
      // or if this is a valid bech32 address
      isValid: searchText.length === 66 || isValidAddress(searchText),
      empty: searchText.length === 0,
    }),
    [searchText]
  );

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

  useEffect(
    () => () => {
      // Clear timeout when component is unmounted
      clearTimeout(timerRef.current);
    },
    []
  );

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

  const showNotFound = (show: boolean) => {
    clearTimeout(timerRef.current);
    setIsSearchNotFound(show);
    if (show) {
      timerRef.current = setTimeout(() => setIsSearchNotFound(false), 5000) as any;
    }
  };

  const handleClickSearch = async () => {
    if (searchState.isValid && !searchState.empty) {
      const result = await searchQuery.refetch({
        transaction: getValidTransactionId(searchText),
        address: getB56Address(searchText),
      });

      if (result.data?.transaction?.id) {
        navigate(`/transaction/${searchText}`);
      } else if (result.data?.transactionsByOwner?.edges?.length) {
        navigate(`/address/${searchText}`);
      } else {
        showNotFound(true);
      }
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSearch();
    }
  };

  const handleInputSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e?.target?.value);
    setIsSearchNotFound(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <InputContainer>
            <Input
              placeholder="Search for transaction / address"
              onChange={handleInputSearchText}
              onKeyPress={handleSearchKeyPress}
            />
            <SearchIcon
              isDisabled={!searchState.isValid}
              onClick={searchState.isValid ? handleClickSearch : undefined}
            />
            {isSearchNotFound && <SearchNotFound>Not Found</SearchNotFound>}
            {!searchState.isValid && !searchState.empty && (
              <SearchNotValid>Text is not a valid TransactionId or Address</SearchNotValid>
            )}
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
