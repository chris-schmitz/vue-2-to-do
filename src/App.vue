<template>
    <div id="app">
        <headline></headline>
        <div class="content">
            <status></status>
            <task-list></task-list>
        </div>
        <control></control>
    </div>
</template>

<script>
    import Headline from './components/Headline.vue'
    import Status from './components/Status.vue'
    import TaskList from './components/TaskList.vue'
    import Control from './components/Control.vue'

    export default {
        name: 'app',
        components:{Headline, Status, TaskList, Control},
        data () {
            return {}
        }
    }
</script>

<style>
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
        // justify-content: space-between;
    }
</style>
