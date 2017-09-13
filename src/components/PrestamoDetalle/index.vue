<template>
	<div id="PrestamoDetalle">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<div class="col-xs-6">
						<button @click="goToMaestro" class="btn btn-primary pull-left">
							<i class="fa fa-mail-reply"></i> Volver
						</button>
					</div>

					<div v-if="Object.keys(prestamoBackUp).length" class="col-xs-6">
						<button @click="isEditable = !isEditable" class="btn btn-warning pull-right">
							<i class="fa fa-pencil"></i> Editar
						</button>
					</div>
					<div class="col-xs-12">
						<h2>{{!Object.keys(prestamoBackUp).length?"Nuevo prestamo":"Detalle del Prestamo"}}</h2>
					</div>
				</div>
			</div>
			<form @submit.prevent="">
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Usuario</label>
						<div class="col-xs-9">
							<select name="NIF" id="NIF" :disabled="!isEditable" class="form-control input" aria-label="NIF">
								<option value="" disabled selected hidden>Seleccione NIF</option>
								<option v-for="usuario in usuarios" :value="usuario.NIF">{{NIF}}-{{usuario.Nombre}}</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<div class="containerRadio" v-for="(item, index) in radiosTipo" :key="index">
							<label for="tipo" class="radio-inline"><input type="radio" name="tipo" :value="item" v-model="radioSeleccionado" >{{item}}</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Domicilio</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="prestamo.Domicilio" type="text" class="form-control" aria-label="Domicilio">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Teléfono</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="prestamo.Telefono" type="number" class="form-control" aria-label="Telefono">
						</div>
					</div>
				</div>

				<div id="containerBtnInferiores" class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<div id="containerCancelar" class="col-xs-6">
						<button @click="cancelarEdicion()" id="boton_cancelar" class="btn btn-danger pull-left">
							<i class="fa fa-times"></i> Cancelar
						</button>
					</div>
					<div id="containerGuardar" class="col-xs-6">
						<button v-if="!Object.keys(prestamoBackUp).length" @click="guardarDatos()" id="boton_guardar" class="btn btn-success pull-right">
							<i class="fa fa-floppy-o"></i>Guardar
						</button>
					</div>
					<div id="containerActualizar" class="col-xs-6">
						<button v-if="Object.keys(prestamoBackUp).length" :disabled="disableUpdate" @click="actualizarDatos()" id="boton_actualizar" class="btn btn-success pull-right">
							<i class="fa fa-undo"></i> Actualizar
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script src="./PrestamoDetalle.js" type="text/javascript" charset="utf-8"></script>
<style src="./PrestamoDetalle.css" type="text/css" media="screen"></style>