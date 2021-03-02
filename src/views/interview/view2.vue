<template>
  <div style="text-align: center;">
    <van-nav-bar title="应聘人员信息" left-arrow @click-left="handleBack" />
    <div style="display: inline-block;">
      <el-form label-width="100px" ref="form">
        <br>
        <div style="text-align: left;height: 30px;font-size: 20px">

          申请职位：{{obj.position}}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          面试人：{{obj.interviewer.split("-")[0]}}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          面试时间：
          {{
          new Date(obj.createDate)
          .toISOString().split("T")[0]
          }}
        </div>
        <table class="table" style="width:960px;height:100%;border:1px solid;" border cellspacing="0" cellpadding="0">
          <tr align="center" style="height: 40px;">
            <td align="left" colspan="6" style="font-size: 20px;font-weight: bold">基本信息</td>
          </tr>
          <tr align="center">
            <td width="120px">姓名</td>
            <td width="200px">{{obj.name}}</td>
            <td width="120px">性别</td>
            <td width="200px">{{obj.sex}}</td>
            <td width="120px">出生日期</td>
            <td width="200px">{{obj.birthday}}</td>
          </tr>
          <tr align="center">
            <td width="120px">籍贯</td>
            <td width="200px">{{obj.place}}</td>
            <td width="120px">民族</td>
            <td width="200px">{{obj.nation}}</td>
            <td width="120px">政治面貌</td>
            <td width="200px"></td>
          </tr>
          <tr align="center">
            <td width="120px">手机号</td>
            <td width="200px">{{obj.phone}}</td>
            <td width="120px">邮箱</td>
            <td width="200px">{{obj.email}}</td>
            <td width="120px">婚姻状况</td>
            <td width="200px">{{obj.marryStatus}}</td>
          </tr>
          <tr align="center">
            <td width="120px">现住址</td>
            <td width="200px" colspan="5" align="left">&nbsp;&nbsp;&nbsp;&nbsp;{{obj.address}}</td>
          </tr>
          <tr align="center">
            <td width="120px">当前薪资</td>
            <td width="200px">{{obj.currentSalary}}</td>
            <td width="120px">期望薪资</td>
            <td width="200px" colspan="3" align="left">&nbsp;&nbsp;&nbsp;&nbsp;{{obj.expectedSalary}}</td>
          </tr>
          <tr style="height: 40px;">
            <td align="left" colspan="6" style="font-size: 20px;font-weight: bold">工作履历</td>
          </tr>
          <tr>
            <td>起止时间</td><td colspan="2">单位全称</td><td>职位</td><td>直接上级</td><td>联系电话</td>
          </tr>
          <tr>
            <td>{{obj.startDate1}}  {{obj.endDate1}}</td><td colspan="2">{{obj.company1}}</td><td>{{obj.post1}}</td><td>{{obj.superior1}}</td><td>{{obj.tel1}}</td>
          </tr>
          <tr>
            <td>{{obj.startDate2}}  {{obj.endDate2}}</td><td colspan="2">{{obj.company2}}</td><td>{{obj.post2}}</td><td>{{obj.superior2}}</td><td>{{obj.tel2}}</td>
          </tr>
          <tr>
            <td>{{obj.startDate3}}  {{obj.endDate3}}</td><td colspan="2">{{obj.company3}}</td><td>{{obj.post3}}</td><td>{{obj.superior3}}</td><td>{{obj.tel3}}</td>
          </tr>
          <tr style="height: 40px;">
            <td align="left" colspan="6" style="font-size: 20px;font-weight: bold">学习、培训情况</td>
          </tr>
          <tr>
            <td>起止时间</td><td colspan="3">学校名称</td><td>学历</td><td>专业</td>
          </tr>
          <tr>
            <td>{{obj.timeSolt1}}</td><td colspan="3">{{obj.schoolName1}}</td><td>{{obj.education1}}</td><td>{{obj.major1}}</td>
          </tr>
          <tr>
            <td>{{obj.timeSolt2}}</td><td colspan="3">{{obj.schoolName2}}</td><td>{{obj.education2}}</td><td>{{obj.major2}}</td>
          </tr>
          <tr>
            <td>{{obj.timeSolt3}}</td><td colspan="3">{{obj.schoolName3}}</td><td>{{obj.education3}}</td><td>{{obj.major3}}</td>
          </tr>
          <tr>
            <td align="left" colspan="6" style="font-size: 20px;font-weight: bold">面试结果</td>
          </tr>
          <tr align="center" style="height: 40px;">
            <td width="120px">
              面试结果
            </td>
            <td align="left" colspan="5">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio-group v-model="result">
                <el-radio label="不合适">不合适</el-radio>
                <el-radio label="可以考虑">可以考虑</el-radio>
                <el-radio label="初试通过">初试通过</el-radio>
                <el-radio label="可以入职">可以入职</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr align="center">
            <td>
              上传面试题
            </td>
            <td align="left" colspan="5">
              <el-upload :action="uploadAddr" :file-list="fileIds" list-type="picture-card" :on-success="handleUploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <a :href="downImageUrl">点击下载</a>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </td>
          </tr>
          <tr align="center">
            <td>面试评价</td>
            <td align="left" colspan="5">
              <el-input type="textarea" v-model="evaluate" :cols="10" :rows="6"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">
              <van-button round block type="primary" @click="onSubmit">
                提交
              </van-button>
            </td>
            <td colspan="2"></td>
          </tr>
        </table>
      </el-form>
    </div>
    <br>
    <br>
    <br>
    <br>
  </div>
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
        dialogImageUrl: '',
        dialogVisible: false,
        downImageUrl: '',
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
      },
      handleRemove(file, fileList) {
        this.fileIds.splice(this.fileIds.indexOf(file), 1)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.downImageUrl = file.url
        this.dialogVisible = true
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
        this.$router.replace('/ephr')
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
      onSubmit() {
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
  tr {
    height: 30px;
  }
</style>
