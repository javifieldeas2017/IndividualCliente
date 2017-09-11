import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import RecursoMaestro from '../components/RecursoMaestro'
import RecursoDetalle from '../components/RecursoDetalle'


export default new Router({
  routes: [
    {
      path: '/RecursoMaestro/',
      name: 'RecursoMaestro',
      component: RecursoMaestro
    },
    {
      path: '/RecursoDetalle/',
      name: 'RecursoDetalle',
      component: RecursoDetalle
    },
    {
      path: '/RecursoDetalle/:id',
      name: 'RecursoDetalleId',
      component: RecursoDetalle
    }
  ],
  mode: 'hash'
})
