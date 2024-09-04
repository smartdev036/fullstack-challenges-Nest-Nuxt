<template>
    <tr v-for="n in limit" :key="n">
        <td>
            <div class="skeleton h-6 w-full"></div>
        </td>
        <td>
            <div class="skeleton h-6 w-full"></div>
        </td>
        <td>
            <div class="skeleton h-6 w-full"></div>
        </td>
        <td>
            <div class="skeleton h-6 w-full"></div>
        </td>
        <td>
            <div class="skeleton h-6 w-full"></div>
        </td>
    </tr>
</template>
<script setup lang="ts">
defineProps<{
    limit: number
}>();
</script>
