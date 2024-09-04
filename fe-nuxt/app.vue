<template>
    <div class="flex flex-col gap-4 p-6">
        <div class="flex items-center gap-4">
            <div class="grow text-2xl font-bold">User Management</div>
            <button @click="UserStore.insert" class="btn btn-circle">
                <IconsPlus class="h-6" />
            </button>
            <button @click="UserStore.save" class="btn btn-circle">
                <IconsSave class="h-6" />
            </button>
            <button class="btn btn-circle" @click="reset">
                <IconsUndo class="h-6" />
            </button>
        </div>
        <table class="table border-t border border-gray-200">
            <thead>
                <tr>
                    <th @click="doSort('firstName')" class="cursor-pointer">
                        <span class="flex items-center">
                            <span>Firstname</span>
                            <template v-if="sortby == 'firstName'">

                                <IconsArrowUp class="h-4" v-if="order == 'asc'" />
                                <IconsArrowDown class="h-4" v-if="order == 'desc'" />
                            </template>
                        </span>
                    </th>
                    <th @click="doSort('lastName')" class="cursor-pointer">
                        <span class="flex items-center">
                            <span>Lastname</span>
                            <template v-if="sortby == 'lastName'">
                                <IconsArrowUp class="h-4" v-if="order == 'asc'" />
                                <IconsArrowDown class="h-4" v-if="order == 'desc'" />
                            </template>
                        </span>
                    </th>
                    <th @click="doSort('position')" class="cursor-pointer">
                        <span class="flex items-center">
                            <span>Position</span>
                            <template v-if="sortby == 'position'">
                                <IconsArrowUp class="h-4" v-if="order == 'asc'" />
                                <IconsArrowDown class="h-4" v-if="order == 'desc'" />
                            </template>
                        </span>
                    </th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="UserStore.data" v-for="(user, i) in UserStore.users" :key="i">
                    <UserRow :user="user" />
                </template>
                <UserRowSkeleton v-else :limit="limit" />
            </tbody>
        </table>

        <Pagination :first :last :next :prev :page :total_page :total v-model:limit="limit" @prev="prevPage"
            @next="nextPage" />
    </div>
</template>

<script setup lang="ts">
const UserStore = useUserStore();

const route = useRoute();
const page = ref<number>(route.query.page ? parseInt(route.query.page as string) : 1);
const limit = ref<number>(parseInt(route.query.limit as string) || 10);

const { first, last, next, prev, total_page, total } = storeToRefs(UserStore);

const sortby = ref<SortByOption>(route.query.sortby as SortByOption || 'firstName');
const order = ref<OrderByOption>(route.query.order ? route.query.order as OrderByOption : 'asc');

const getData = async (initial = false) => {
    const _page = page.value;
    const _limit = limit.value;

    if (!initial) {
        updateQuery({
            limit: _limit,
            page: _page,
            sortby: sortby.value,
            order: order.value,
        });
    }

    UserStore.get(_page, _limit, sortby.value, order.value);
}

const doSort = (by: 'firstName' | 'lastName' | 'position') => {
    const currentSort = sortby.value;
    const currentOrder = order.value;
    order.value = currentSort == by ? (currentOrder == 'asc' ? 'desc' : 'asc') : 'asc';
    sortby.value = by;

    getData();
}

const prevPage = () => {
    if (prev.value) {
        page.value = prev.value;
        getData();
    }
}

const nextPage = () => {
    if (next.value) {
        page.value = next.value;
        getData();
    }
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

const reset = () => {
    sortby.value = 'firstName';
    order.value = 'asc';
    page.value = 1
    limit.value = 10;
    getData();
}
</script>
