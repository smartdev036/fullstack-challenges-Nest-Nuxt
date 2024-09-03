import Joi from "joi"

interface User {
    id?: string
    firstName: string
    lastName: string
    position: string
    email: string
    phone: string
    status: 'new' | 'edited' | null
    isLoading: boolean,
    errors?: Record<string, string>
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
        insert() {
            const user: User = {
                id: undefined,
                firstName: '',
                lastName: '',
                position: '',
                phone: '',
                email: '',
                status: 'new',
                isLoading: false
            };

            this.users.unshift(user);
        },
        async get(page: number, limit: number, sortby: 'firstName' | 'lastName' | 'position' = 'firstName', order: 'asc' | 'desc' = 'asc'): Promise<void> {
            const response = await Api.get(`/users?page=${page}&limit=${limit}&sortby=${sortby}&order=${order}`) as Pagination<User>

            for (const user of response.data) {
                user.status = null;
                user.isLoading = false;
            }

            this.data = response;
        },
        async save() {
            const users = this.users.filter(user => user.status != null);

            for (const user of users) {
                try {
                    user.isLoading = true;

                    // delay simulation
                    await new Promise(resolve => setTimeout(resolve, 300)); // Add 1 second delay

                    let postData: Record<string, any> = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        position: user.position,
                        phone: user.phone,
                        email: user.email
                    };

                    postData = this.validate(postData);

                    // Update the user's data based on the state
                    if (user.status == 'edited') {
                        await Api.patch(`/users/${user.id}`, postData);
                    }

                    if (user.status == 'new') {
                        await Api.post('/users', postData);
                    }

                    user.status = null;
                    user.isLoading = false;

                } catch (error: any) {
                    if (error instanceof Joi.ValidationError) {
                        const e = error.details.map((err: any) => ({
                            [err.context.key]: err.message
                        }));
                        user.errors = e.reduce((key, value) => { return { ...key, ...value } }, {});

                        // reset errors after 2 seconds
                        setTimeout(() => {
                            user.errors = undefined;
                        }, 2000);
                    } else {
                        if (error.status == 409) {
                            user.errors = {
                                email: 'Email address is not unique'
                            };
                        }
                        // reset errors after 2 seconds
                        setTimeout(() => {
                            user.errors = undefined;
                        }, 2000);
                    }
                } finally {
                    user.isLoading = false;

                }
            }
        },
        validate(data: Record<string, any>): Record<string, any> {
            const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
            const isUser = Joi.object({
                firstName: Joi.string().trim().required().label('First Name'),
                lastName: Joi.string().trim().required().label('Last Name'),
                position: Joi.string().trim().required().label('Position'),
                phone: Joi.string().trim().required().regex(phoneRegex).label('Phone').messages({
                    'string.pattern.base': 'Phone number must be in the format (XXX) XXX-XXXX'
                }), email: Joi.string().email({ tlds: { allow: false } }).trim().required().label('Email'),
            });

            const result = isUser.validate(data, { abortEarly: false });

            if (result.error) {
                throw result.error;
            } else {
                return result.value;
            }

        }

    }
});
