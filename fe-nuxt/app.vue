<template>
    <div class="p-6">
        <table class="table">
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
    </div>
</template>

<script setup lang="ts">
const UserStore = useUserStore();

const getData = async () => {
    UserStore.get();
}

getData();
</script>
