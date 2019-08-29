<template>
    <div>
        <li class="item">
            <input type="checkbox" v-model="checked" >
            <slot name="item" v-bind="{checked}"></slot>
        </li>


    </div>

</template>

<script>
    export default {
        props: ['item'],
        name: "TodoItem",
        data(){
            return{
                checked: false
            }
        }
    }
</script>

<style scoped>
    .item{
        color: red;
    }
</style>