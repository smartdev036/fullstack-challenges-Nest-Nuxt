<template>
    <div class="flex justify-between items-center gap-2 px-4">
        <div class="flex items-center gap-2">
            <button @click="$emit('prev')" :disabled="page == 1" class="btn btn-sm rounded-full text-xs">« Prev
            </button>
            <button @click="$emit('next')" :disabled="page == total_page" class="btn btn-sm rounded-full text-xs">Next
                »
            </button>
        </div>

        <div class="flex items-center gap-2">
            <div class="text-sm">Rows per page</div>
            <select v-model="_limit" class="select select-sm bg-[#F0F8FF]">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <button class="btn btn-sm rounded-md bg-[#6E7174] text-white">
                {{ from }} - {{ to }}
            </button>
            <div>of</div>
            <button class="btn btn-sm rounded-md bg-[#6E7174] text-white">{{ total_data }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    from: number
    to: number
    total_page: number
    page: number
    total_data: number
    limit: string,
}>()

const emits = defineEmits(['next', 'prev', 'update:limit'])

const _limit = ref(props.limit);

watch(_limit, (newLimit) => {
    emits('update:limit', newLimit);
});

</script>
