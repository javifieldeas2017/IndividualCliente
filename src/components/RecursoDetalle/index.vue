<template>
	<div id="RecursoDetalle">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<div class="col-xs-6">
						<button @click="goToMaestro" class="btn btn-default">
							<i class="fa fa-mail-reply"></i> Volver
						</button>
					</div>

					<div v-if="Object.keys(recursoBackUp).length" class="col-xs-6">
						<button @click="isEditable = !isEditable" class="btn btn-default">
							<i class="fa fa-pencil"></i> Editar
						</button>
					</div>
					<div class="col-xs-9 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<h2>{{!Object.keys(recursoBackUp).length?"Inserte recurso nuevo":"Detalle del recurso"}}</h2>
					</div>
				</div>
			</div>
			<form @submit.prevent="">
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Tipo</label>
						<div class="col-xs-9">
							<select name="pais" id="pais" :disabled="!isEditable" v-model="recurso.Tipo" class="form-control input" aria-label="Categoria">
								<option value="" selected disabled hidden>Escoja tipo</option>
								<option>Libro</option>
								<option>Video</option>
								<option>Audio</option>
							</select>

						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">ISBN</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.ISBN" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">ISAN</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.ISAN" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">ISMN</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.ISMN" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Id. copia</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.IdCopia" type="number" class="form-control" aria-label="Nombre">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Categoria</label>
						<div class="col-xs-9">
							<select name="categoria" id="categoria" :disabled="!isEditable" v-model="recurso.Categoria" class="form-control input" aria-label="Categoria">
								<option value="" selected disabled hidden>Escoja categoría</option>
								<option>Ciencia</option>
								<option>Literatura</option>
								<option>Historia</option>
							</select>

						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Titulo</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.Titulo" type="text" class="form-control" aria-label="Titulo">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Autor</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.Autor" type="text" class="form-control" aria-label="Autor">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Año</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.Anio" type="number" class="form-control" aria-label="Anio">
						</div>
					</div>
				</div>

				<div class="row">
					<button @click="cancelarEdicion()" id="boton_cancelar" class="btn btn-default">
						<i class="fa fa-times"></i> Cancelar
					</button>

					<button v-if="!Object.keys(recursoBackUp).length" @click="guardarDatos()" id="boton_guardar" class="btn btn-default">
						<i class="fa fa-floppy-o"></i>Guardar
					</button>

					<button v-if="Object.keys(recursoBackUp).length" :disabled="disableUpdate" @click="actualizarDatos()" id="boton_actualizar" class="btn btn-default">
						<i class="fa fa-undo"></i> Actualizar
					</button>

				</div>
			</form>
		</div>
	</div>
</template>

<script src="./RecursoDetalle.js" type="text/javascript" charset="utf-8"></script>
<style src="./RecursoDetalle.css" type="text/css" media="screen"></style>