<template>
  <div id="app">
    <navigator :datos="datos"></navigator>
    <router-view></router-view>
  </div>
</template>

<script>
import navigator from './components/Navigator/'
export default {
  name: 'app',
  data() {
    return {
      datos: {
        logo: require('./assets/img/checklist.png'),
        nombre: 'Biblioteca CIC'
      }
    }
  },
  components: {
    navigator
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  opacity: 0
}

label {
  text-align: left;
}

input {
  margin-bottom: 5px
}

#insertar {
  margin-right: 30px
}
</style>