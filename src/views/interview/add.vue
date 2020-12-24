<template>
  <van-form @submit="onSubmit">
    <van-nav-bar title="应聘人员登记表"/>
    <div class="van-block">
      <h2 class="van-block-title">
        基本信息
      </h2>
      <van-field class="validate-field" v-model="obj.name" name="obj.name" label="姓名" :rules="[{ required: true, message: '姓名必填' }]" placeholder="请输入姓名" />

      <van-field class="validate-field" readonly clickable name="obj.sex" :value="obj.sex" label="性别" :rules="[{ required: true, message: '性别必填' }]" placeholder="点击选择性别" @click="showSexPicker = true"/>
      <van-popup v-model="showSexPicker" position="bottom">
        <van-picker show-toolbar :columns="['男', '女']" @confirm="onSexConfirm" @cancel="showSexPicker = false" />
      </van-popup>

      <van-field class="validate-field" readonly clickable name="obj.position" :value="obj.position" label="应聘职位" :rules="[{ required: true, message: '应聘职位必填' }]" placeholder="点击选择应聘职位" @click="showPositionPicker = true"/>
      <van-popup v-model="showPositionPicker" position="bottom">
        <van-picker show-toolbar :columns="['JAVA开发', 'JAVA开发（实习）', '测试', '测试（实习）', '需求', '需求（实习）', '项目经理']" @confirm="onPositionConfirm" @cancel="showPositionPicker = false"/>
      </van-popup>

      <van-field class="validate-field" readonly clickable v-model="obj.interviewer" name="obj.interviewer" label="面试官" :rules="[{ required: true, message: '面试官必填' }]" placeholder="点击选择面试官" @click="showInterviewerPicker = true" />
      <van-popup v-model="showInterviewerPicker" position="bottom">
        <van-picker show-toolbar :columns="['张巧飞-13552998408', '张秀伟-15110083909', '孙阿飞-17600224324']" @confirm="onInterviewerConfirm" @cancel="showInterviewerPicker = false" />
      </van-popup>

      <van-field class="validate-field" v-model="obj.phone" type="tel" name="obj.phone" label="手机号" :rules="[{ required: true, message: '手机号必填' }]" placeholder="请输入手机号" />

      <van-field class="validate-field" v-model="obj.email" name="obj.email" label="邮箱" :rules="[{ required: true, message: '邮箱必填' }]" placeholder="请输入邮箱" />

      <van-field class="validate-field" readonly clickable name="obj.birthday" :value="obj.birthday" label="出生日期" placeholder="点击选择时间" @click="showBirthdayPicker = true" />
      <van-popup v-model="showBirthdayPicker" position="bottom">
        <van-datetime-picker type="date" v-model="currentDate" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onBirthdayConfirm" @cancel="showBirthdayPicker = false" />
      </van-popup>

      <van-field class="validate-field" v-model="obj.place" name="obj.place" label="籍贯" :rules="[{ required: true, message: '籍贯必填' }]" placeholder="请输入籍贯" />

      <van-field class="validate-field" readonly clickable name="obj.nation" :value="obj.nation" label="民族" placeholder="点击选择民族" @click="showNationPicker = true" />
      <van-popup v-model="showNationPicker" position="bottom">
        <van-picker show-toolbar :columns="nationColumns" @confirm="onNationConfirm" @cancel="showNationPicker = false" />
      </van-popup>

      <van-field class="validate-field" readonly clickable name="obj.marryStatus" :value="obj.marryStatus" label="婚姻状况" :rules="[{ required: true, message: '婚姻状况必填' }]" placeholder="点击选择婚姻状况" @click="showMarryPicker = true" />
      <van-popup v-model="showMarryPicker" position="bottom">
        <van-picker show-toolbar :columns="['未婚', '已婚']" @confirm="onMarryConfirm" @cancel="showMarryPicker = false" />
      </van-popup>

      <van-field class="validate-field" v-model="obj.address" rows="2" autosize label="现住址" type="textarea" placeholder="请输入现住址" />
    </div>

    <div class="van-block">
      <h2 class="van-block-title">
        学习、培训情况
        <van-icon name="add-o" class="icon-add" @click="showEduFunc" v-show="eduAddIcon"/>
      </h2>
      <van-skeleton title row="3" :loading="eduLoading">
        <van-cell :title="obj.schoolName1" is-link :value="obj.timeSolt1" :label="obj.education1 + ',' + obj.major1" @click="showEdu1 = true"/>
        <van-cell :title="obj.schoolName2" is-link :value="obj.timeSolt2" :label="obj.education2 + ',' + obj.major2" v-show="eduCell2" @click="showEdu2 = true"/>
        <van-cell :title="obj.schoolName3" is-link :value="obj.timeSolt3" :label="obj.education3 + ',' + obj.major2" v-show="eduCell3" @click="showEdu3 = true"/>
      </van-skeleton>
    </div>
    <div class="van-block">
      <h2 class="van-block-title">
        工作履历
        <van-icon name="add-o" class="icon-add" @click="showJobFunc" v-show="jobAddIcon"/>
      </h2>
      <van-skeleton title row="3" :loading="jobLoading">
        <van-cell :title="obj.company1" is-link :value="obj.startDate1 +'到' + obj.endDate1" :label="obj.post1" @click="showJob1 = true"/>
        <van-cell :title="obj.company2" is-link :value="obj.startDate2 +'到' + obj.endDate2" :label="obj.post2" v-show="jobCell2" @click="showJob2 = true"/>
        <van-cell :title="obj.company3" is-link :value="obj.startDate3 +'到' + obj.endDate3" :label="obj.post3" v-show="jobCell3" @click="showJob3 = true"/>
      </van-skeleton>
    </div>
    <div class="van-block">
      <h2 class="van-block-title">
        其他
      </h2>
      <van-field class="validate-field" v-model="obj.currentSalary" name="obj.currentSalary" label="当前薪资" :rules="[{ required: true, message: '姓名必填' }]" placeholder="请输入你的当前薪资" />
      <van-field class="validate-field" v-model="obj.expectedSalary" name="obj.expectedSalary" label="期望薪资" :rules="[{ required: true, message: '姓名必填' }]" placeholder="请输入你的期望薪资"/>
    </div>
    <div style="margin: 16px 16px 0">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
      <br>
      <br>
      <br>
    </div>

    <!--教育经历 区域一-->
    <van-popup v-model="showEdu1" position="bottom" :style="{ height: '100%' }" >
      <div class="van-nav">
        <div class="van-nav-title">教育经历</div>
      </div>
      <van-field class="validate-field" v-model="obj.schoolName1" name="obj.schoolName1" label="学校名称" placeholder="请输入你的学校名称" />
      <van-field class="validate-field" readonly clickable :value="obj.education1" name="obj.education1" label="学历" placeholder="点击选择你的学历" @click="showEduPicker1 = true"/>
      <van-popup v-model="showEduPicker1" position="bottom">
        <van-picker show-toolbar title="学历" :columns="educationPicker" @confirm="onEduConfirm1" @cancel="showEduPicker1 = false"/>
      </van-popup>

      <van-field class="validate-field" v-model="obj.major1" name="obj.major1" label="专业" placeholder="请输入你的专业" />
      <van-field class="validate-field" readonly clickable :value="obj.timeSolt1" name="obj.timeSolt1" label="时间段" placeholder="点击选择你的学历时间" @click="showTimeSoltPicker1 = true"/>
      <van-popup v-model="showTimeSoltPicker1" position="bottom">
        <van-picker show-toolbar title="学历时间" :columns="timeSoltPicker" @confirm="onTimeSoltConfirm1" @cancel="showTimeSoltPicker1 = false"/>
      </van-popup>
      <div style="margin: 16px 16px 0">
        <van-button round block type="primary" @click="saveEdu1" native-type="button">
          保存
        </van-button>
      </div>
    </van-popup>

    <!--教育经历 区域二-->
    <van-popup v-model="showEdu2" position="bottom" :style="{ height: '100%' }" >
      <div class="van-nav">
        <div class="van-nav-title">教育经历</div>
      </div>
      <van-field class="validate-field" v-model="obj.schoolName2" name="obj.schoolName2" label="学校名称" placeholder="请输入你的学校名称"/>

      <van-field class="validate-field" readonly clickable :value="obj.education2" name="obj.education2" label="学历" placeholder="点击选择你的学历" @click="showEduPicker2 = true" />
      <van-popup v-model="showEduPicker2" position="bottom">
        <van-picker show-toolbar title="学历" :columns="educationPicker" @confirm="onEduConfirm2" @cancel="showEduPicker2 = false"/>
      </van-popup>

      <van-field class="validate-field" v-model="obj.major2" name="obj.major2" label="专业" placeholder="请输入你的专业" />

      <van-field class="validate-field" readonly clickable :value="obj.timeSolt2" name="obj.timeSolt2" label="时间段" placeholder="点击选择你的学历时间" @click="showTimeSoltPicker2 = true"/>
      <van-popup v-model="showTimeSoltPicker2" position="bottom">
        <van-picker show-toolbar title="学历时间" :columns="timeSoltPicker" @confirm="onTimeSoltConfirm2" @cancel="showTimeSoltPicker2 = false"/>
      </van-popup>
      <div style="margin: 16px 16px 0">
        <van-button round block type="primary" @click="saveEdu2" native-type="button">
          保存
        </van-button>
      </div>
    </van-popup>

    <!--教育经历 区域三-->
    <van-popup v-model="showEdu3" position="bottom" :style="{ height: '100%' }" >
      <div class="van-nav">
        <div class="van-nav-title">教育经历</div>
      </div>
      <van-field class="validate-field" v-model="obj.schoolName3" name="obj.schoolName3" label="学校名称" placeholder="请输入你的学校名称"/>
      <van-field class="validate-field" readonly clickable :value="obj.education3" name="obj.education3" label="学历" placeholder="点击选择你的学历" @click="showEduPicker3 = true" />
      <van-popup class="validate-field" v-model="showEduPicker3" position="bottom">
        <van-picker show-toolbar title="学历" :columns="educationPicker" @confirm="onEduConfirm3" @cancel="showEduPicker3 = false"/>
      </van-popup>

      <van-field class="validate-field" v-model="obj.major3" name="obj.major3" label="专业" placeholder="请输入你的专业" />

      <van-field readonly clickable :value="obj.timeSolt3" name="obj.timeSolt3" label="时间段" placeholder="点击选择你的学历时间" @click="showTimeSoltPicker3 = true"/>
      <van-popup v-model="showTimeSoltPicker3" position="bottom">
        <van-picker show-toolbar title="学历时间" :columns="timeSoltPicker" @confirm="onTimeSoltConfirm3" @cancel="showTimeSoltPicker3 = false"/>
      </van-popup>
      <div style="margin: 16px 16px 0">
        <van-button round block type="primary" @click="saveEdu3" native-type="button">
          保存
        </van-button>
      </div>
    </van-popup>

    <!--工作履历 区域一-->
    <van-popup v-model="showJob1" position="bottom" :style="{ height: '100%' }" >
      <div class="van-nav">
        <div class="van-nav-title">工作履历</div>
      </div>
      <van-field readonly clickable :value="obj.startDate1" name="obj.startDate1" label="开始时间" placeholder="点击选择工作开始时间" @click="showStartDatePicker1 = true"/>
      <van-popup v-model="showStartDatePicker1" position="bottom">
        <van-picker show-toolbar title="开始时间" :columns="datePicker" @confirm="onStartDateConfirm1" @cancel="showStartDatePicker1 = false"/>
