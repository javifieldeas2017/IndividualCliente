<template>
	<nav id="navigator" class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">
					<img :src="datos.logo" :alt="datos.nombre">
				</a>
			</div>
			<div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
					<li>
						<router-link to="/RecursoMaestro">
							<i class="fa fa-list-ul" aria-hidden="true"></i>Catalogo
						</router-link>
					</li>
					<li>
						<router-link to="/UsuarioMaestro">
							<i class="fa fa-user" aria-hidden="true"></i>Usuarios
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script src="./Navigator.js" type="text/javascript" charset="utf-8"></script>
<style src="./Navigator.css" type="text/css" media="screen"></style>
