import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import memoize from 'memoize';
import { FC, MutableRefObject, useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  isDatLengthSame: boolean;
  containerRef: MutableRefObject<HTMLElement | undefined>;
  isFetching: boolean;
  inverse?: boolean;
  roomId?: string;
}

const CommonInfiniteScroll: FC<IProps> = ({
  children,
  containerRef,
  fetchNextPage,
  isDatLengthSame,
  isFetching,
  inverse = false,
  roomId
}) => {
  const [offSet, setOffSet] = useState<number>(0);
  useEffect(() => {
    if (!roomId) return;
    setOffSet(0);
  }, [roomId]);

  const getNextPageOfNote = memoize(
    () => {
      const nextOffset = offSet + 30;
      setOffSet(nextOffset);
      fetchNextPage({ pageParam: nextOffset });
    },
    { maxAge: 500 }
  );

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef?.current;
      const positionInPercentage =
        ((container?.clientHeight ?? 0) + (container?.scrollTop ?? 0)) *
        (100 / (container?.scrollHeight ?? 1));
      if (!isFetching && !isDatLengthSame && inverse && positionInPercentage < 20) {
        getNextPageOfNote();
      }
      if (!isFetching && !isDatLengthSame && !inverse && positionInPercentage > 80) {
        getNextPageOfNote();
      }
    };
    const container = containerRef?.current;

    if (containerRef?.current) {
      containerRef.current.addEventListener('scroll', handleScroll); //throttle handle scroll before release
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, containerRef, fetchNextPage, offSet, isDatLengthSame]);
  return <>{children}</>;
};

export default CommonInfiniteScroll;
