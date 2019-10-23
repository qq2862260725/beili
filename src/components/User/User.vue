<template>
    <div class="user">
        <div class="info">
            <div class="single">
                <div class="tag">车主姓名</div>
                <div class="value">
                    <input type="text" v-model="name">
                </div>
            </div>
            <div class="single">
                <div class="tag">手机号</div>
                <div class="value">
                    <input type="text" v-model="phone">
                </div>
            </div>
            <div class="single">
                <div class="tag">主车牌号</div>
                <div class="value" @click="navModify">
                    <div class="car_num">{{carNum}}</div>
                    <img src="../../common/img/right.png" alt="">
                </div>
            </div>
            <div class="single">
                <div class="tag">副车牌号</div>
                <div class="value" @click="navModify">
                    <div class="car_num none">{{carNumSec ? carNumSec : '增加'}}</div>
                    <img src="../../common/img/right.png" alt="">
                </div>
            </div>
        </div>
        <div class="my_card" @click="MyCard">
            <div class="tag">我的证件</div>
            <img src="../../common/img/right.png" alt="">
        </div>
        <div class="note_wrap" v-show="showNote">
            <note :note="note"></note>
        </div>
        <div class="button">
            <div class="ensure" @click="ensureBtn">确定</div>
            <div class="cancle" @click="cancleBtn">取消</div>
        </div>
    </div>
</template>

<script>
    import storage from 'good-storage'
    import { userInfo, modifyInfo } from 'api/user'
    import Note from 'base/note/note'
    

    export default {
        name: "User",
        data() {
            return {
                userId: storage.get('userId'),
                carNum: '',
                name: '',
                phone: '',
                carNumSec: '',
                note: '',
                showNote: false
            }
        },

        created() {
            this.getInfo()
        },

       methods: {
            //note
            noteFn(text) {
                this.note = text
                this.showNote = true
                setTimeout(() => {
                    this.showNote = false
                }, 2000)
            },

            //获取用户信息
            getInfo() {
                userInfo(this.userId).then(res => {
                    if(res.code == 1) {
                        let resData = res.data
                        this.carNum = resData.car_num
                        this.name = resData.name
                        this.phone = resData.phone
                        this.carNumSec = resData.second_car_num
                    } else {
                        this.noteFn(res.msg)
                    }
                })
            },

            //修改新增车牌号
            navModify() {
                this.$router.push({
                    path: '/ModifyCard'
                })
            },


            //跳转我的证件
            MyCard() {
                this.$router.push({
                    path: '/Card'
                })
            },

            //取消修改
            cancleBtn() {
                this.$router.back()
            },

            //确认修改
            ensureBtn() {
                let phoneReg = /^1[3456789]\d{9}$/
                let userId = this.userId;
                let name = this.name;
                let phone = this.phone
                if(name == '') {
                    this.noteFn('请输入姓名')
                } else if(name.length > 10) {
                    this.noteFn('姓名不能大于10位')
                } else if(phone == '') {
                    this.noteFn('请输入手机号')
                } else if(!phoneReg.test(phone)) {
                    this.noteFn('手机号输入错误')
                } else {
                    modifyInfo(userId, name, phone).then(res => {
                        if(res.code == 1) {
                            this.noteFn(res.msg)
                            this.getInfo()
                        } else {
                            this.noteFn(res.msg)
                        }
                    })
                }
           }
       },

       components: {
            Note,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .user
        position fixed
        width 100%
        height auto
        top 0
        padding-top 0.23rem
        .note_wrap
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
            display flex
            justify-content center
            align-items center
        .info
            width 6.9rem
            height auto
            margin 0 auto
            padding 0.1rem 0.3rem 
            background #ffffff
            .single
                width 100%
                height 0.68rem
                line-height 0.68rem
                display flex
                justify-content space-between
                .tag    
                    color #000000
                    font-size 0.3rem
                .value
                    width 4rem
                    color #666666
                    font-size 0.28rem
                    display flex
                    justify-content flex-end
                    align-items center
                    input 
                        width 100%
                        height 100%
                        font-size 0.28rem
                        text-align right
                    img 
                        width 0.16rem 
                        height 0.26rem
                        margin-left 0.14rem
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
        .my_card
            width 6.9rem
            height 0.85rem
            margin 0.2rem auto
            background #ffffff
            display flex
            align-items center
            justify-content space-between
            padding 0 0.3rem
            color #000000
            font-size 0.3rem 
            line-height 0.85rem
            border-radius 0.05rem
            img     
                width 0.16rem 
                height 0.26rem
        .button
            width 100%;
            height 0.75rem
            display flex
            margin-top 6.04rem
            justify-content center
            div
                width 2.8rem 
                height 100%
                color #3385EC
                font-size 0.3rem
                text-align center
                line-height 0.75rem
                border-radius 0.05rem
                margin 0 0.15rem
                border 1px solid #3385EC
            .ensure
                color #ffffff
                background #3385EC
                box-shadow 0 0 0.2rem #3385ec

</style>