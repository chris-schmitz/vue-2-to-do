<template>
    <div id="app">
        <headline></headline>
        <div class="content">
            <status></status>
            <task-list></task-list>
            <transition name="slide-in-right">
                <task-detail v-if="taskSelected"></task-detail>
            </transition>
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
        },
        methods:{
            handleErrantResponse(response){
                alert(response.data.message)
            },
            handleSucessfulResponse(response){
                Store.setTasks(response.data.payload.tasks)
            }
        },
        created(){
            this.$http.get('tasks')
                .then(response => {
                    if(response.ok === undefined || !response.ok){
                        this.handleErrantResponse(response)
                    } else {
                        this.handleSucessfulResponse(response)
                    }
                })
                .catch(response => {
                    this.handleErrantResponse(response)
                    console.error(response)
                })
        }
    }
</script>

<style lang="scss">
    @import './style/_variables.scss';

    * {
        box-sizing: border-box;
    }
    
    #app{
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



    .slide-in-right-enter-active {
        transition: all .5s ease;
    }

    .slide-in-right-leave-active {
        transition: all .5s ease;
    }

    .slide-in-right-enter, .slide-in-right-leave-active {
        transform: translateX(100%);
    }
</style>
