import { useState } from 'react';

import { IList } from 'components/common/interface/list.interface';
import useDebounce from 'components/common/useDebounce';

export const useTableParams = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const searchDebounce = useDebounce(searchValue);
  const [args, setArgs] = useState<IList>({
    limit: 10,
    page: 1,
    sort_by: '',
    sort_order: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    setArgs({ ...args, page: 1 });
  };
  return {
    searchDebounce,
    setArgs,
    args,
    onChange
  };
};
