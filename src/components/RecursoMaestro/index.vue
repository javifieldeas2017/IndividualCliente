<template>
	<div id="RecursoMaestro">
		<div class="container-fluid">
			<div id="barra_botones" class="row">
				<h3>Catálogo de recursos</h3>
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
				<div v-for="item in items" class="row list-group-item" :key="item.Id">
					<router-link :to="{ name: 'RecursoDetalle', params: { id: item.Id }}">
						<div class="col col-xs-3">
							<div class="circulo" :class="item.Tipo">
								<i v-if="item.Tipo =='Libro'" class="fa fa-book fa-fw" aria-hidden="true"></i>
								<i v-if="item.Tipo =='Video'" class="fa fa-film fa-fw" aria-hidden="true"></i>
								<i v-if="item.Tipo =='Audio'" class="fa fa-music fa-fw" aria-hidden="true"></i>
							</div>
						</div>
						<div id="main_info" class="col col-xs-6 col-sm-6">
							<div> {{ item.Titulo }} (de {{ item.Autor }}) </div>
							<div> {{ item.Categoria }}</div>
						</div>
					</router-link>
					<div class="col col-xs-3">
						<button @click="eliminarObjeto(item.Id)" class="boton_eliminar btn btn-default">
							<i class="fa fa-trash"></i> <span class="hidden-xs">Eliminar</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./Recursos.js" type="text/javascript" charset="utf-8"></script>
<style src="./Recursos.css" type="text/css" media="screen"></style>