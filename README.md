## 可转债收益计算器

### 为了方便可转债交易用户实时计算出目标价格

### 使用的技术栈：
    vue vue-router axios sass
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
    /src/api

### util文件中封装了些常用的方法
    包括bridge 判断是否为app 原生跳转方法

### config文件中主要是项目常用的配置
    包括 跟随环境变化的url前缀， 不同环境的项目配置


##### 业务有关配置

##### 搜索和选取结果2个接口


