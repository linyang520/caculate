## 发现页项目

### 使用的技术栈：
    vue vue-router vuex axios sass
    mockjs模拟数据接口
    
### 如果遇到chromedriver node install.js 安装错误，解决办法：
    先删除node_modules安装包
    然后在根目录下执行：npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
    然后执行： npm i
    最后项目启动： npm run dev
    
### 尽量采用eslint规范代码格式

### 组件采用大驼峰式命名规则

### 变量和方法采用小驼峰命名规则

### api目录文件
    /findPage/src/api

### util文件中封装了些常用的方法
    包括bridge 判断是否为app 原生跳转方法

### config文件中主要是项目常用的配置
    包括 跟随环境变化的url前缀， 不同环境的项目配置

### store 目录 根文件及不同页面的store文件，进行分开管理

##### 业务有关配置

视频解说
dev 172 仿真 147 生产 185

特别提醒
dev 206 仿真 133 生产194

引导宣传模块
dev 251 生产 228


