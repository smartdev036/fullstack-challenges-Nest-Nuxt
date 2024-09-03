<template>
    <tr>
        <td class="relative group p-0 h-12">
            <input v-model="user.firstName" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2">
            <ErrorPopup name="firstName" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="user.lastName" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2">
            <ErrorPopup name="lastName" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="user.position" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2">
            <ErrorPopup name="position" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="user.phone" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2">
            <ErrorPopup name="phone" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="user.email" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2">
            <ErrorPopup name="email" :user v-if="user.errors" />
        </td>
        <td class="p-0 w-8 h-12">
            <IconsLoading class="w-8 h-8" v-show="user.isLoading" />
        </td>
    </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
    user: User
}>();

const handleChange = () => {
    const UserStore = useUserStore();
    const id = props.user.id;
    const _user = UserStore.users.find(u => u.id == id);

    if (id != undefined) {
        _user.status = 'edited';
    }
}

</script>
