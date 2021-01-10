<template>
  <van-form @submit="onSubmit">
    <van-nav-bar title="应聘人员信息" left-arrow @click-left="handleBack" />
    <div class="van-block">
      <h2 class="van-block-title">
        基本信息
      </h2>
      <van-field readonly v-model="obj.name" name="obj.name" label="姓名" />

      <van-field readonly name="obj.sex" :value="obj.sex" label="性别" />

      <van-field readonly name="obj.position" :value="obj.position" label="应聘职位" />

      <van-field readonly clickable v-model="obj.interviewer" name="obj.interviewer" label="面试官" />

      <van-field readonly v-model="obj.phone" type="tel" name="obj.phone" label="手机号" />

      <van-field readonly v-model="obj.email" name="obj.email" label="邮箱" />

      <van-field readonly name="obj.birthday" :value="obj.birthday" label="出生日期" />

      <van-field readonly v-model="obj.place" name="obj.place" label="籍贯" />

      <van-field readonly name="obj.nation" :value="obj.nation" label="民族" />


      <van-field readonly name="obj.marryStatus" :value="obj.marryStatus" label="婚姻状况" />

      <van-field readonly v-model="obj.address" rows="2" autosize label="现住址" type="textarea" />
    </div>

    <div class="van-block">
      <h2 class="van-block-title">
        学习、培训情况
      </h2>
      <van-skeleton title row="3" :loading="obj.schoolName1 == null || obj.schoolName1.length < 1">
        <van-cell :title="obj.schoolName1" :value="obj.timeSolt1" :label="obj.education1 + ',' + obj.major1" />
        <van-cell :title="obj.schoolName2" :value="obj.timeSolt2" :label="obj.education2 + ',' + obj.major2" v-show="obj.schoolName2 && obj.schoolName2.length > 0" />
        <van-cell :title="obj.schoolName3" :value="obj.timeSolt3" :label="obj.education3 + ',' + obj.major2" v-show="obj.schoolName3 && obj.schoolName3.length > 0" />
      </van-skeleton>
    </div>
    <div class="van-block">
      <h2 class="van-block-title">
        工作履历
      </h2>
      <van-skeleton title row="3" :loading="obj.company1 == null || obj.company1.length < 1">
        <van-cell :title="obj.company1" :value="obj.startDate1 +'到' + obj.endDate1" :label="obj.post1" />
        <van-cell :title="obj.company2" :value="obj.startDate2 +'到' + obj.endDate2" :label="obj.post2" v-show="obj.company2 && obj.company2.length > 0" />
        <van-cell :title="obj.company3" :value="obj.startDate3 +'到' + obj.endDate3" :label="obj.post3" v-show="obj.company3 && obj.company3.length > 0" />
      </van-skeleton>
    </div>
    <div class="van-block">
      <h2 class="van-block-title">
        其他
      </h2>
      <van-field readonly v-model="obj.currentSalary" name="obj.currentSalary" label="当前薪资" />
      <van-field readonly v-model="obj.expectedSalary" name="obj.expectedSalary" label="期望薪资" />
    </div>
    <div class="van-block">
      <h2 class="van-block-title">
        上传面试题
      </h2>
      <div class="fileStyle">
        <el-upload :action="uploadAddr" :file-list="fileIds" list-type="picture-card" :on-success="handleUploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>

    <div class="van-block">
      <h2 class="van-block-title">
        面试结果
      </h2>
      <van-field readonly clickable name="result" :value="result" label="面试结果" placeholder="点击选择面试结果" @click="showResultPicker = true"/>
      <van-popup v-model="showResultPicker" position="bottom">
        <van-picker show-toolbar :columns="['未通过', '二面', '通过']" @confirm="onResultConfirm" @cancel="showResultPicker = false" />
      </van-popup>
      <van-field v-model="evaluate" name="evaluate" rows="2" autosize label="评价" type="textarea" placeholder="请输入面试评价" />
    </div>

    <div style="margin: 16px 16px 0">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
      <br>
      <van-button round block type="danger" native-type="button" @click="handleDelete">
        删除
      </van-button>
      <br>
      <br>
    </div>
    <van-image-preview v-model="imageShow" :images="previewImages" @change="imageChange" :startPosition="imageIndex" >
      <template v-slot:index>第{{ imageIndex }}页</template>
    </van-image-preview>
  </van-form>
</template>
<script>
  import { get, evaluate, del } from '@/api/interview'
  import { Dialog, Notify } from 'vant'

  export default {
    data() {
      return {
        id: '',
        obj: {},
        fileIds: [],
        result: null,
        uploadAddr: process.env.BASE_API + '/api/uploadFile',
        evaluate: null,
        imageShow: false,
        previewImages: [],
        imageIndex: 0,
        showResultPicker: false
      }
    },
    created() {
      // this.fetchData()
    },
    mounted() {
      this.id = this.$route.params.id
      this.fetchData()
    },
    methods: {
      handleUploadSuccess(response, file, fileList) { // 图片上传成功
        const result = JSON.parse(response.data)
        result.url = process.env.BASE_API + result.url
        this.fileIds.push(result)
        this.previewImages.push(result.url)
      },
      handleRemove(file, fileList) {
        this.fileIds.splice(this.fileIds.indexOf(file), 1)
        this.previewImages.splice(file.url, 1)
      },
      handlePictureCardPreview(file) {
        this.imageShow = true
        this.imageIndex = this.previewImages.indexOf(file.url)
      },
      imageChange(index) {
        this.imageIndex = index
      },
      onResultConfirm(value) {
        this.result = value
        this.showResultPicker = false
      },
      handleDelete() {
        Dialog.confirm({
          title: '提示',
          message: '确定删除《' + this.obj.name + '》的面试信息么'
        }).then(() => {
          del(this.id).then(response => {
            Notify({ type: 'success', message: '删除成功！' })
            this.$router.replace('/')
          })
        })
      },
      handleBack() {
        if (history.length > 1) {
          history.back()
        } else {
          this.$router.replace('/')
        }
      },
      fetchData() {
        get(this.id).then(response => {
          this.obj = response.data
          if (this.obj.fileIds != null) {
            this.fileIds = JSON.parse('[' + this.obj.fileIds + ']')
            const el = this
            this.fileIds.forEach(function(item, index) {
              el.previewImages.push(item.url)
            })
          }
          this.evaluate = this.obj.evaluate
          this.result = this.obj.result
        })
      },
      onSubmit(values) {
        const fileJson = JSON.stringify(this.fileIds).replace('[', '').replace(']', '')
        const param = { id: this.id, 'fileIds': fileJson, 'evaluate': this.evaluate, 'result': this.result }
        evaluate(param).then((result) => {
          Notify({ type: 'success', message: '保存成功！' })
        })
      }
    }
  }
</script>
<style>
  .van-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background-color: #fff;
  }
  .van-nav-title {
    font-weight: 600;
    font-size: 17px;
    text-transform: capitalize;
  }

  .van-block-title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  .van-block-title {
    padding-top: 20px;
  }
  .icon-add {
    float: right;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  .fileStyle {
    padding: 0 15px;
  }
  .van-block-title {
    color: #646566;
    font-size: 16px;
  }
</style>
