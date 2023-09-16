import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { User } from '../types'

export function useUsers() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    nextCursor?: number
    users: User[]
  }>(['users'], fetchUsers, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false
  })

  return {
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    isLoading,
    fetchNextPage,
    hasNextPage
  }
}
