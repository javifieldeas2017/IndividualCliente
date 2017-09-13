export default {
  name : 'Detail',
  data() {
    return {
      urlService: 'http://localhost:50479/api/Usuarios/',
      usuario: {},
      Tipo: "",
      usuarioBackUp: {},
      isEditable: false,
      tipos: ["Estudiante", "Trabajador", "Desempleado", "Jubilado", "Familia numerosa"]
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
      var propiedades = ["NIF", "Tipo", "Nombre", "Domicilio", "Telefono"];
      var disable = true;
      for (var i = 0; i < propiedades.length; i++) {
        if (this.usuario[propiedades[i]] != this.usuarioBackUp[propiedades[i]]) {
          disable = false;
          break;
        }
      }
      if (this.Tipo != this.usuario.Tipo) 
        disable = false;
      return (disable || !this.isEditable);
    }
  },
  methods : {
    notValid: function () {
      var mensaje = "";
      if (!this.Tipo) {
        mensaje += "&#9888; Seleccione un tipo.<br>";
      }

      if (!this.usuario.NIF) 
        mensaje += "&#9888; Escriba el NIF.<br>";
      else 
        mensaje = this.validarNif(this.usuario.NIF);

      if (!this.usuario.Nombre || this.usuario.Nombre.length < 8 || this.usuario.Nombre.length > 120) {
        mensaje += "&#9888; El nombre tiene que tener entre 8 y 120 caracteres.<br>";
      }

      if (!this.usuario.Domicilio || this.usuario.Domicilio.length < 8 || this.usuario.Domicilio.length > 120) {
        mensaje += "&#9888; El domicilio tiene que tener entre 8 y 120 caracteres.<br>";
      }

      if (isNaN(parseInt(this.usuario.Telefono)) || this.usuario.Telefono.length < 7) {
        mensaje += "&#9888; El teléfono debe ser un número entero de al menos 8 dígitos.<br>";
      }

      return mensaje;
    },
    validarNif: function (nif) {
      var expreg = /^\d{8}[a-zA-Z]$/;
      var dniMessage = "";
      if (expreg.test(nif)) {
        var numero = nif.substr(0, nif.length - 1);
        numero = numero % 23;
        var letraExtraida = nif.substr(nif.length - 1, 1);
        var letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letraExtraida.toUpperCase()) {
          dniMessage = '&#9888; NIF erróneo, la letra del NIF no se corresponde.<br>';
        }
      } else {
        dniMessage = '&#9888; NIF erróneo, formato no válido (ejemplo válido: 12345678A).<br>';
      }
      return dniMessage;
    },
    cancelarEdicion() {
      if (!Object.keys(this.usuarioBackUp).length) {
        this.Tipo = "";
      } else {
        this.Tipo = this.usuarioBackUp.Tipo;
      }
      this.usuario = JSON.parse(JSON.stringify(this.usuarioBackUp))
    },
    goToMaestro() {
      this
        .$router
        .push('/UsuarioMaestro');
    },
    getID() {
      let _this = this
      this.idUsuario = this.$route.params.id
      if (this.$route.params.id) {
        $.ajax({
          type: 'GET',
          url: this.urlService + this.idUsuario,
          success: function (response) {
            _this.usuario = JSON.parse(JSON.stringify(response))
            _this.Tipo = _this.usuario.Tipo;
            _this.Categoria = _this.usuario.Categoria;
            _this.usuarioBackUp = JSON.parse(JSON.stringify(response))
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
      this.usuario.Tipo = this.Tipo;
      this.usuario.Categoria = this.Categoria;
      var mensaje = this.notValid();
      if (mensaje) {
        bootbox.alert({message: mensaje, size: 'small'})
      } else {
        $.ajax({
          type: 'POST',
          url: this.urlService,
          data: _this.usuario,
          success: (response) => {
            _this.usuario = {};
            bootbox.alert({
              message: "¡Guardado realizado con éxito!",
              size: 'small',
              callback: function () {
                _this
                  .$router
                  .push('/UsuarioMaestro');
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
            _this.usuario.Tipo = _this.Tipo;
            _this.usuario.Categoria = _this.Categoria;
            if (result) {
              $.ajax({
                type: 'PUT',
                url: _this.urlService + _this.idUsuario,
                data: _this.usuario,
                success: (response) => {
                  _this.usuario = {};
                  bootbox.alert({
                    message: "¡Actualización realizada con éxito!",
                    size: 'small',
                    callback: function () {
                      _this
                        .$router
                        .push('/UsuarioMaestro');
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
