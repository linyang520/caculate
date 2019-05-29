<template>
  <div class="toast" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    min-width: (300/75)+rem;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    background: rgba(0, 0, 0, .6);
    z-index: 1580;
    &01 {
      top: 40%;
    }
  }

  .fadein {
    animation: animate_in 0.25s;
  }

  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }

  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
