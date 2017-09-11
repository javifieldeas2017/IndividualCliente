<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<nav class="navbar navbar-default">
					<div class="container-fluid">
						<div class="navbar-header">
							<a class="navbar-brand" href="#">
								<img src="http://lorempixel.com/output/abstract-q-c-512-512-8.jpg" :alt="datos.nombre">
							</a>
						</div>
						<ul class="nav navbar-nav">
							<li>
								<router-link to="/RecursoMaestro"><i class="fa fa-list-ul" aria-hidden="true"></i>Recursos</router-link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script src="./Navigator.js" type="text/javascript" charset="utf-8"></script>
<style src="./Navigator.css" type="text/css" media="screen"></style>
