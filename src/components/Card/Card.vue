<template>
    <transition appear name='slider'>
        <div class="card">
            <div class="all_card">
                <div class="single">
                    <div class="tag">驾驶证</div>
                    <div class="img_wrap" @click="chose">
                        <img class="user_card" src="" alt="">
                        <div class="none">
                            <img src="../../common/img/camara.png" alt="">
                            <p>上传驾驶证</p>
                        </div>
                    </div>
                </div>
                <div class="single">
                    <div class="tag">结婚证</div>
                    <div class="img_wrap" @click="chose">
                        <img class="user_card" src="" alt="">
                        <div class="none">
                            <img src="../../common/img/camara.png" alt="">
                            <p>上传结婚证</p>
                        </div>
                    </div>
                </div>
                <div class="single">
                    <div class="tag">身份证</div>
                    <div class="img_wrap" @click="chose">
                        <img class="user_card" src="" alt="">
                        <div class="none">
                            <img src="../../common/img/camara.png" alt="">
                            <p>上传身份证</p>
                        </div>
                    </div>
                </div>
                <div class="single">
                    <div class="tag">工作证</div>
                    <div class="img_wrap" @click="chose">
                        <img class="user_card" src="" alt="">
                        <div class="none">
                            <img src="../../common/img/camara.png" alt="">
                            <p>上传工作证</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Card",
        data() {
            return {

            }
        },

        methods: {
            //选择图片
            chose() {
                console.log(62, '选择图片')
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider-enter-active, .slider-leave-active 
        transition: all 0.3s
    .slider-enter, .slider-leave-to
        transform: translate3d(100%, 0, 0)
    .card
        width 100%
        height auto
        padding-bottom 1rem
        background #f8f8f8
        .all_card
            width 6.9rem
            height auto
            margin 0 auto
            .single
                width 6.9rem
                height 3.26rem
                margin 0.1rem 0
                border-radius 0.05rem
                .tag
                    width 100%
                    height 0.7rem
                    color #000000
                    font-size 0.3rem
                    line-height 0.7rem
                .img_wrap
                    position relative
                    width 100%
                    height 2.56rem
                    display flex
                    justify-content center
                    align-items center
                    border-radius 0.05rem
                    background-color #ffffff
                    .user_card 
                        width 100%
                        height 100%
                    .none 
                        position absolute
                        width auto
                        height auto
                        color #CCCCCC
                        font-size 0.26rem
                        line-height 0.66rem
                        left 50%
                        top 50%
                        transform translate(-50%, -50%)
                        img 
                            width 0.8rem
                            height 0.64rem
                            display block
                            margin 0 auto

                    



</style>