<!--        <van-datetime-picker type="year-month" title="开始时间" :formatter="jobFormatter" @confirm="onStartDateConfirm1" @cancel="showStartDatePicker1 = false"/>-->
      </van-popup>
      <van-field readonly clickable :value="obj.endDate1" name="obj.endDate1" label="结束时间" placeholder="点击选择工作结束时间" @click="showEndDatePicker1 = true"/>
      <van-popup v-model="showEndDatePicker1" position="bottom">
        <van-picker show-toolbar title="结束时间" :columns="datePicker" @confirm="onEndDateConfirm1" @cancel="showEndDatePicker1 = false"/>
      </van-popup>
      <van-field v-model="obj.company1" name="obj.company1" label="单位全称" placeholder="请输入单位全称" />
      <van-field v-model="obj.post1" name="obj.post1" label="职位" placeholder="请输入职位" />
      <van-field v-model="obj.superior1" name="obj.superior1" label="直接上级" placeholder="请输入直接上级姓名" />
      <van-field v-model="obj.tel1" name="obj.tel1" label="直接上级电话" placeholder="请输入直接上级电话" type="tel" />
      <div style="margin: 16px 16px 0">
        <van-button round block type="primary" @click="saveJob1" native-type="button">
          保存
        </van-button>
      </div>
    </van-popup>
    <!--工作履历 区域二 -->
    <van-popup v-model="showJob2" position="bottom" :style="{ height: '100%' }" >
      <div class="van-nav">
        <div class="van-nav-title">工作履历</div>
      </div>
      <van-field readonly clickable :value="obj.startDate2" name="obj.startDate1" label="开始时间" placeholder="点击选择工作开始时间" @click="showStartDatePicker2 = true"/>
      <van-popup v-model="showStartDatePicker2" position="bottom">
        <van-picker show-toolbar title="开始时间" :columns="datePicker" @confirm="onStartDateConfirm2" @cancel="showStartDatePicker2 = false"/>
      </van-popup>
      <van-field readonly clickable :value="obj.endDate2" name="obj.endDate2" label="结束时间" placeholder="点击选择工作结束时间" @click="showEndDatePicker2 = true"/>
      <van-popup v-model="showEndDatePicker2" position="bottom">
        <van-picker show-toolbar title="结束时间" :columns="datePicker" @confirm="onEndDateConfirm2" @cancel="showEndDatePicker2 = false"/>
      </van-popup>
      <van-field v-model="obj.company2" name="obj.company2" label="单位全称" placeholder="请输入单位全称" />
      <van-field v-model="obj.post2" name="obj.post2" label="职位" placeholder="请输入职位" />
      <van-field v-model="obj.superior2" name="obj.superior2" label="直接上级" placeholder="请输入直接上级姓名" />
      <van-field v-model="obj.tel2" name="obj.tel2" label="直接上级电话" placeholder="请输入直接上级电话" type="tel" />
      <div style="margin: 16px 16px 0">
        <van-button round block type="primary" @click="saveJob2" native-type="button">
          保存
        </van-button>
      </div>
    </van-popup>
    <!--工作履历 区域一-->
    <van-popup v-model="showJob3" position="bottom" :style="{ height: '100%' }" >
      <div class="van-nav">
        <div class="van-nav-title">工作履历</div>
      </div>
      <van-field readonly clickable :value="obj.startDate3" name="obj.startDate3" label="开始时间" placeholder="点击选择工作开始时间" @click="showStartDatePicker3 = true"/>
      <van-popup v-model="showStartDatePicker3" position="bottom">
        <van-picker show-toolbar title="开始时间" :columns="datePicker" @confirm="onStartDateConfirm3" @cancel="showStartDatePicker3 = false"/>
      </van-popup>
      <van-field readonly clickable :value="obj.endDate3" name="obj.endDate3" label="结束时间" placeholder="点击选择工作结束时间" @click="showEndDatePicker3 = true"/>
      <van-popup v-model="showEndDatePicker3" position="bottom">
        <van-picker show-toolbar title="结束时间" :columns="datePicker" @confirm="onEndDateConfirm3" @cancel="showEndDatePicker3 = false"/>
      </van-popup>
      <van-field v-model="obj.company3" name="obj.company3" label="单位全称" placeholder="请输入单位全称" />
      <van-field v-model="obj.post3" name="obj.post3" label="职位" placeholder="请输入职位" />
      <van-field v-model="obj.superior3" name="obj.superior3" label="直接上级" placeholder="请输入直接上级姓名" />
      <van-field v-model="obj.tel3" name="obj.tel3" label="直接上级电话" placeholder="请输入直接上级电话" type="tel" />
      <div style="margin: 16px 16px 0">
        <van-button round block type="primary" @click="saveJob3" native-type="button">
          保存
        </van-button>
      </div>
    </van-popup>
  </van-form>

