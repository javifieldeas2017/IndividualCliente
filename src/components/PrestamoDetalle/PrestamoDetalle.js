export default {
  name : 'Detail',
  data() {
    return {
      urlService: 'http://localhost:50479/api/Prestamos/',
      recursos : {},
      usuarios : {},
      radiosTipo: ["Libro", "Video", "Audio"],
      radioSeleccionado : "",
      selectRecursos: {},
      prestamo: {},
      prestamoBackUp: {},
      isEditable: false
    }
  },
  created() {
    this.getID()
  },
  watch : {
    '$route': 'getID'
  },
  computed : {
    disableUpdate: function () {
      var propiedades = ["NIF", "ISBN", "ISAN", "ISMN", "Recepcion", "Devolucion","Devuelto"];
      var disable = true;
      for (var i = 0; i < propiedades.length; i++) {
        if (this.prestamo[propiedades[i]] != this.prestamoBackUp[propiedades[i]]) {
          disable = false;
          break;
        }
      }
      if (this.Tipo != this.prestamo.Tipo) 
        disable = false;
      return (disable || !this.isEditable);
    }
  },
  methods : {
    getRecursos() {
      let _this = this;
      $.ajax({
        type: 'GET',
        url: "http://localhost:50479/api/Recursos/",
        success: function (response) {
          _this.recursos = JSON.parse(JSON.stringify(response))
        },
        error: _this.error
      })
    },
    getUsuarios() {
      let _this = this;
      $.ajax({
        type: 'GET',
        url: "http://localhost:50479/api/Usuarios/",
        success: function (response) {
          _this.usuarios = JSON.parse(JSON.stringify(response))
        },
        error: _this.error
      })
    },
    notValid: function () {
      var mensaje = "";
      if (!this.Tipo) {
        mensaje += "&#9888; Seleccione un tipo.<br>";
      }

      if (!this.NIF) {
        mensaje += "&#9888; Seleccione un NIF.<br>";
      }
      return mensaje;
    },
    cancelarEdicion() {
      if (!Object.keys(this.prestamoBackUp).length) {
        this.Tipo = "";
      } else {
        this.Tipo = this.prestamoBackUp.Tipo;
      }
      this.prestamo = JSON.parse(JSON.stringify(this.prestamoBackUp))
    },
    goToMaestro() {
      this
        .$router
        .push('/PrestamoMaestro');
    },
    getID() {
      let _this = this
      this.idPrestamo = this.$route.params.id
      if (this.$route.params.id) {
        $.ajax({
          type: 'GET',
          url: this.urlService + this.idPrestamo,
          success: function (response) {
            _this.prestamo = JSON.parse(JSON.stringify(response))
            _this.Tipo = _this.prestamo.Tipo;
            _this.Categoria = _this.prestamo.Categoria;
            _this.prestamoBackUp = JSON.parse(JSON.stringify(response))
            this.isEditable = false;
          },
          error: _this.error
        })
      } else {
        this.isEditable = true;
      }
    },
    guardarDatos() {
      let _this = this;
      this.prestamo.Tipo = this.Tipo;
      this.prestamo.Categoria = this.Categoria;
      var mensaje = this.notValid();
      if (mensaje) {
        bootbox.alert({message: mensaje, size: 'small'})
      } else {
        $.ajax({
          type: 'POST',
          url: this.urlService,
          data: _this.prestamo,
          success: (response) => {
            _this.prestamo = {};
            bootbox.alert({
              message: "¡Guardado realizado con éxito!",
              size: 'small',
              callback: function () {
                _this
                  .$router
                  .push('/PrestamoMaestro');
              }
            });
          },
          error: _this.error
        })
      }
    },
    actualizarDatos() {
      let _this = this;
      if (this.notValid()) {
        bootbox.alert({
          message: this.notValid(),
          size: 'small'
        })
      } else {
        bootbox.confirm({
          message: "¿Seguro que desea actualizar?",
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
            _this.prestamo.Tipo = _this.Tipo;
            _this.prestamo.Categoria = _this.Categoria;
            if (result) {
              $.ajax({
                type: 'PUT',
                url: _this.urlService + _this.idPrestamo,
                data: _this.prestamo,
                success: (response) => {
                  _this.prestamo = {};
                  bootbox.alert({
                    message: "¡Actualización realizada con éxito!",
                    size: 'small',
                    callback: function () {
                      _this
                        .$router
                        .push('/PrestamoMaestro');
                    }
                  })

                },
                error: _this.error
              })
            }
          }
        });
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      bootbox.alert("Error!->" + errorThrown + "-->" + xhr.responseText);
    }
  }
}
