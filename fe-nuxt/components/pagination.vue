<template>
    <div class="flex max-md:flex-col justify-between items-center gap-2 px-4">
        <div class="flex items-center gap-2">
            <button @click="$emit('prev')" :disabled="prev == null" class="btn rounded-full text-white bg-[#6E7174]">«
                Prev
            </button>
            <button @click="$emit('next')" :disabled="next == null"
                class="btn rounded-full text-white bg-[#6E7174]">Next
                »
            </button>
        </div>

        <div class="flex max-md:flex-col items-center gap-2 font-medium">
            <div class="flex gap-2 items-center">
                <div class="text-sm">Rows per page</div>
                <select v-model="_limit" class="select bg-[#F0F8FF]">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div class="flex gap-2 items-center">
                <button class="px-4 py-2 rounded-full bg-[#6E7174] text-white">
                    {{ first }} - {{ last }}
                </button>
                <div>of</div>
                <button class="px-4 py-2 rounded-full bg-[#6E7174] text-white">{{ total }}</button>
            </div>
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
    limit: number,
}>()

const emits = defineEmits(['next', 'prev', 'update:limit'])

const _limit = ref<number>(10);

watchEffect(() => {
    _limit.value = props.limit;
});

watch(_limit, (newLimit) => {
    emits('update:limit', newLimit);
});

</script>
