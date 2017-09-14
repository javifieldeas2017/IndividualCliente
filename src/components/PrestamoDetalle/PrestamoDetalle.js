export default {
  name : 'Detail',
  data() {
    return {
      urlService: 'http://localhost:50479/api/Prestamos/',
      recursos: {},
      usuarios: {},
      radiosTipo: [
        "Libro", "Video", "Audio"
      ],
      selectedRadio: "",
      selectedRecurso: "",
      selectedNif: "",
      selectedRecepcion: "",
      selectRecursos: "",
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
      var propiedades = [
        "NIF",
        "ISBN",
        "ISAN",
        "ISMN",
        "Recepcion",
        "Devolucion",
        "Devuelto"
      ];
      var disable = true;
      /* debugger */
      for (var i = 0; i < propiedades.length; i++) {
        if (this.prestamo[propiedades[i]] != this.prestamoBackUp[propiedades[i]]) {
          disable = false;
          break;
        }
      }
      if (this.selectedNif != this.prestamoBackUp.NIF) {
        disable = false;
      }

      switch (this.selectedRadio) {
        case "Libro":
        if(this.selectedRecurso != this.prestamoBackUp.ISBN){
          disable = false;
        }
          break;
        case "Video":
        if(this.selectedRecurso != this.prestamoBackUp.ISAN){
          disable = false;
        }
          break;
        case "Audio":
        if(this.selectedRecurso != this.prestamoBackUp.ISMN){
          disable = false;
        }
          break;
        default:
          break;
      }

      /* debugger */
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
    setSelectIdRecurso(tipoId) {
      var filtrados = this
        .recursos
        .filter(function (recurso) {
          return recurso.Tipo == tipoId;
        })
      var codigo = "";
      switch (tipoId) {
        case "Libro":
          codigo = "ISBN"
          break;
        case "Video":
          codigo = "ISAN"
          break;
        case "Audio":
          codigo = "ISMN"
          break;
        default:
          break;
      }
      filtrados
        .forEach(function (recurso) {
          recurso.idDelRecurso = recurso[codigo];
        });
      this.selectRecursos = filtrados;
    },
    notValid: function () {
      var mensaje = "";
      if (!this.selectedNif) {
        mensaje += "&#9888; Seleccione un NIF.<br>";
      }

      if (!this.selectedRadio) {
        mensaje += "&#9888; Seleccione un tipo de recurso.<br>";
      }

      if(this.selectedRadio == 'Libro' && !this.selectedRecurso)
      mensaje += "&#9888; Seleccione un ISBN.<br>";

      if(this.selectedRadio == 'Video' && !this.selectedRecurso)
      mensaje += "&#9888; Seleccione un ISAN.<br>";

      if(this.selectedRadio == 'Audio' && !this.selectedRecurso)
      mensaje += "&#9888; Seleccione un ISMN.<br>";

      return mensaje;
    },
    cancelarEdicion: function() {
      if (!Object.keys(this.prestamoBackUp).length) {
        this.selectedNif = "";
        this.selectedRadio = "";
        this.selectedRecurso = "";
        this.selectedRecepcion = "";
      } else {
        this.selectedNif = this.prestamoBackUp.NIF;
        this.selectedRadio =  this.prestamo.ISBN == 0? (this.prestamo.ISAN == 0? "Audio" : "Video") :  "Libro";
        this.selectedRecepcion =  this.prestamoBackUp.Recepcion;
        this.selectedRecurso = this.prestamoBackUp.ISBN ==0? (this.prestamoBackUp.ISAN ==0? this.prestamoBackUp.ISMN: this.prestamoBackUp.ISAN):this.prestamoBackUp.ISBN;
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
            _this.selectedNif = _this.prestamo.NIF;
            _this.selectedRecepcion = _this.prestamo.Recepcion;
            _this.selectedRadio =  _this.prestamo.ISBN == 0? (_this.prestamo.ISAN == 0? "Audio" : "Video") :  "Libro";

            _this.selectedRecurso =  _this.prestamo.ISBN == 0? (_this.prestamo.ISAN == 0? _this.prestamo.ISMN : _this.prestamo.ISAN) :  _this.prestamo.ISBN;
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
      this.prestamo.NIF = this.selectedNif;
      this.prestamo.Recepcion = this.selectedRecepcion;
      this.prestamo.ISBN = this.selectedRadio == 'Libro'
        ? this.selectedRecurso
        : 0;
      this.prestamo.ISAN = this.selectedRadio == 'Video'
        ? this.selectedRecurso
        : 0;
      this.prestamo.ISMN = this.selectedRadio == 'Audio'
        ? this.selectedRecurso
        : 0;
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
/*             _this.prestamo.Tipo = _this.Tipo;
            _this.prestamo.Categoria = _this.Categoria; */
            _this.prestamo.NIF = _this.selectedNif;
            _this.prestamo.Recepcion = _this.selectedRecepcion;
            _this.prestamo.ISBN = _this.selectedRadio == 'Libro'
              ? _this.selectedRecurso
              : 0;
            _this.prestamo.ISAN = _this.selectedRadio == 'Video'
              ? _this.selectedRecurso
              : 0;
            _this.prestamo.ISMN = _this.selectedRadio == 'Audio'
              ? _this.selectedRecurso
              : 0;
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
  },
  mounted : function () {
    this.getUsuarios();
    this.getRecursos();
  },beforeUpdate: function(){
    this.setSelectIdRecurso(this.selectedRadio);
  }
};
