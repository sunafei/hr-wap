<template>
  <div>
    <el-form :rules="rules" ref="dataForm" :model="obj" label-position="left" label-width="70px" style="margin-left:50px;margin-right: 30px;">
      <el-input v-model="obj.id" type="hidden"></el-input>
      <el-form-item label="名称" prop="name">
        <el-input v-model="obj.name"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit('dataForm')">确认</el-button>
  </div>
</template>
<script>
  import { get, evaluate } from '@/api/interview'

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
        })
      }
    }
  }
</script>
