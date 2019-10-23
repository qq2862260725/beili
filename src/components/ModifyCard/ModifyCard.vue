<template>
<div class="modifycard">
    <div class="user">
        <div class="car_wrap">
            <div class="tag">请输入车牌号</div>
            <div class="carnum">
                <div class='single' @click="tapInput(1)">
                    <span>{{num1}}</span>
                    <div class='action' v-show="step == 1"></div>
                </div>
                <div class='single' @click="tapInput(2)">
                    <span>{{num2}}</span>
                    <div class='action' v-show="step == 2"></div>
                </div>
                <div class='single' @click="tapInput(3)">
                    <span>{{num3}}</span>
                    <div class='action' v-show="step == 3"></div>
                </div>
                <div class='single' @click="tapInput(4)">
                    <span>{{num4}}</span>
                    <div class='action' v-show="step == 4"></div>
                </div>
                <div class='single' @click="tapInput(5)">
                    <span>{{num5}}</span>
                    <div class='action' v-show="step == 5"></div>
                </div>
                <div class='single' @click="tapInput(6)">
                    <span>{{num6}}</span>
                    <div class='action' v-show="step == 6"></div>
                </div>
                <div class='single' @click="tapInput(7)">
                    <span>{{num7}}</span>
                    <div class='action' v-show="step == 7"></div>
                </div>
                <div class='single' @click="tapInput(8)">
                    <span>{{num8}}</span>
                    <div class='action' v-show="step == 8"></div>
                </div>
            </div>  
        </div>
        <div class="car_type">
            <div class="car_tag">请选择动力类型</div>
            <div class="car_desc">
                <div class="car_typename">{{carType}}</div>
                <div class="chose" @click="showAllType">
                    <img src="../../common/img/down.png" alt="">
                </div>
                <div class="all_type" v-show="show">
                    <span><em></em></span>
                    <div class="single" 
                    :class="{ active: currentIndex === index }" 
                    v-for="(type, index) in allType" 
                    @click="choseType(index)">{{type}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="cardname">点击添加行驶证</div>
        <div class="card_wrap">
            <input type="file" id="card" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <label for="card">
                <img class="user_card" :src="card" alt="">
                <div class="none">
                    <img src="../../common/img/camara.png" alt="">
                    <p>上传驾驶证</p>
                </div>
            </label>
        </div>
    </div>
    <div class="button">
        <div class="ensure" @click="ensureBtn">确定</div>
        <div class="cancle" @click="cancleBtn">取消</div>
    </div>
    <div class="keyboard_wrap" v-show="showboard">
      <keyboard @writeKey="keyTap" @deleteKey="deleteKey" ref="keyboard"></keyboard>
    </div>
    <div class="note_wrap" v-show="showNote">
      <note :note="note"></note>
    </div>
</div>
</template>

<script>
import Keyboard from 'base/keyboard/keyboard'
import Note from 'base/note/note'
import storage from 'good-storage'
import { ModifyCard } from 'api/modifyCard'

export default {
    name: 'ModifyCard',
    data () {
        return {
            userId: storage.get('userId'),
            show: false,
            note: false,
            currentIndex: '',
            allType: ['燃油车', '新能源车', '油电混合车'],
            carType: '新能源车',
            num1: "京",
            num2: '1',
            num3: '1',
            num4: '1',
            num5: '1',
            num6: '1',
            num7: '1',
            num8: '1',
            step: 1,
            note: '',
            showNote: true,
            showboard: false,
            card: '',
            file: null,
        }
    },

    computed: {
        carNum() {
            return `${this.num1}${this.num2}${this.num3}${this.num4}${this.num5}${this.num6}${this.num7}${this.num8}`
        }
    },

    methods: {
        ensureBtn() {
            let file = this.file;
            if(file) {  
                let userId = this.userId
                let carNum = this.carNum
                let carType = this.carType
                let carImg = this.file
                console.log(130, userId, carNum, carType, carImg)
                ModifyCard(userId, carNum, carType, carImg).then(res => {
                    console.log(132, res)
                })
            } else {
                console.log(127, 'error')
            }
        },

        cancleBtn() {

        },

        //展示所有类别
        showAllType() {
            this.show = !this.show
        },

        //选择图片
        addImg(event) {
            this.showboard = false;
            let reader = new FileReader();
            let fileData = this.$refs.inputer.files[0];
            console.log(154, fileData, typeof(fileData))
            reader.readAsDataURL(fileData);
            let that = this;
            reader.onload = function(e) {
                //这里的数据可以使本地图片显示到页面
                that.card = e.srcElement.result
            };
            let formData = new FormData();
            formData.append('file', fileData);
            // this.file = formData;
            this.file = this.$refs.inputer.files[0]
        },

        //选择类型
        choseType(index) {
            let choseType = this.allType[index]
            if(this.carNum.length == 7) {
                if(choseType == '新能源车') {
                    this.noteFn('不能选择新能源车')
                } else {
                    this.carType = choseType
                    this.currentIndex = index
                    this.show = false
                }
            } else if(this.carNum.length == 8) {
                if(choseType == '燃油车') {
                    this.noteFn('不能选择燃油车')
                } else {
                    this.carType = choseType
                    this.currentIndex = index
                    this.show = false
                }
            } else {
                this.carType = choseType
                this.currentIndex = index
                this.show = false
            }
        },

        //点击车牌框
        tapInput(key) {
            if(!this.showboard) {
                this.showboard = true
            }
            this.step = key
        },

        noteFn(text) {
            this.note = text
            this.showNote = true
            setTimeout(() => {
                this.showNote = false
            }, 2000)
        },

        keyTap(key) {
            let currentStep = this.step
            switch(currentStep) {
            case 1: 
                this.num1 = key
                this.step++
                break
            case 2: 
                this.num2 = key
                this.step++
                break
            case 3: 
                this.num3 = key
                this.step++
                break
            case 4: 
                this.num4 = key
                this.step++
                break
            case 5: 
                this.num5 = key
                this.step++
                break
            case 6: 
                this.num6 = key
                this.step++
                break
            case 7: 
                this.num7 = key
                this.step++
                break
            case 8: 
                this.num8 = key
                break
            default: 
                
            }
        },

        //删除键
        deleteKey() {
            let currentStep = this.step
            switch(currentStep) {
            case 2: 
                this.num2 = ''
                this.step--
                break;
            case 3: 
                this.num3 = ''
                this.step--
                break;
            case 4: 
                this.num4 = ''
                this.step--
                break;
            case 5: 
                this.num5 = ''
                this.step--
                break;
            case 6: 
                this.num6 = ''
                this.step--
                break;
            case 7: 
                this.num7 = ''
                this.step--
                break;
            case 8: 
                this.num8 = ''
                this.step--
                break;
            default: 
                
            }
        },

    },

    watch: {
        step(currentStep) {
            if(currentStep == 1) {
                this.$refs.keyboard.switchKeyboard(2)
            } else {
                this.$refs.keyboard.switchKeyboard(1)
            }
        },

        carNum(value) {
            if(value.length == 7 && this.carType == '新能源车') {
                this.carType = ''
            }
            if(value.length == 8 && this.carType == '燃油车') {
                this.carType = ''
            }
        }
    },

    components: {
        Keyboard,
        Note
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .modifycard 
        position relative
        width 100%
        height auto
        padding 0.21rem 0
        .keyboard_wrap 
            position fixed
            bottom 0
            width 100%
            height auto
        .note_wrap
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
            display flex
            z-index 20
            justify-content center
            align-items center
        .user 
            width 6.9rem
            height auto
            margin 0 auto
            padding 0.12rem 0.3rem
            background-color #ffffff
            border-radius 0.05rem
        .car_wrap
            height auto
            width 100%
            .tag
                color #000000
                font-size 0.3rem
                line-height 0.7rem
            .carnum
                width 100%
                height 0.85rem
                display flex
                background-color #f8f8f8
                border-radius 0.05rem
                .single
                    position relative
                    height 100%
                    flex 1
                    color #333333
                    font-size 0.3rem
                    line-height 0.85rem
                    text-align center
                    .single:nth-of-type(1):before
                        content: ''
                        position absolute
                        width 1px
                        height 0.31rem 
                        right 0
                        top 50%
                        transform translateY(-50%)
                        background #222222
                    .action
                        position absolute
                        height 2px
                        width 100%
                        bottom 0
                        background-color #3385EC
                        animation myfirst 1.5s infinite
                    @keyframes myfirst 
                        from 
                            background-color: #3385EC
                        to 
                            background-color: #ffffff
        .car_type
            width 100%
            height 0.45rem
            margin 0.4rem auto 0.2rem
            display flex
            line-height 0.45rem
            justify-content space-between
            .car_tag
                width 2.5rem
                height 100%
                color #000000
                font-size 0.3rem
            .car_desc 
                position relative
                width 3.3rem
                height 100%
                display flex
            .car_typename 
                flex 1
                color #222222
                font-size 0.3rem
                border 1px solid #999999
                padding 0 0.1rem
                border-right none
            .chose
                width 0.45rem
                height 100%
                display flex
                justify-content center
                align-items center
                background-color #3385EC
                img 
                    width 0.15rem
                    height 0.1rem
            .all_type
                position absolute
                width 3.28rem
                height auto
                top 0.7rem
                z-index 10
                background-color #ffffff 
                border 1px solid #999999
                border-bottom none
                border-radius 0.05rem
                span
                    position absolute
                    display block
                    width: 0
                    height: 0
                    border-width:0 8px 8px
                    border-style solid
                    top -8px
                    right 0.1rem
                    border-color transparent transparent #999999 transparent
                em
                    display block
                    width 0 
                    height 0 
                    border-width 0 8px 8px 
                    border-style solid 
                    border-color transparent transparent #ffffff
                    position absolute 
                    top 1px 
                    left -8px
                .single
                    color #222222
                    font-size 0.3rem
                    line-height 0.45rem
                    padding 0 0.4rem
                    border-bottom 1px solid #999999
                .active 
                    color #3385EC
        .card
            width 6.9rem
            height auto
            margin 0.2rem auto
            .cardname
                width 100%
                height 0.72rem
                color #000000
                font-size 0.3rem
                line-height 0.72rem
            .card_wrap 
                position relative
                width 100%
                height 2.56rem
                background #ffffff
                border-radius 0.05rem
                #card 
                    display none
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
        .button
            width 100%;
            height 0.75rem
            display flex
            margin-top 3.67rem
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
