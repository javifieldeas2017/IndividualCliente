import $ from 'jquery'
export default {
  name : 'UsuarioMaestro',
  data() {
    return {urlService: 'http://localhost:50479/api/Usuarios/' , items: [], isOpen: false}
  },
  methods : {
    getTodos() {
      let _this = this;
      $.ajax({
        type: 'GET',
        url: _this.urlService,
        success: function (response) {
          _this.items = JSON.parse(JSON.stringify(response))
        },
        error: _this.error
      })
    },
    eliminarObjeto(id) {
      let _this = this;

      bootbox.confirm({
        message: "¿Eliminar de forma permanente?",
        size: 'small',
        buttons: {
          confirm: {
            label: 'Si',
            className: 'btn-success'
          },
          cancel: {
            label: 'No',
            className: 'btn-danger'
          }
        },
        callback: function (result) {
          if (result) {
            $.ajax({
              type: 'DELETE',
              url: _this.urlService + id,
              success: function (response) {},
              error: _this.error,
              complete: function () {
                _this.getTodos();
                bootbox.alert({message: "¡Eliminación realizada con éxito!", size: 'small'})
              }
            })
          }
        }
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      bootbox.alert("Error!->" + errorThrown + "-->" + xhr.responseText);
    },
    nuevoitem: function () {
      this
        .$router
        .push('/UsuarioDetalle');
    }
  },
  created : function () {
    this.getTodos()
  }
}