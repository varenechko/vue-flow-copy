<template>
  <div>
    <RouterView />
  </div>
</template>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: @cBaseTwo;
}

h1, h2, h3, h4, h5 {
  font-family: @ffOne;
  color: @cBaseThree;
  margin: 0;
}
</style>
