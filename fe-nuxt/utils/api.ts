type ApiMethod = (path: string, data: Record<string, any> | FormData) => Promise<unknown>;

export interface ApiInterface {
    get: (path: string) => Promise<unknown>
    post: ApiMethod
    put: ApiMethod
    patch: ApiMethod
    remove: (path: string) => Promise<unknown>
}

export const Api: ApiInterface = {
    get: async (path: string) => {
        const apiUri = useRuntimeConfig().public.apiUri;
        try {
            const data = await $fetch(apiUri + path, {
                method: 'GET',
            });

            // RETURN DATA
            return data
        } catch (error) {
            throw error;
        }
    },
    post: async (path: string, data: Record<string, any> | FormData) => {
        const apiUri = useRuntimeConfig().public.apiUri;
        const body = !(data instanceof FormData)
            ? JSON.stringify(data)
            : data

        try {
            const response = await $fetch(apiUri + path, {
                method: 'POST',
                body,
            });

            // RETURN DATA
            return response
        } catch (error) {
            throw error;
        }
    },
    put: async (path: string, data: Record<string, any> | FormData) => {
        const apiUri = useRuntimeConfig().public.apiUri;
        const body = !(data instanceof FormData)
            ? JSON.stringify(data)
            : data

        try {
            const response = await $fetch(apiUri + path, {
                method: 'PUT',
                body,
            });

            // RETURN DATA
            return response
        } catch (error) {
            throw error;
        }
    },
    patch: async (path: string, data: Record<string, any> | FormData) => {
        const apiUri = useRuntimeConfig().public.apiUri;
        const body = !(data instanceof FormData)
            ? JSON.stringify(data)
            : data

        try {
            const response = await $fetch(apiUri + path, {
                method: 'PATCH',
                body,
            });

            // RETURN DATA
            return response
        } catch (error) {
            throw error;
        }
    },
    remove: async (path: string) => {
        const apiUri = useRuntimeConfig().public.apiUri;
        try {
            const data = await $fetch(apiUri + path, {
                method: 'DELETE',
            });

            // RETURN DATA
            return data
        } catch (error) {
            throw error;
        }
    }

};
