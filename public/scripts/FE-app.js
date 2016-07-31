console.log('scripts sourced');

var myApp = angular.module('myApp', ['ui.bootstrap']);

//sends pet to DB and gets pet from DB
myApp.controller('animalController', ['$scope', '$http', function($scope, $http){
  $scope.recvPet = function(){
    $http({
      method: 'GET',
      url:'/recvPet',
    }).then(function(response){
      $scope.allThePets = response.data;
    });
  };
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
$scope.recvPet();
};

}]);
//manages tabbed views
myApp.controller('TabController', function ($scope, $window) {
  $scope.tabs = [
    { title:'Home', content: 'partials/home.html'},
    { title:'Add Pet', content: 'partials/addPet.html'},
    { title:'See Pets', content: 'partials/seePets.html'}
  ];
});
