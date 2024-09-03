<template>
    <tr>
        <td class="relative group p-0 h-12">
            <input v-model="form.firstName" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2"
                :class="{ 'bg-green-300': form.firstName != user.firstName, 'bg-red-300': user.errors && user.errors.hasOwnProperty('firstName') }">
            <ErrorPopup name="firstName" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="form.lastName" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2"
                :class="{ 'bg-green-300': form.lastName != user.lastName, 'bg-red-300': user.errors && user.errors.hasOwnProperty('lastName') }">
            <ErrorPopup name="lastName" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="form.position" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2"
                :class="{ 'bg-green-300': form.position != user.position, 'bg-red-300': user.errors && user.errors.hasOwnProperty('position') }">
            <ErrorPopup name="position" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="form.phone" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2"
                :class="{ 'bg-green-300': form.phone != user.phone, 'bg-red-300': user.errors && user.errors.hasOwnProperty('phone') }">
            <ErrorPopup name="phone" :user v-if="user.errors" />
        </td>
        <td class="relative p-0 h-12">
            <input v-model="form.email" @keyup="handleChange"
                class="focus:outline-0 focus:border-b-2 focus:border-b-blue-400 w-full h-full px-2"
                :class="{ 'bg-green-300': form.email != user.email, 'bg-red-300': user.errors && user.errors.hasOwnProperty('email') }">
            <ErrorPopup name="email" :user v-if="user.errors" />
        </td>
        <td class="p-0 w-8 h-12">
            <IconsLoading class="w-8 h-8" v-show="user.isLoading" />
        </td>
    </tr>
</template>

<script setup lang="ts">
const UserStore = useUserStore();
const props = defineProps<{
    user: User
}>();

const form = ref<Record<string, any>>({
    id: "",
    firstName: "",
    lastName: "",
    position: "",
    phone: "",
    email: "",
});

watchEffect(() => {
    form.value = {
        id: props.user.id,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        position: props.user.position,
        phone: props.user.phone,
        email: props.user.email,
    };
});

const handleChange = () => {
    const id = props.user.id;
    if (!isChange()) return;

    if (props.user.status != 'new') {
        props.user.status = 'edited';
    }

    const index_updated_list = UserStore.update_data.findIndex(u => u.id == id);

    if (index_updated_list == -1) {
        UserStore.update_data.push(form.value);
    } else {
        UserStore.update_data[index_updated_list] = form.value;
    }
}

const isChange = () => {
    return form.value.firstName != props.user.firstName ||
        form.value.lastName != props.user.lastName ||
        form.value.position != props.user.position ||
        form.value.phone != props.user.phone ||
        form.value.email != props.user.email;
}

</script>
