# 说明
自己做的一个供自己和同事记录面试情况的wap端页面，主要包含以下功能
1. 面试者扫码访问面试登记页，填写面试信息
2. 面试官上传面试题，填写面试评价  

## 构建步骤
1. 下载后端代码运行
2. 配置config/index.js中module.exports.dev.proxyTable./apis.target为后台系统地址
3. 执行前端构建操作
```shell script
# Clone project
git clone https://github.com/sunafei/hr-wap.git

# 进入web项目,xsh-wap
cd hr-wap

# Install dependencies 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org 

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 参考
前端模板[vant](https://github.com/youzan/vant-weapp.git)
