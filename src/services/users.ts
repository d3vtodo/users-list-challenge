export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return fetch(
    `https://randomuser.me/api?results=10&seed=devtodo&page=${pageParam}`
  )
    .then(async (res) => await res.json())
    .then((res) => {
      const currentPage: number = res.info.page
      const nextPage = currentPage > 2 ? undefined : currentPage + 1
      return {
        users: res.results as User[],
        nextCursor: nextPage
      }
    })
}
