<template>
    <div class="flex justify-between items-center gap-2 px-4">
        <div class="flex items-center gap-2">
            <button @click="$emit('prev')" :disabled="prev == null"
                class="btn btn-sm rounded-full text-white text-xs bg-[#6E7174]">« Prev
            </button>
            <button @click="$emit('next')" :disabled="next == null"
                class="btn btn-sm rounded-full text-white text-xs bg-[#6E7174]">Next
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
            <button class="badge badge-lg rounded-full bg-[#6E7174] text-white">
                {{ first }} - {{ last }}
            </button>
            <div>of</div>
            <button class="badge badge-lg rounded-full bg-[#6E7174] text-white">{{ total }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    first: number
    last: number
    next: number | null
    prev: number | null
    page: number
    total_page: number
    total: number
    limit: string,
}>()

const emits = defineEmits(['next', 'prev', 'update:limit'])

const _limit = ref(props.limit);

watch(_limit, (newLimit) => {
    emits('update:limit', newLimit);
});

</script>
