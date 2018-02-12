var app = angular.module('weatherApp', ['ng-fusioncharts']);

        app.controller('weatherController', function($scope, $http) {
            var vm = $scope;
            vm.tempJsonArray =[];
          $scope.channelInfo = {
             heading: "Peaches Weather Forecast"
          };

           $http.get("http://ip-api.com/json").then(function(response) {
                vm.lat = response.data.lat;
                vm.lon = response.data.lon;

                    var apiKey = "e8eab45c73ed2c77d3167e40da053a3f";
                    var openWeatherURl = "http://api.openweathermap.org/data/2.5/weather?lat="+vm.lat +"&lon=" +vm.lon + "&appid=" +apiKey;
                    var openFiveDaysWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+vm.lat +"&lon=" +vm.lon + "&appid=" +apiKey;

                    $http.get(openWeatherURl).then(function(response) {
                        vm.description = response.data.weather[0].description;
                        vm.speed = (2.237 * response.data.wind.speed).toFixed(1) + " mph";
                        vm.location = response.data.name;
                        vm.temp = response.data.main.temp;
                        vm.fTemp = (vm.temp *(9/5) - 459.67).toFixed(1) + " (˚F)";
                        vm.cTemp = (vm.temp - 273).toFixed(1) + " (˚C)";
                        vm.humidity = response.data.main.humidity +" % Humid";
                        vm.icon = "http://openweathermap.org/img/w/" +response.data.weather[0].icon + ".png";
                         switch(vm.description) {
                            case 'clear sky' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1501682855625-15c985cd12a5?ixlib=rb-0.3.5&s=2ee703d45488fd5af1523e4d1afff179&auto=format&fit=crop&w=1050&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }

                            case 'mist' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1442606688842-a421432a776f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=76428d1343c4aabe3eb9284f1d2923a1&auto=format&fit=crop&w=776&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }

                            case 'few clouds' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1435081488252-576e730fa6f0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8b175d5058c6ed58d463fb599a6f89b7&auto=format&fit=crop&w=1057&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }

                            case 'rain' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/uploads/14116603688211a68546c/30f8f30b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=41f1047d3f18b841b7608f111a8c1d4b&auto=format&fit=crop&w=1050&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }
                            case 'shower rain' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1496034663057-6245f11be793?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e3facdc97ce74347933f68625491ed9&auto=format&fit=crop&w=1050&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }
                            case 'snow' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1452868195396-89c1af3b1b2e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fda5dc7d0b64a492f238011df00f59b1&auto=format&fit=crop&w=1049&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }
                            case 'thunder storm' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=68ed213f4a28b499c2173f546575895d&auto=format&fit=crop&w=700&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }
                            case 'moderate rain' :{
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1435914149323-1b656e7ab379?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=15aa18985e9339cb5c3e0783d9a5c11e&auto=format&fit=crop&w=1050&q=80')",
                                    "background-size": "cover"
                                };
                                break;
                            }

                             default:
                                vm.weatherBackground = {
                                    "background": "url('https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60cd2771ed062d26647ed0a60c9e7c40&auto=format&fit=crop&w=1600&q=80')",
                                    "background-size": "cover"
                                };

                        }
                    });

                    $http.get(openFiveDaysWeatherURL).then(function(response) {
                       vm.data = response.data.list;
                        vm.length = vm.data.length;
                       vm.newJsonArray = {};

                       for(var i=0; i < vm.length; i++) {
                           vm.temp = vm.data[i].main.temp;
                           vm.newJsonArray.fTemp = (vm.temp *(9/5) - 459.67).toFixed(1) + " (˚F)";
                           vm.newJsonArray.cTemp = (vm.temp - 273).toFixed(1) + " (˚C)";
                           vm.newJsonArray.description = vm.data[i].weather[0].description;
                           vm.newJsonArray.icon = "http://openweathermap.org/img/w/" +vm.data[i].weather[0].icon + ".png";
                           vm.tempJsonArray.push(vm.newJsonArray);
                       }

               });

           /*    $scope.myDataSource = {
                   chart: {
                       caption: "We",
                       subCaption: ""
                   },
                   data: [

                   ]
               }; */

           });
        });