</template>
<script>
  import { saveOrUpdate } from '@/api/interview'
  import { Dialog } from 'vant'
  import moment from 'moment'

  export default {
    data() {
      return {
        obj: {
          // 基本信息
          name: '',
          sex: '',
          position: '', // 应聘职位
          interviewer: '', // 面试官
          phone: '',
          email: '',
          birthday: '',
          place: '', // 籍贯
          nation: '', // 民族
          marryStatus: '',
          major: '',
          address: '',
          socialSecurity: '', // 社保状态
          currentSalary: '', // 当前薪资
          expectedSalary: '', // 期望薪资
          // 教育经历
          schoolName1: '',
          education1: '',
          timeSolt1: '',
          major1: '',
          schoolName2: '',
          education2: '',
          timeSolt2: '',
          major2: '',
          schoolName3: '',
          education3: '',
          timeSolt3: '',
          major3: '',
          // 工作履历
          startDate1: '',
          endDate1: '',
          company1: '',
          post1: '', // 岗位
          superior1: '', // 上级
          tel1: '', // 电话
          startDate2: '',
          endDate2: '',
          company2: '',
          post2: '',
          superior2: '',
          tel2: '',
          startDate3: '',
          endDate3: '',
          company3: '',
          post3: '',
          superior3: '',
          tel3: ''
        },
        showInterviewerPicker: false,
        currentDate: new Date(1995, 0, 1),
        showBirthdayPicker: false,
        nationColumns: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族', '彝族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族', '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族', '乌孜别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族'],
        showNationPicker: false,
        showSexPicker: false,
        showPositionPicker: false,
        showMarryPicker: false,

        eduAddIcon: true,
        showEdu1: false,
        showEduPicker1: false,
        showTimeSoltPicker1: false,
        showEdu2: false,
        showEduPicker2: false,
        showTimeSoltPicker2: false,
        showEdu3: false,
        showEduPicker3: false,
        showTimeSoltPicker3: false,
        eduLoading: true,
        eduCell2: false,
        eduCell3: false,
        educationPicker: [
          {
            values: ['大专', '本科', '硕士'],
            defaultIndex: 1
          }, {
            values: ['全日制', '非全日制'],
            defaultIndex: 0
          }
        ],
        timeSoltPicker: [
          {
            values: ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'],
            defaultIndex: 5
          }, {
            values: ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'],
            defaultIndex: 1
          }
        ],
        jobAddIcon: true,
        jobLoading: true,
        showJob1: false,
        showStartDatePicker1: false,
        showEndDatePicker1: false,
        showJob2: false,
        showStartDatePicker2: false,
        showEndDatePicker2: false,
        showJob3: false,
        showStartDatePicker3: false,
        showEndDatePicker3: false,
        jobCell2: false,
        jobCell3: false,
        datePicker: [
          {
            values: ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'],
            defaultIndex: 1
          }, {
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            defaultIndex: 0
          }
        ],
        submitTip: false,
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(2005, 0, 1)
      }
    },
    methods: {
      onBirthdayConfirm(value) {
        this.obj.birthday = moment(value).format('YYYY-MM-DD')
        this.showBirthdayPicker = false
      },
      onNationConfirm(value) {
        this.obj.nation = value
        this.showNationPicker = false
      },
      onSexConfirm(value) {
        this.obj.sex = value
        this.showSexPicker = false
      },
      onPositionConfirm(value) {
        this.obj.position = value
        this.showPositionPicker = false
      },
      onEduConfirm1(value) {
        this.obj.education1 = value[0] + '-' + value[1]
        this.showEduPicker1 = false
      },
      onTimeSoltConfirm1(value) {
        console.log(value)
        this.obj.timeSolt1 = value[0] + '-' + value[1]
        this.showTimeSoltPicker1 = false
      },
      showEduFunc() {
        if (this.obj.schoolName1.length === 0) {
          this.showEdu1 = true
        } else if (this.obj.schoolName2.length === 0) {
          this.showEdu2 = true
        } else if (this.obj.schoolName3.length === 0) {
          this.showEdu3 = true
        } else {
          this.eduAddIcon = false
        }
      },
      showJobFunc() {
        if (this.obj.company1.length === 0) {
          this.showJob1 = true
        } else if (this.obj.company2.length === 0) {
          this.showJob2 = true
        } else if (this.obj.company3.length === 0) {
          this.showJob3 = true
        } else {
          this.jobAddIcon = false
        }
      },
      saveEdu1() {
        if (this.obj.schoolName1.length === 0) {
          this.showEdu1 = false
          return
        }
        this.showEdu1 = false
        this.eduLoading = false
      },
      onEduConfirm2(value) {
        this.obj.education2 = value[0] + '-' + value[1]
        this.showEduPicker2 = false
      },
      onTimeSoltConfirm2(value) {
        this.obj.timeSolt2 = value[0] + '-' + value[1]
        this.showTimeSoltPicker2 = false
      },
      saveEdu2() {
        if (this.obj.schoolName2.length === 0) {
          this.showEdu2 = false
          return
        }
        this.showEdu2 = false
        this.eduLoading = false
        this.eduCell2 = true
      },
      onEduConfirm3(value) {
        this.obj.education3 = value[0] + '-' + value[1]
        this.showEduPicker3 = false
      },
      onTimeSoltConfirm3(value) {
        this.obj.timeSolt3 = value[0] + '-' + value[1]
        this.showTimeSoltPicker3 = false
      },
      saveEdu3() {
        if (this.obj.schoolName3.length === 0) {
          this.showEdu3 = false
          return
        }
        this.showEdu3 = false
        this.eduLoading = false
        this.eduCell3 = true
      },
      onInterviewerConfirm(value) {
        this.obj.interviewer = value
        this.showInterviewerPicker = false
      },
      onMarryConfirm(value) {
        this.obj.marryStatus = value
        this.showMarryPicker = false
      },
      onStartDateConfirm1(value) {
        this.obj.startDate1 = value[0] + '-' + value[1]
        this.showStartDatePicker1 = false
      },
      onEndDateConfirm1(value) {
        this.obj.endDate1 = value[0] + '-' + value[1]
        this.showEndDatePicker1 = false
      },
      onStartDateConfirm2(value) {
        this.obj.startDate2 = value[0] + '-' + value[1]
        this.showStartDatePicker2 = false
      },
      onEndDateConfirm2(value) {
        this.obj.endDate2 = value[0] + '-' + value[1]
        this.showEndDatePicker2 = false
      },
      onStartDateConfirm3(value) {
        this.obj.startDate3 = value[0] + '-' + value[1]
        this.showStartDatePicker3 = false
      },
      onEndDateConfirm3(value) {
        this.obj.endDate3 = value[0] + '-' + value[1]
        this.showEndDatePicker3 = false
      },
      saveJob1() {
        if (this.obj.company1.length === 0) {
          this.showJob1 = false
          return
        }
        this.showJob1 = false
        this.jobLoading = false
      },
      saveJob2() {
        if (this.obj.company2.length === 0) {
          this.showJob2 = false
          return
        }
        this.showJob2 = false
        this.jobLoading = false
        this.jobCell2 = true
      },
      saveJob3() {
        if (this.obj.company3.length === 0) {
          this.showJob3 = false
          return
        }
        this.showJob3 = false
        this.jobLoading = false
        this.jobCell3 = true
      },
      jobFormatter(type, val) {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return `${val}月`
        }
        return val
      },
      onSubmit(values) {
        Dialog.confirm({
          title: '声明',
          message: '本人声明所提供一切信息均准确且属实，同意公司对本人所提供信息作核查，如有隐瞒或虚假，入职后公司有权即时解聘本人而无需做出任何赔偿。'
        }).then(() => {
          saveOrUpdate(this.obj).then((result) => {
            this.$router.push({
              path: '/interview/success'
            })
          })
        })
      },
      handleOk() {
        saveOrUpdate(this.obj).then((result) => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    filters: {
      timeSoltFilter: function(value) {
        if (value == null) return null
        return value[0] + '-' + value[1]
      },
      startDateFilter: function(value) {
        if (value == null) return null
        return value.replace(new RegExp(',', 'g'), '-')
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
  .van-block-title {
    color: #646566;
    font-size: 16px;
  }
  .validate-field > .van-field__label > span {
    padding: 0px 13px 0px 0px;
    background-repeat: no-repeat;
    background-position: 100% 1px;
    background-image: url(../../assets/star.png);
  }
</style>
