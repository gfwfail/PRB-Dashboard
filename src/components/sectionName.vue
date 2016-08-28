<template>
   
<input type="text" v-model="name"  @blur="edit=false" @keyup.enter="edit=false" class="input-lg form-control question-control">

</template>
<script>
    export default {
        data() {
                return {
                    edit: false
                }
            },
            props: {
                name: {
                    twoWay: true
                }
            }
    }
</script>