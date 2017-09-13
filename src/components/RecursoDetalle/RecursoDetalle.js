export default {
  name : 'Detail',
  data() {
    return {
      urlService: 'http://localhost:50479/api/Recursos/',
      recurso: {},
      Tipo: "",
      Categoria: "",
      recursoBackUp: {},
      isEditable: false,
      tipos: [
        "Libro", "Video", "Audio"
      ],
      categorias: [
        "Literatura",
        "Ciencias",
        "Historia",
        "Idiomas",
        "Educación",
        "Arte"
      ]
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
        "ISBN",
        "ISAN",
        "ISMN",
        "idCopia",
        "Titulo",
        "Autor",
        "Anio"
      ];
      var disable = true;
      for (var i = 0; i < propiedades.length; i++) {
        if (this.recurso[propiedades[i]] != this.recursoBackUp[propiedades[i]]) {
          disable = false;
          break;
        }
      }
      if (this.Tipo != this.recurso.Tipo || this.Categoria != this.recurso.Categoria) 
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
      if (!this.Categoria) {
        mensaje += "&#9888; Seleccione una categoría.<br>";
      }
      if (!this.recurso.Titulo || this.recurso.Titulo.length <= 0 || this.recurso.Titulo.length > 120) {
        mensaje += "&#9888; El título tiene que tener entre 1 y 120 caracteres.<br>";
      }
      if (!this.recurso.Autor || this.recurso.Autor.length <= 0 || this.recurso.Autor.length > 70) {
        mensaje += "&#9888; El nombre de autor tiene que tener entre 1 y 70 caracteres.<br>";
      }
      if (isNaN(parseInt(this.recurso.Anio))) {
        mensaje += "&#9888; El año debe ser un número entero.<br>";
      }
      var tipoId;
      switch (this.Tipo) {
        case "Libro":
          if (isNaN(parseInt(this.recurso.ISBN)) || this.recurso.ISBN.length != 10) 
            tipoId = "ISBN";
          break;
        case "Video":
          if (isNaN(parseInt(this.recurso.ISAN)) || this.recurso.ISAN.length != 10) 
            tipoId = "ISAN";
          break;
        case "Audio":
          if (isNaN(parseInt(this.recurso.ISMN)) || this.recurso.ISMN.length != 10) 
            tipoId = "ISMN";
          break;
        default:
          break;
      }
      if (tipoId) 
        mensaje += "&#9888; El " + tipoId + " debe contener 10 dígitos numéricos.<br>";
      return mensaje;
    },
    cancelarEdicion() {
      if (!Object.keys(this.recursoBackUp).length) {
        this.Tipo = "";
        this.Categoria = "";
      } else {
        this.Tipo = this.recursoBackUp.Tipo;
        this.Categoria = this.recursoBackUp.Categoria;
      }
      this.recurso = JSON.parse(JSON.stringify(this.recursoBackUp))
    },
    goToMaestro() {
      this
        .$router
        .push('/RecursoMaestro');
    },
    getID() {
      let _this = this
      this.idRecurso = this.$route.params.id
      if (this.$route.params.id) {
        $.ajax({
          type: 'GET',
          url: this.urlService + this.idRecurso,
          success: function (response) {
            _this.recurso = JSON.parse(JSON.stringify(response))
            _this.Tipo = _this.recurso.Tipo;
            _this.Categoria = _this.recurso.Categoria;
            _this.recursoBackUp = JSON.parse(JSON.stringify(response))
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
      this.recurso.Tipo = this.Tipo;
      this.recurso.Categoria = this.Categoria;
      var mensaje = this.notValid();
      if (mensaje) {
        bootbox.alert({message: mensaje, size: 'small'})
      } else {
        $.ajax({
          type: 'POST',
          url: this.urlService,
          data: _this.recurso,
          success: (response) => {
            _this.recurso = {};
            bootbox.alert({
              message: "¡Guardado realizado con éxito!",
              size: 'small',
              callback: function () {
                _this
                  .$router
                  .push('/RecursoMaestro');
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
            _this.recurso.Tipo = _this.Tipo;
            _this.recurso.Categoria = _this.Categoria;
            if (result) {
              $.ajax({
                type: 'PUT',
                url: _this.urlService + _this.idRecurso,
                data: _this.recurso,
                success: (response) => {
                  _this.recurso = {};
                  bootbox.alert({
                    message: "¡Actualización realizada con éxito!",
                    size: 'small',
                    callback: function () {
                      _this
                        .$router
                        .push('/RecursoMaestro');
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
