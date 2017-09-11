var _ = require('lodash');
export default {
  name : 'Detail',
  data() {
    return {recurso: {}, recursoBackUp: {}, isEditable: false}
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
        "Nombre",
        "Exito",
        "Mensaje",
        "FechaInicio",
        "FechaFinal",
        "ConsumoMemoria",
        "ConsumoRed"
      ];
      var disable = true;
      for (var i = 0; i < propiedades.length; i++) {
        if (this.recurso[propiedades[i]] != this.recursoBackUp[propiedades[i]]) {
          disable = false;
          break;
        }
      }
      return (disable || !this.isEditable);
    }
  },
  methods : {
    notValid: function () {
      var mensaje = "";
      if (!this.recurso.Nombre || this.recurso.Nombre.length <= 0 || this.recurso.Nombre.length > 40) {
        mensaje += "&#9888; Nombre tiene que tener entre 1 y 40 caracteres.<br>";
      }
      if (!this.recurso.Mensaje || this.recurso.Mensaje.length <= 0 || this.recurso.Mensaje.length > 100) {
        mensaje += "&#9888; Mensaje tiene que tener entre 1 y 100 caracteres.<br>";
      }

      if (isNaN(parseFloat(this.recurso.ConsumoRed))) {
        mensaje += "&#9888; Consumo de red tiene que ser un numero.<br>";
      } else if (this.recurso.ConsumoRed <= 0)  {
        mensaje += "&#9888; Consumo de red tiene que ser un numero mayor que 0.<br>";
      }
      if (isNaN(parseFloat(this.recurso.ConsumoMemoria))) {
        mensaje += "&#9888; Consumo de memoria tiene que ser un numero.<br>";
      } else if (this.recurso.ConsumoMemoria <= 0) {
        mensaje += "&#9888; Consumo de memoria tiene que ser un numero mayor que 0.<br>";
      }
      if(!!this.recurso.FechaInicio == false){
        mensaje += "&#9888; Introduzca una fecha de inicio<br>";
      }else if (isNaN(Date.parse(this.recurso.FechaInicio.split('/').reverse().join('-')))) {
        mensaje += "&#9888; Fecha de inicio ha de ser una fecha valida, formato dd/mm/aaaa.<br>";
      }
      if(!!this.recurso.FechaFinal == false){
        mensaje += "&#9888; Introduzca una fecha final<br>";
      }else if (isNaN(Date.parse(this.recurso.FechaFinal.split('/').reverse().join('-')))) {
        mensaje += "&#9888; Fecha final ha de ser una fecha valida, formato dd/mm/aaaa.<br>";
      }


      return mensaje;
    },
    cancelarEdicion() {
      this.recurso = JSON.parse(JSON.stringify(this.recursoBackUp))
    },
    goToMaestro() {
      this
        .$router
        .push('/RecursoMaestro');
    },
    getID() {
      const _self = this
      this.idRecurso = this.$route.params.id
      if (this.$route.params.id) {
        $.ajax({
          type: 'GET',
          url: 'http://localhost:51952/api/Recursos/' + this.idRecurso,
          success: function (response) {
            _self.recurso = JSON.parse(JSON.stringify(response))
            _self.recursoBackUp = JSON.parse(JSON.stringify(response))
            this.isEditable = false;
          },
          error: _self.error
        })
      } else {
        this.isEditable = true;
      }
    },
    guardarDatos() {
      let _this = this;
      var mensaje = this.notValid();
      if (mensaje) {
        bootbox.alert({message: mensaje, size: 'small'})
      } else {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:51952/api/Recursos/',
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
            if (result) {
              $.ajax({
                type: 'PUT',
                url: 'http://localhost:51952/api/Recursos/' + _this.idRecurso,
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
    },
    convertDateFormat: function (string) {
      var info = string
        .split('-')
        .reverse()
        .join('/');
      return info;
    }
  },
  components : {}
}