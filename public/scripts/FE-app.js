console.log('scripts sourced');

var myApp = angular.module('myApp', []);

myApp.controller('petController', ['$scope', '$http', function($scope, $http){

  $scope.sendPet = function(){
    var petInfo = {
      pet_name: $scope.petNameIn,
      pet_kind: $scope.petTypeIn,
      pet_age: $scope.petAgeIn,
      pet_pic: $scope.petImgIn
   };
   console.log(petInfo);
   $http({
     method: 'POST',
     url:'/addPet',
     data: petInfo
  });
  };


}]);
