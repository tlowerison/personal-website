var app = angular.module("MyApp", ["ngRoute"]);

app
.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("");
});
