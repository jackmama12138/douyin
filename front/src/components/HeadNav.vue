<template>
    <div style="width: 100%">
        <div class="head-nav">
            <div class="head-nav-left">
                <a-radio-group
                    v-model="selected"
                    type="button"
                    class="Navfillet"
                    default-value="hot"
                    @change="handleSelection"
                >
                    <a-radio :class="getClass('hot')" class="Navfillet" value="hot">热</a-radio>
                    <a-radio disabled :class="getClass('income')" class="Navfillet" value="income">币</a-radio>
                </a-radio-group>
            </div>
            <div class="head-nav-right"><span>{{ navTitle }}</span></div>
        </div>
        <div class="head-nav-prompt" v-if="selected === 'hot'">点击头像 查看 实时数据</div>
         <div class="head-nav-prompt" v-else>{{ day }}开始统计</div>
    </div>

<!--        <div class="head-nav-content"><component :is="currentComponent" @anchorMessage="anchorMessage" @roomId="roomId" @nickname="nickName"/></div>-->
  <div class="head-nav-content" v-if="selected === 'hot'"><HotList @anchorMessage="anchorMessage"></HotList></div>
  <div class="head-nav-content" v-else><AnchorGiftLists :roomId="roomId" :nickname="nickName" :avatar="avatar"></AnchorGiftLists></div>
</template>

<script setup>
import {computed, ref} from "vue";
import dayjs from "dayjs";
import HotList from './hotList.vue';
import AnchorGiftLists from "./AnchorGiftLists.vue";
const roomId = ref('')
const nickName = ref('')
const avatar = ref('')
const anchorMessage = (value) => {
    roomId.value = value.own_room.room_ids_str[0];
    nickName.value = value.nickname;
    avatar.value = value.avatar_thumb;
    selected.value = 'income';
    handleSelection('income')
};

const day = dayjs().format('YYYY/MM/DD/HH:mm:ss')

const selected = ref('hot');
const navTitle = computed(() => {
    return selected.value === 'hot' ? '人气榜' : '实时数据';
});

const handleSelection = (value) => {
    selected.value = value;
};

const getClass = (value) => {
    return selected.value === value ? 'Navselect' : '';
};

// const currentComponent = computed(() => {
//     return selected.value === 'hot' ? HotList : AnchorGiftLists;
// });

</script>

<style scoped>
.head-nav {
    /*position: fixed; !* 为了让绝对定位生效，父元素需要设置 position *!*/
    display: flex;
    z-index: 500;
    margin: 0 auto;
    width: 100%;
    min-height: 60px;
    max-height: 60px;
    /*background-color: #f5f5f5;*/
    /*padding: 10px 0;*/
    background-color: #fff;
    border-bottom: 1px solid rgb(230, 230, 230);
    align-items: center;
}


.head-nav-left {
    width: 80px;
    text-align: left;
    padding-left: 10px;
}

.head-nav-right {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 500;
    color: #45474c;
    font-size: 16px;
    text-align: center;
}
.Navfillet {
    border-radius: 20px;
}
.Navselect {
    font-weight: 800;
    color: #ee4970 !important;
}
.head-nav-content{
    /*position: fixed;*/
    /*margin: 0 auto;*/
    margin: 0 auto;
    height: 100%;
    width: 100%;
    top: 92px;
}
.head-nav-prompt{
    /*position: fixed;*/
    margin: 0 auto;
    height: 32px;
    width: 100%;
    top: 60px;
    z-index: 600;
    display: flex;
    color: white;
    line-height: 32px;
    background-color: rgb(52, 145, 250);
    justify-content: center;
}

</style>