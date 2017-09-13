<template>
	<div id="UsuarioDetalle">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<div class="col-xs-6">
						<button @click="goToMaestro" class="btn btn-primary pull-left">
							<i class="fa fa-mail-reply"></i> Volver
						</button>
					</div>

					<div v-if="Object.keys(usuarioBackUp).length" class="col-xs-6">
						<button @click="isEditable = !isEditable" class="btn btn-warning pull-right">
							<i class="fa fa-pencil"></i> Editar
						</button>
					</div>
					<div class="col-xs-12">
						<h2>{{!Object.keys(usuarioBackUp).length?"Nuevo Usuario":"Detalle del Usuario"}}</h2>
					</div>
				</div>
			</div>
			<form @submit.prevent="">
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">NIF</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="usuario.NIF" type="text" class="form-control" aria-label="NIF">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Nombre</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="usuario.Nombre" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Tipo</label>
						<div class="col-xs-9">
							<select name="tipo" id="tipo" :disabled="!isEditable" v-model="Tipo" class="form-control input" aria-label="Tipo">
								<option value="" disabled selected hidden>Seleccione tipo</option>
								<option v-for="tipo in tipos" :value="tipo">{{tipo}}</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Domicilio</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="usuario.Domicilio" type="text" class="form-control" aria-label="Domicilio">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Teléfono</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="usuario.Telefono" type="number" class="form-control" aria-label="Telefono">
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
						<button v-if="!Object.keys(usuarioBackUp).length" @click="guardarDatos()" id="boton_guardar" class="btn btn-success pull-right">
							<i class="fa fa-floppy-o"></i>Guardar
						</button>
					</div>
					<div id="containerActualizar" class="col-xs-6">
						<button v-if="Object.keys(usuarioBackUp).length" :disabled="disableUpdate" @click="actualizarDatos()" id="boton_actualizar" class="btn btn-success pull-right">
							<i class="fa fa-undo"></i> Actualizar
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script src="./UsuarioDetalle.js" type="text/javascript" charset="utf-8"></script>
<style src="./UsuarioDetalle.css" type="text/css" media="screen"></style>