<template>
    <div class="flex flex-col gap-4 p-6">
        <table class="table border-t border border-gray-200">
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Position</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="user in UserStore.users" :key="user.id">
                    <tr>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.position }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </template>
            </tbody>
        </table>

        <Pagination :first :last :next :prev :page :total_page :total v-model:limit="limit"
            @prev="page = prev; getData()" @next="page = next; getData()" />
    </div>
</template>

<script setup lang="ts">
const UserStore = useUserStore();

const route = useRoute();
const page = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const limit = ref<string>(route.query.limit as string || '10');

const { first, last, next, prev, total_page, total } = storeToRefs(UserStore);

const getData = async (initial = false) => {
    const _page = parseInt(page.value);
    const _limit = parseInt(limit.value);

    console.log({ _limit })
    console.log({ _page })

    if (!initial) {
        updateQuery({
            limit: _limit,
            page: _page,
        });
    }


    UserStore.get(_page, _limit);
}

// Updates the URL query parameters with the provided new query object.
const router = useRouter();
const updateQuery = (newQuery: Record<string, any>) => {
    router.push({
        path: route.path,
        query: { ...route.query, ...newQuery }
    });
};

// Watches the `limit.value` reactive reference and updates the query parameters in the URL when the limit changes
watch(() => limit.value, (newLimit) => {
    if (newLimit) {
        updateQuery({ limit: newLimit, page: 1 });
    }
    getData();
});

// initial fetch
getData(true);
</script>
