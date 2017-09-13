<template>
  <div id="app">
    <navigator :datos="datos"></navigator>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import './assets/css/style.css'
import navigator from './components/Navigator/'
export default {
  name: 'app',
  data() {
    return {
      datos: {
        logo: require('./assets/img/books.png'),
        nombre: 'Biblioteca CIC'
      }
    }
  },
  components: {
    navigator
  }
}
</script>