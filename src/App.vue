<template>
  <div class="">
    <Index />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    height: 100%;
  }
  body {
    /*font-size: .32rem;*/
    padding: 0;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif;
    /*font-family: Tahoma, Arial, Roboto, 'Droid Sans', 'Helvetica Neue', 'Droid Sans Fallback', 'Heiti SC', 'Hiragino Sans GB', Simsun, sans-self;*/

    -webkit-font-smoothing: antialiased;
    /*font-family: Tahoma, Arial, Roboto, 'Droid Sans', 'Helvetica Neue', 'Droid Sans Fallback', 'Heiti SC', 'Hiragino Sans GB', Simsun, sans-self;*/
    &.pc {
      max-width: 375px;
    }
  }

  A {
    text-decoration: none;
  }

  button, input, input:focus, input[type=checkbox]:focus, input[type=file]:focus, input[type=radio]:focus {
    outline: 0;
  }

  a,
  button,
  input,
  optgroup,
  select,
  /*textarea, div {*/
    /*-webkit-tap-highlight-color: rgba(0, 0, 0, 0);*/
    /*-webkit-touch-callout: none;*/
    /*-webkit-user-select: none;*/
  /*}*/
  li{
    list-style: none;
  }
  .clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size:0;
  }
  .clearfix {*zoom:1;}.clear{clear: both;}
  .content{
    &>div{
      float: left;
    }
  }
</style>
