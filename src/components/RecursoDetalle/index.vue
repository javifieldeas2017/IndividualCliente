<template>
	<div id="RecursoDetalle">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<div class="col-xs-6">
						<button @click="goToMaestro" class="btn btn-default pull-left">
							<i class="fa fa-mail-reply"></i> Volver
						</button>
					</div>

					<div v-if="Object.keys(recursoBackUp).length" class="col-xs-6">
						<button @click="isEditable = !isEditable" class="btn btn-default pull-right">
							<i class="fa fa-pencil"></i> Editar
						</button>
					</div>
					<div class="col-xs-12">
						<h2>{{!Object.keys(recursoBackUp).length?"Nuevo recurso":"Detalle del recurso"}}</h2>
					</div>
				</div>
			</div>
			<form @submit.prevent="">
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Tipo</label>
						<div class="col-xs-9">
							<select name="tipo" id="tipo" :disabled="!isEditable" v-model="Tipo" class="form-control input" aria-label="Tipo">
								<option value="" disabled selected hidden>Seleccione tipo</option>
								<option v-for="tipo in tipos" :value="tipo" :key="tipo">{{tipo}}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div v-if="Tipo =='Libro'" class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">ISBN</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.ISBN" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
					<div v-if="Tipo =='Video'" class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">ISAN</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.ISAN" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
					<div v-if="Tipo =='Audio'" class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">ISMN</label>
						<div class="col-xs-9">
							<input :disabled="!isEditable" v-model="recurso.ISMN" type="text" class="form-control" aria-label="Nombre">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Categoria</label>
						<div class="col-xs-9">
							<select name="categoria" id="categoria" :disabled="!isEditable" v-model="Categoria" class="form-control input" aria-label="Categoria">
								<option value="" disabled selected hidden>Seleccione categoría</option>
								<option v-for="categoria in categorias" :value="categoria">{{categoria}}</option>
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
						<label class="col-xs-3">{{Tipo == "Video"? "Director" : "Autor"}}</label>
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

				<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<div class="col-xs-6">
						<button @click="cancelarEdicion()" id="boton_cancelar" class="btn btn-default pull-left">
							<i class="fa fa-times"></i> Cancelar
						</button>
					</div>
					<div class="col-xs-6">
						<button v-if="!Object.keys(recursoBackUp).length" @click="guardarDatos()" id="boton_guardar" class="btn btn-default pull-right">
							<i class="fa fa-floppy-o"></i>Guardar
						</button>
					</div>
					<div class="col-xs-6">
						<button v-if="Object.keys(recursoBackUp).length" :disabled="disableUpdate" @click="actualizarDatos()" id="boton_actualizar" class="btn btn-default pull-right">
							<i class="fa fa-undo"></i> Actualizar
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script src="./RecursoDetalle.js" type="text/javascript" charset="utf-8"></script>
<style src="./RecursoDetalle.css" type="text/css" media="screen"></style>