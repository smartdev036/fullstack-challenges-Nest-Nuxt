<template>
    <div v-if="user.errors.hasOwnProperty(name)"
        class="absolute z-20 bg-error text-white rounded-lg shadow p-2 -bottom-8">
        {{ user.errors[name] }}
    </div>
</template>

<script setup lang="ts">

defineProps<{
    user: User,
    name: string
}>();
</script>
