<template>
    <div id="app">
        <healine></healine>
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
#app{}
</style>
