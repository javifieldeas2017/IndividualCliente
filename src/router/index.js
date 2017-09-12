import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import RecursoMaestro from '../components/RecursoMaestro'
import RecursoDetalle from '../components/RecursoDetalle'
import UsuarioMaestro from '../components/UsuarioMaestro'
import UsuarioDetalle from '../components/UsuarioDetalle'


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
    },
    {
      path: '/UsuarioMaestro/',
      name: 'UsuarioMaestro',
      component: UsuarioMaestro
    },
    {
      path: '/UsuarioDetalle/',
      name: 'UsuarioDetalle',
      component: UsuarioDetalle
    },
    {
      path: '/UsuarioDetalle/:id',
      name: 'UsuarioDetalleId',
      component: UsuarioDetalle
    }
  ],
  mode: 'hash'
})
