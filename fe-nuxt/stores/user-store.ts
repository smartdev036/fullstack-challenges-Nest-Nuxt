interface User {
    id: string
    firstName: string
    lastName: string
    postition: string
    email: string
    phone: string
    deleted: boolean
    createdAt: string
    updatedAt: string
}

export interface Pagination<T> {
    first: number
    last: number
    next: number | null
    prev: number | null
    page: number
    total_page: number
    total: number
    data: T[]
}

interface UserState {
    data?: Pagination<User>
}


export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        data: undefined
    }),
    getters: {
        users: (state): User[] => state.data ? state.data.data : [],
        first: (state): number => state.data ? state.data.first : 0,
        last: (state): number => state.data ? state.data.last : 0,
        next: (state): number | null => state.data ? state.data.next : null,
        prev: (state): number | null => state.data ? state.data.prev : null,
        page: (state): number => state.data ? state.data.page : 0,
        total_page: (state): number => state.data ? state.data.total_page : 0,
        total: (state): number => state.data ? state.data.total : 0,
    },
    actions: {
        async get(page: number, limit: number): Promise<void> {
            const response = await Api.get(`/users?page=${page}&limit=${limit}`) as Pagination<User>
            this.data = response;
        }
    }
});
