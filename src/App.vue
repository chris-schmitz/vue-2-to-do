<template>
    <div id="app">
        <headline></headline>
        <div class="content">
            <status></status>
            <task-list></task-list>
            <task-detail v-if="taskSelected"></task-detail>
        </div>
        <control></control>
    </div>
</template>

<script>
    import Headline from './components/Headline.vue'
    import Status from './components/Status.vue'
    import TaskList from './components/TaskList.vue'
    import Control from './components/Control.vue'
    import TaskDetail from './components/TaskDetail.vue'
    import Store from './components/Store'

    export default {
        name: 'app',
        components:{Headline, Status, TaskList, Control, TaskDetail},
        data () {
            return {
                sharedState: Store.state
            }
        },
        computed:{
            taskSelected(){
                return this.sharedState.tasks.selected !== null
            }
        }
    }
</script>

<style>
    *{
        box-sizing: border-box;
    }
    #app{
        background-color:red;
        height:100%;
        width:100%;
        display: flex;
        flex-direction: column;
    }

    .content{
        flex:1;
        display: flex;
        position: relative;
        // justify-content: space-between;
    }
</style>
