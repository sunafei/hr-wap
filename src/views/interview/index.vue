<template>
  <div>
    <van-nav-bar title="应聘人员登记列表"/>
    <van-search placeholder="请输入面试人姓名" v-model="listQuery.name" show-action @search="handleFilter" @cancel="handleCancel" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell center v-for="(item, index) in list" :key="index" :title="item.name" :value="item.createDate | time" is-link :to="{path: '/interview/view/' + item.id}" />
    </van-list>
  </div>
</template>

<script>
  import { getList } from '@/api/interview'

  export default {
    data() {
      return {
        list: null,
        total: null,
        loading: false,
        finished: false,
        syncexe: false,
        listQuery: {
          pagination: {
            page: 0,
            size: 10,
            orderName: 'createDate',
            orderType: 1
          },
          queryCriteria: {},
          name: undefined
        }
      }
    },
    filters: {
      time(val) {
        const date = new Date(val)
        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        return date.getFullYear() + '-' + month + '-' + day
      }
    },
    methods: {
      handleFilter() {
        if (this.listQuery.name) {
          this.listQuery.pagination.page = 1
          this.listQuery.queryCriteria.name = 'name'
          this.listQuery.queryCriteria.exp = 'like'
          this.listQuery.queryCriteria.val = this.listQuery.name
        }
        this.fetchData()
      },
      handleCancel() {
        this.listQuery.queryCriteria.val = this.listQuery.name
        this.fetchData()
      },
      handleDelete(row) {

      },
      onLoad() {
        setTimeout(() => {
          if (!this.finished) {
            this.listQuery.pagination.page++
            this.fetchData()
            this.loading = false
          }
        }, 200)
      },
      fetchData() {
        if (this.syncexe) {
          return
        }
        this.syncexe = true
        // TODO 异步操作then返回结果是非同步的使用syncexe处理同步, 这里应该让函数同步，还不知道怎么操作
        getList(this.listQuery).then(response => {
          const itemLs = response.data.items
          console.log(itemLs.length)
          if (itemLs.length < 10) {
            this.finished = true
          }
          if (response.data.page + 1 === 1) {
            this.list = itemLs
          } else if (itemLs.length > 0) {
            for (let i = 0; i < itemLs.length; i++) {
              this.list.push(itemLs[i])
            }
          }
          this.total = response.data.total
          if (itemLs.length < 10 || this.list.length >= this.total) {
            this.finished = true
          }
          this.syncexe = false
        })
      }
    }
  }
</script>
<style>
  .van-cell__value {
    margin-top: 4px
  }
  .van-field__control {
    margin-top: -3px;
  }
</style>
