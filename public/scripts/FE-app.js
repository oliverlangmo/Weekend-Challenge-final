console.log('scripts sourced');

var myApp = angular.module('myApp', ['ui.bootstrap','ngMaterial', 'ngMessages']);

//sends pet to DB and gets pet from DB
myApp.controller('animalController', ['$scope', '$http', function($scope, $http){
  $scope.recvPet = function(){
    $http({
      method: 'GET',
      url:'/recvPet'
    })
    .then(function(response){
      console.log(response);
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
//deletes expense from DB
$scope.deletePet = function(){
  var petToDelete = {
   id:event.target.id
  };
  console.log('delete this:',petToDelete);
 $http({
 method:'DELETE',
 url:'/deleteExpense',
 data: expenseToDelete,
 headers: {'Content-Type': 'application/json;charset=utf-8'}
   }).then( function mySuccess( response ) {
             console.log( response.data ) ;

         }, function myError( response ) {
             console.log( response.statusText );

});
location.reload();
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
