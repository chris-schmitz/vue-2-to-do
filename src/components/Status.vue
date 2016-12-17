<template>
    <div class="status-container" @click="cycle">
        <div class="status-text">{{ activeStatus }}</div>
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
            }
        }
        ,methods:{
            cycle(){
                this.activeStatus = 'In Progress'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .status-container{
        flex: 0 0 100px;
        background-color: $green;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .status-text{
        -webkit-transform: rotate(-90deg);
        text-align: center;
        font-size: 25px; 
    }
</style>
