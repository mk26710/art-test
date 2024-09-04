type PaginationWindowOptions = {
  currentPage: number;
  maxPage: number;
  windowSize?: number;
};

export const paginatorWindow = (opt: PaginationWindowOptions): number[] => {
  const { currentPage, maxPage, windowSize = 5 } = opt;
  const halfWindow = Math.floor(windowSize / 2);

  let startPage: number;
  let endPage: number;

  if (currentPage <= halfWindow + 1) {
    startPage = 1;
    endPage = Math.min(windowSize, maxPage);
  } else if (currentPage >= maxPage - halfWindow) {
    startPage = Math.max(1, maxPage - windowSize + 1);
    endPage = maxPage;
  } else {
    startPage = currentPage - halfWindow;
    endPage = currentPage + halfWindow;
  }

  startPage = Math.max(1, startPage);
  endPage = Math.min(maxPage, endPage);

  const paginationWindow: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationWindow.push(i);
  }

  return paginationWindow;
};
