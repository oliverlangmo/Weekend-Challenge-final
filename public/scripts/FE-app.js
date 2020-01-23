console.log('scripts sourced');

var myApp = angular.module('myApp', ['ui.bootstrap','ngMaterial', 'ngMessages']);

//sends pet to DB and gets pet from DB
myApp.controller('animalController', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog){
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
//deletes pet from DB
$scope.deletePet = function(item){
  var petId = item.currentTarget.getAttribute("data-id");
  var petToDelete = {
   id: petId
  };
  console.log('delete this:',petToDelete);
 $http({
 method:'DELETE',
 url:'/deletePet',
 data: petToDelete,
 headers: {'Content-Type': 'application/json;charset=utf-8'}
   }).then( function mySuccess( response ) {
             console.log( response.data ) ;

         }, function myError( response ) {
             console.log( response.statusText );

});
};

$scope.showAdvanced = function(ev) {
  var petId = ev.currentTarget.getAttribute("data-id");
  console.log(petId);
  console.log('button clicked');
    $mdDialog.show({
      controller: DialogController,
      template: `<md-dialog aria-label="update pet">
        <form ng-cloak>
          <md-toolbar>
            <div class="md-toolbar-tools">
              <h2>update pet</h2>
              <span flex></span>
              <md-button class="md-icon-button" ng-click="cancel()">
                X
              </md-button>
            </div>
          </md-toolbar>

          <md-dialog-content>
          <div class="container">
            <div class="md-card-update">
              <form>
                <p><input type="text" id="petNameIn" ng-model="petNameIn" placeholder="Pet Name"name="name" value=""></p>
                <p><input type="text" id="petTypeIn" ng-model="petTypeIn" placeholder="Pet Kind(e.g. Dog, Cat)"name="name" value=""></p>
                <p><input type="number" id="petAgeIn" ng-model="petAgeIn" placeholder="Pet Age"name="name" value=""></p>
                <p><input type="text" id="petImgIn" ng-model="petImgIn" placeholder="URL to pet picture"name="name" value=""></p>
                <md-card-actions>
                <md-button type="button" ng-click="updatePet()"name="button">Update</md-button>
                </md-card-actions>
              </form>
            </div>
          </div>
          </md-dialog-content>
        </form>
      </md-dialog>`,
      locals:{petId: petId, petNameIn: petNameIn, petTypeIn: petTypeIn, petAgeIn:petAgeIn, petImgIn: petImgIn},
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  };
  function DialogController($scope, $mdDialog, petId) {
    console.log("in dialog controller",petId);
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.updatePet = function(){

      // console.log(petId);
      // console.log('button clicked');
      var petToUpdate={
        id: petId,
        pet_name:$scope.petNameIn,
        pet_kind: $scope.petTypeIn,
        pet_age: $scope.petAgeIn,
        pet_pic:$scope.petImgIn,
        };
        console.log(petToUpdate);
        $http({
         method: 'PUT',
         url: '/updatePet',
         data: petToUpdate,
         headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then( function mySuccess( response ) {
                  console.log( response.data ) ;

              }, function myError( response ) {
                  console.log( response.statusText );
    });
    // location.reload();
    };
  }
}]);
//manages tabbed views
myApp.controller('TabController', function ($scope, $window) {
  $scope.tabs = [
    { title:'Home', content: 'partials/home.html'},
    { title:'Add Pet', content: 'partials/addPet.html'},
    { title:'See Pets', content: 'partials/seePets.html'}
  ];

});
