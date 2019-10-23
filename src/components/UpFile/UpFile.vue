<template>
    <div class="upfile">
        <img class="logo" src="../../common/img/logo.png" alt="">
        <div class="note">提示：下列带“*”符号的为必填项，其他资料请根据校方需要进行上传。若是您办理的车辆是您配偶的车辆请上传结婚证，否则将无法通过审核。</div>
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
        </div>
        <div class="shadow" v-show="show">
            <div class="inner">
                <p>确认您的信息填写无误，订单提交后，请等待审核短信通知。</p>
                <div class="button_wrap">
                    <div @click="cancle">取消</div>
                    <div class="ensure" @click="ensureBtn">确定</div>
                </div>
            </div>
        </div>
        <div class="submit" @click="submit">上传并提交申请</div>
    </div>
</template>

<script>
    export default {
        name: "UpFile",
        data() {
            return {
                show: false
            }
        },

        methods: {
            //选择
            chose() {
                console.log(61, 'chose')
            },

            //提交
            submit() {
                console.log(48, 'tijiao')
                this.show = true
            },
            cancle() {
                this.show = false
            },
            ensureBtn() {
                this.show = false
                this.$router.push({
                    path: '/Home'
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .upfile 
        width 100%
        height auto
        .logo
            width 3.61rem
            height 0.73rem
            display block
            margin 0.31rem auto 0.48rem
        .note 
            width 6.91rem
            height auto
            color #FF444A
            font-size 0.21rem
            line-height 0.3rem
            margin 0 auto
        .all_card
            width 6.9rem
            height auto
            margin 0.27rem auto 0
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
        .shadow 
            position fixed
            width 100%
            height 100%
            top: 0
            background-color rgba(0, 0, 0, 0.4)
            border-radius 0.05rem
            .inner 
                position absolute
                width 4.7rem
                height 2.9rem
                top 50%
                left 50%
                padding-top 0.6rem
                transform translate(-50%, -50%)
                background-color #ffffff
                p 
                    color #000000
                    font-size 0.3rem
                    line-height 0.42rem
                    padding 0 0.2rem
                .button_wrap 
                    width 3.2rem
                    height 0.55rem
                    display flex
                    justify-content space-between
                    margin 0.72rem auto 0
                    div 
                        width 1.5rem
                        height 100%
                        color #3385EC
                        font-size 0.3rem 
                        line-height 0.55rem
                        text-align center
                        border 1px solid #3385EC
                        border-radius 0.05rem
                    .ensure 
                        background #3385EC
                        color #ffffff
                        box-shadow 0 0 0.2rem #3385ec
        .submit
            width 6.3rem
            height 0.85rem
            color #ffffff
            font-size 0.3rem
            line-height 0.85rem
            text-align center
            background-color #3385EC
            border-radius 0.05rem
            margin 1.31rem auto
            box-shadow 0 0 0.2rem #3385ec

</style>