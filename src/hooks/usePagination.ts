import { useState } from 'react'
import { Pagination } from 'src/components/ui/Pagination'

export const usePagination = (initialState:any) => {
  const { page: initialPage = 1, limit: initialLimit = 10, total = 10 } = initialState || {}

  const [page, setPage] = useState(parseInt(initialPage))
  const [limit, setLimit] = useState(parseInt(initialLimit))

  const totalPages = Math.ceil(total / limit)
  const disablePrevPage = page <= 1
  const disableNextPage = page === totalPages
  const gotoPrevPage = () => {
    if (disablePrevPage) return
    setPage(page - 1)
  }
  const gotoNextPage = () => {
    if (disableNextPage) return
    setPage(page + 1)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const paginationProps = {
    page,
    setPage: (page:any) => {
      page > 1 ? setPage(page) : setPage(1)
    },
    limit,
    setLimit: (limit:any) => {
      limit > 1 ? setLimit(limit) : setLimit(10)
      setPage(1)
    },
    total,
    disablePrevPage,
    disableNextPage,
    gotoPrevPage,
    gotoNextPage,
    pageNumbers,
  }

  return {
    ...paginationProps,
    Pagination: (props: any) => Pagination({ ...paginationProps, ...props }),
  }
}

export default usePagination
