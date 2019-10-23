<template>
    <div class="modify">
        <div class="info">
            <p class="status">使用中</p>
            <div class="single">
                <div class="tag">车证类型</div>
                <div class="value">C类</div>
            </div>
            <div class="single">
                <div class="tag">产品类型</div>
                <div class="value">年包卡</div>
            </div>
            <div class="single">
                <div class="tag">主车牌号</div>
                <div class="value">
                    <div class="car_num">京A11111</div>
                </div>
            </div>
            <div class="single">
                <div class="tag">副车牌号</div>
                <div class="value">
                    <div class="car_num none">无</div>
                </div>
            </div>
            <div class="single">
                <div class="tag">使用期限</div>
                <div class="value">2019.02.04-2019.09.23</div>
            </div>
        </div>
        <div class="modify_button" @click="modifyInfo">修改车牌信息</div>
    </div>
</template>

<script>
    export default {
        name: 'Modify',
        data() {
            return {

            }
        },

        methods: {
            modifyInfo() {
                this.$router.push({
                    path: '/Modify'
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .modify 
        width 100%
        height auto
        padding-top 0.24rem
        .info
            width 6.9rem
            height auto
            margin 0 auto
            background #ffffff
            padding 0.19rem 0.3rem
            border-radius 0.05rem
            .status
                color #3385EC
                font-size 0.3rem
                line-height 0.68rem
            .single
                width 100%
                height 0.68rem
                font-size 0.3rem
                line-height 0.68rem
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
                    .none
                        color #3385EC
                        background none
                        border 1px solid #3385EC
        .modify_button
            width 6.3rem
            height 0.85rem
            color #ffffff
            font-size 0.3rem
            text-align center
            line-height 0.85rem
            background-color #3385EC
            border-radius 0.05rem
            margin 4.6rem auto 0
            box-shadow 0 0 0.2rem #3385ec
</style>        