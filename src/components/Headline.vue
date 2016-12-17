<template>
    <div class="headline-container">
        <img src="dist/logo.png">
        <notification v-show="showNotification"></notification>
    </div>
</template>

<script>
    import Notification from './Notification.vue'
    import Store from './Store'

    module.exports = {
        components:{Notification},
        data(){
            return {
                sharedState: Store.state
            }
        },
        computed:{
            showNotification(){
                return this.sharedState.notification.show
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';
    $containerHeight:75px;

    .headline-container{
        flex: 0 0 $containerHeight;
        background-color: $darkBlue;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img{height: $containerHeight; padding:10px;}
    }
</style>
