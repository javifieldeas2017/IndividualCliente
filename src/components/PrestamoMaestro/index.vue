<template>
	<div id="PrestamoMaestro">
		<div class="container-fluid">
			<div>

				<button id="insertar" @click="nuevoitem()" class="btn btn-success">
					<i class="fa fa-plus"></i> Inserción
				</button>

			</div>

			<div v-if="items.length < 1">
				<h3>No existen préstamos insertados</h3>
			</div>
			<div v-else class="list-group col-sm-8 col-sm-offset-2">
				<div v-for="item in items" class="row list-group-item" :key="item.Id">
					<router-link :to="{ name: 'PrestamoDetalle', params: { id: item.Id }}">
						<div class="col col-xs-3">
							<div class="circulo" :class="item.Tipo">
							</div>
						</div>
						<div id="main_info" class="col col-xs-6 col-sm-6">
							<div> NIF: {{ item.NIF }} </div>
							<span v-if="item.ISBN!=0"> ISBN: </span>
							<span v-if="item.ISAN!=0"> ISAN: </span>
							<span v-if="item.ISMN!=0"> ISMN: </span>
							<span v-if="item.ISBN!=0"> {{item.ISBN}} </span>
							<span v-if="item.ISAN!=0"> {{item.ISAN}} </span>
							<span v-if="item.ISMN!=0"> {{item.ISMN}} </span>
							<div :class="item.Devuelto ? 'devuelto' : 'pendiente'"> {{ item.Devuelto? "Devuelto" : "Pendiente devolución" }} </div>
						</div>
					</router-link>
					<div class="col col-xs-3">
						<button @click="eliminarObjeto(item.Id)" class="boton_eliminar btn btn-danger">
							<i class="fa fa-trash"></i> <span class="hidden-xs">Eliminar</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./Prestamos.js" type="text/javascript" charset="utf-8"></script>
<style src="./Prestamos.css" type="text/css" media="screen"></style>