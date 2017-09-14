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
						<h2>{{!Object.keys(prestamoBackUp).length?"Nuevo préstamo":"Detalle del préstamo"}}</h2>
					</div>
				</div>
			</div>
			<form @submit.prevent="">
				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Usuario</label>
						<div class="col-xs-9">
							<select v-model="selectedNif" name="NIF" id="NIF" :disabled="!isEditable" class="form-control input" aria-label="NIF">
								<option v-if="!Object.keys(prestamoBackUp).length" value="" disabled selected hidden>Seleccione usuario</option>
								<!-- <option v-else value="{{selectedNif}}" disabled selected hidden>{{selectedNif}}</option> -->
								<option v-for="usuario in usuarios" :value="usuario.NIF">{{usuario.Nombre}} - {{usuario.NIF}}</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row radios">
					<h5>Seleccione tipo de recurso</h5>
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label v-for="(item, index) in radiosTipo" :key="index" for="tipo" class="radio-inline"><input :disabled="!isEditable" @click="setSelectIdRecurso(item)" type="radio" name="tipo" :value="item" v-model="selectedRadio">{{item}}</label>	
					</div>
				</div>

				<div v-if="selectedRadio !=''" class="row">


					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label v-if="selectedRadio ==''" class="col-xs-3"></label>
						<label v-if="selectedRadio =='Libro'" class="col-xs-3">ISBN</label>
						<label v-if="selectedRadio =='Video'" class="col-xs-3">ISAN</label>
						<label v-if="selectedRadio =='Audio'" class="col-xs-3">ISMN</label>
						<div class="col-xs-9">
							<select v-model="selectedRecurso" name="NIF" id="NIF" :disabled="!isEditable" class="form-control input" aria-label="ISXN">
								<option v-if="!Object.keys(prestamoBackUp).length" value="" disabled selected hidden>Seleccione código del recurso</option>
								<!-- <option v-else :value="selectedRecurso" disabled selected hidden>{{selectedRecurso}}</option> -->
								<option v-for="recurso in selectRecursos" :value="recurso.idDelRecurso" :key="recurso.idDelRecurso">{{recurso.idDelRecurso}} - {{recurso.Titulo}}</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Recepción</label>
						<div class="col-xs-9">
							<input placeholder="Fecha seleccionada" v-bind:disabled="!isEditable" v-model="selectedRecepcion" type="date" class="form-control" aria-label="Recepcion">
						</div>
					</div>
				</div>

				<div v-if="Object.keys(prestamoBackUp).length" class="row">
					<div class="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
						<label class="col-xs-3">Devolución</label>
						<div class="col-xs-9">
							<input onkeydown="return false" v-bind:disabled="!isEditable" v-model="prestamo.Devolucion" type="date" class="form-control" aria-label="Devolucion">
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