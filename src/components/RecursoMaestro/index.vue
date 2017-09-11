<template>
	<div id="RecursoMaestro">
		<div class="container-fluid">
			<div id="barra_botones" class="row">
				<h3>Recursos.</h3>
				<div class="col-sm-3 col-sm-offset-9">
					<button id="insertar" @click="nuevoitem()" class="btn btn-default">
						<i class="fa fa-plus"></i> Inserción
					</button>
				</div>
			</div>
			<div v-if="items.length < 1">
				<h3>No existen recursos insertadas</h3>
			</div>
			<div v-else class="list-group col-sm-8 col-sm-offset-2">
				<div v-for="item in items" class="row list-group-item">
					<router-link :to="{ name: 'RecursoDetalle', params: { id: item.Id }}">
						<div class="col col-xs-3">
							<div class="circulo">
								<i class="fa fa-book" aria-hidden="true"></i>
							</div>
						</div>
						<div id="main_info" class="col col-xs-6 col-sm-6">
							<div> {{ item.Titulo }} </div>
							<div> {{ item.Categoria }}</div>
						</div>
					</router-link>
					<div class="col col-xs-3">
						<button @click="eliminarObjeto(item.Id)" class="boton_eliminar btn btn-default">
							<i class="fa fa-trash"></i> Eliminar
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./Recursos.js" type="text/javascript" charset="utf-8"></script>
<style src="./Recursos.css" type="text/css" media="screen"></style>