<template>
	<div id="UsuarioMaestro">
		<div class="container-fluid">
			<div>

				<button id="insertar" @click="nuevoitem()" class="btn btn-success">
					<i class="fa fa-plus"></i> Inserción
				</button>

			</div>

			<div v-if="items.length < 1">
				<h3>No existen Usuarios insertadas</h3>
			</div>
			<div v-else class="list-group col-sm-8 col-sm-offset-2">
				<div v-for="item in items" class="row list-group-item" :key="item.Id">
					<router-link :to="{ name: 'UsuarioDetalle', params: { id: item.Id }}">
						<div class="col col-xs-3">
							<div class="circulo" :class="item.Tipo">
								<i v-if="item.Tipo =='Estudiante'" class="fa fa-graduation-cap fa-fw" aria-hidden="true"></i>
								<i v-if="item.Tipo =='Trabajador'" class="fa fa-briefcase fa-fw" aria-hidden="true"></i>
								<i v-if="item.Tipo =='Desempleado'" class="fa fa-user-times fa-fw" aria-hidden="true"></i>
								<i v-if="item.Tipo =='Jubilado'" class="fa fa-blind fa-fw" aria-hidden="true"></i>
								<i v-if="item.Tipo =='Familia numerosa'" class="fa fa-users fa-fw" aria-hidden="true"></i>
							</div>
						</div>
						<div id="main_info" class="col col-xs-6 col-sm-6">
							<div> {{ item.Nombre }} </div>
							<div> {{ item.Tipo }} </div>
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

<script src="./Usuarios.js" type="text/javascript" charset="utf-8"></script>
<style src="./Usuarios.css" type="text/css" media="screen"></style>