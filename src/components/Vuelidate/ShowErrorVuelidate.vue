<!-- Show Error for Vuelidate -->
<!-- Use : <ShowErrorVuelidate :isError="" :errors="" />-->
<script setup>
const props = defineProps({
    isError: Boolean,
    errors: Array
})

</script>
<template>
    <span v-if="isError">
        <div v-for="error of errors" :key="error.$uid">
            <div><small class="p-error">{{error.$message}}</small></div>
        </div>
    </span>
</template>