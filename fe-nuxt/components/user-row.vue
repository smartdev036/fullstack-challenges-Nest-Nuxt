<template>
    <tr>
        <td>
            <input v-model="user.firstName" @keyup="handleChange" class="focus:outline-0">
        </td>
        <td>
            <input v-model="user.lastName" @keyup="handleChange" class="focus:outline-0">
        </td>
        <td>
            <input v-model="user.position" @keyup="handleChange" class="focus:outline-0">
        </td>
        <td>
            <input v-model="user.phone" @keyup="handleChange" class="focus:outline-0">
        </td>
        <td>
            <input v-model="user.email" @keyup="handleChange" class="focus:outline-0">
        </td>
        <td>
            <IconsLoading class="w-8 h-8" v-show="user.isLoading" />
            <div class="w-8 h-8" v-if="!user.isLoading"></div>
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
