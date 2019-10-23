<template>
    <div class="modify">
        <div class="inner">
            <div class="single">
                <div class="tag">主车牌号</div>
                <div class="value" @click="modify">
                    <div class="car_num">京A11111</div>
                    <img src="../../common/img/right.png" alt="">
                </div>
            </div>
            <div class="single">
                <div class="tag">副车牌号</div>
                <div class="value" @click="modify">
                    <div class="car_num none">增加</div>
                    <img src="../../common/img/right.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modify",
        data() {
            return {

            }
        },

        methods: {
            modify() {
                this.$router.push({
                    path: "/ModifyCard"
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .modify 
        width 100%
        height auto
        padding-top 0.2rem
        .inner 
            width 6.9rem
            height 2.1rem
            background-color #ffffff
            border-radius 0.05rem
            margin 0 auto
            padding 0 0.31rem
            display flex
            flex-direction column
            justify-content space-between
            .single
                width 100%
                height 0.92rem
                font-size 0.3rem
                line-height 0.92rem
                display flex
                justify-content space-between
                .tag
                    color #000000
                .value 
                    color #666666
                    font-size 0.28rem
                    display flex
                    align-items center
                    .car_num
                        color #ffffff
                        background #3385EC
                        width auto
                        height 0.46rem
                        line-height 0.46rem
                        padding 0 0.25rem
                        border-radius 0.05rem
                    img
                        width 0.16rem
                        height 0.26rem
                        margin-left 0.14rem
                    .none
                        color #3385EC
                        background none
                        border 1px solid #3385EC
</style>