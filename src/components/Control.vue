<template>
    <div class="control-container">
        <span class="username"></span>
        <ul class="status-selection">
            <li>Filter by status:</li>
            <li v-for="status in availableStatuses">
                <a href="#" :class="{'activeStatus': activeStatus === status}" class="status-link" @click="filterByStatus(status)">{{ status }}</a>
            </li>

        </ul>
        <div><button class="add-button fa fa-plus"></button></div>
    </div>
</template>

<script>
    import Store from './Store'

    module.exports = {
        data(){
            return {}
        },
        computed:{
            activeStatus:{
                get(){
                    return Store.getActiveStatus()
                },
                set(status){
                    Store.setActiveStatus(status)
                }
            },
            availableStatuses(){
                return Store.getAvailableStatuses()
            }
        },
        methods:{
            filterByStatus(status){
                this.activeStatus = status
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .status-link{
        color: $white;
    }

    .control-container{
        color: $white;
        flex: 0 0 50px;
        padding: 0 20px 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $blue;
        border:1px solid $darkBlue;
        // background-color: $darkBlue;
    }

    .status-selection{
        display:flex;
        list-style: none;

        > * {
            margin: 0 10px 0 10px;

            a{
                text-decoration: none;
            }
            .activeStatus{
                font-weight: bold;
                text-decoration: underline;
            }
        }
    }

    .add-button{
        background:none;
        outline:none;
        border:none;
        font-size:30px;
        color:$white;
    }
</style>
