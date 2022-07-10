<template>
  <div class="news-box">
    <div class="scroll-container" @scroll="handleScroll">
      <div :style="fillStyle">
        <!-- 根据待显示新闻列表数组，显示新闻列表 -->
        <div v-for="(item, index) in showDataList" :key="index">
          <router-link
            class="one-new"
            :to="
              '/article/' +
              item.title +
              '/' +
              item.reads +
              '/' +
              item.from +
              '/' +
              item.date +
              '/' +
              item.image
            "
          >
            <!-- 新闻左侧标题、评论、来源部分 -->
            <div class="new-left">
              <h3>{{ item.title }}</h3>
              <div>
                <p>
                  <img src="../../assets/icons/msg.png" alt="评" />
                  <span>{{ item.reads }}</span>
                  <span>{{ item.from }}</span>
                </p>
                <h4>{{ item.date }}</h4>
              </div>
            </div>
            <!-- 新闻右侧图片部分 -->
            <div class="new-right">
              <img :src="imgsList[item.image]" alt="PIC" />
            </div>
          </router-link>
        </div>
        <!-- 请求状态下 显示对应 msg 提示信息 -->
        <div v-if="isRequestStatus" class="msg">
          <h2>{{ msg }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useFetchData from './Hooks/useFetchData'
import useFill from './Hooks/useFill'
import useFilterList from './Hooks/useFilterList'
import useListInfo from './Hooks/useListInfo'
const { allDataList, msg, isRequestStatus, imgsList, getMock } = useFetchData()
const info = useListInfo()
const { handleScroll, showDataList, startIndex, endIndex } = useFilterList(
  allDataList,
  info,
  getMock,
  isRequestStatus
)
const fillStyle = useFill(
  allDataList,
  startIndex,
  endIndex,
  info.listItemHeight
)
</script>

<style lang="less" scoped>
.news-box {
  width: 100%;
  max-width: 800px;
  height: 100%;
  .scroll-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    .one-new {
      text-decoration: none;
      display: block;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 14px 10px 5px;
      .new-left {
        height: 80px;
        position: relative;
        h3 {
          padding: 0;
          margin: 0;
          font-size: 16px;
          text-align: justify;
          color: #555;
        }
        div {
          position: absolute;
          width: 100%;
          bottom: 10px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          p {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            img {
              height: 16px;
            }
            span {
              font-size: 12px;
              color: #555;
              margin-left: 3px;
              margin-right: 3px;
            }
          }
          h4 {
            font-size: 12px;
            color: #888;
          }
        }
      }
      .new-right {
        margin-left: 10px;
        img {
          height: 68px;
        }
      }
    }
    .msg h2 {
      font-size: 18px;
      text-align: center;
      color: #666;
      padding-top: 58px;
    }
  }
}
</style>
