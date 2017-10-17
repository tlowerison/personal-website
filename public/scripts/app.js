var app = angular.module("MyApp", ["ngRoute"]);

app
.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("");

	$routeProvider
	.when("/", {
		templateUrl: "../index.html"
	})
	.when("/resume", {
		templateUrl: "../trey-lowerison-resume.pdf"
	});
});
