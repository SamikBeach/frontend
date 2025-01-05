import { useState } from 'react';
import RecentSearchList from './RecentSearchList';
import SearchResultList from './SearchResultList';

export default function SearchBarDialogContent() {
  // TODO: jotai atom으로 변경
  const [searchValue, _] = useState('');

  if (searchValue === '') {
    return <RecentSearchList />;
  }

  return <SearchResultList />;
}
