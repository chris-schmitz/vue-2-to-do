<template>
    <div class="task-list-container">
        list
    </div>
</template>

<script>
    import TaskDetail from './TaskDetail.vue'
    module.exports = {
        components:{TaskDetail},
        data(){
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .task-list-container{
        flex: 1;
        background-color: $blue;
    }
</style>
