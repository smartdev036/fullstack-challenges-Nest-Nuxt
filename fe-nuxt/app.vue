<template>
    <div class="flex flex-col gap-4 p-6">
        <div class="flex justify-end gap-4">
            <button @click="UserStore.insert">
                <IconsPlus class="h-6" />
            </button>
            <button @click="UserStore.save">
                <IconsSave class="h-6" />
            </button>
            <button>
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
                <template v-for="(user, i) in UserStore.users" :key="i">
                    <UserRow :user="user" />
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
const sortby = ref<'firstName' | 'lastName' | 'position'>(route.query.sortby ? route.query.sortby : 'firstName');
const order = ref<string>(route.query.order ? route.query.order : 'asc');

const getData = async (initial = false) => {
    const _page = parseInt(page.value);
    const _limit = parseInt(limit.value);

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

const doSort = (by: string) => {
    const currentSort = sortby.value;
    const currentOrder = order.value;
    order.value = currentSort == by ? (currentOrder == 'asc' ? 'desc' : 'asc') : 'asc';
    sortby.value = by;

    getData();
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
