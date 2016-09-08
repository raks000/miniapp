/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope,$http,$ionicPopup,$ionicHistory,$state, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    console.log(1);

    $scope.user = {};
		$scope.login = function() {
      var link = 'http://servidif.develbmt.com/ajax/ajax-login';
  // var link = 'http://localhost:8100/api';
//  var link = '/api/login';


// $http.post('http://servidif.develbmt.com/ajax/ajax-login', {e:$scope.user.email, p:$scope.user.password},
// 		{headers: {'Content-Type': 'application/x-www-form-urlencoded'},  method: "POST",}).then(  console.log(2);
//       console.log($scope.user.email);
//       console.log($scope.user.password);
//       console.log(data);, errorCallback);

$http({
    url: link,
  //  dataType: 'json',
    method: "POST",
		data: {e: $scope.user.email,p:$scope.user.password},
    //  paramSerializer: '$httpParamSerializerJQLike',
    // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'},
		  // cache: false,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},

}).success(function (data) {
  console.log(2);
  console.log($scope.user.email);
  console.log($scope.user.password);
  console.log(data);
  //  $scope.users = data; // assign  $scope.persons here as promise is resolved here
           //console.log($scope.users);
          //   console.log(data);
          	var json = angular.fromJson(data.records);
          	console.log(json);
      		  console.log(data.u_name);
					$scope.response = json;
						sessionStorage.setItem('loggedin_name', $scope.response.records.u_name);
						sessionStorage.setItem('loggedin_id', $scope.response.records.u_id );
						sessionStorage.setItem('loggedin_phone', $scope.response.records.u_phone);
						sessionStorage.setItem('loggedin_address', $scope.response.records.u_address);
						sessionStorage.setItem('loggedin_pincode', $scope.response.records.u_pincode);
						$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true
						});
				//		lastView = $ionicHistory.backView();
				//		console.log('Last View',lastView);

				        	$state.go('app.gallery', {}, {location: "replace", reload: true});

              console.log(data.u_name);
}).error(function (data) {
  console.log(3);

    //$scope.status = status + ' ' + headers;
});




}









    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
  //  var link = 'http://servidif.develbmt.com/ajax/ajax-graficas';

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope,  $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    $scope.grafs = {};
     var link = 'http://servidif.develbmt.com/ajax/ajax-graficas';


    $http({
        url: link,
      //  dataType: 'json',
        method: "POST",
    		data: {e: "llave",p:"llave2"},
        //  paramSerializer: '$httpParamSerializerJQLike',
        // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'},
    		  // cache: false,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},

    }).success(function (data) {
      console.log(2);
      //
      // console.log(2);
      // console.log($scope.user.email);
      // console.log($scope.user.password);
      console.log(data);
      //  $scope.users = data; // assign  $scope.persons here as promise is resolved here
               //console.log($scope.users);
              //   console.log(data);

              	console.log(data.u_totalApoyosBeneficiarios);
          	//	  console.log($scope.response.u_totalApoyosBeneficiarios);
    						// sessionStorage.setItem('loggedin_name', $scope.response.records.u_name);
    						// sessionStorage.setItem('loggedin_id', $scope.response.records.u_id );
    						// sessionStorage.setItem('loggedin_phone', $scope.response.records.u_phone);
    						// sessionStorage.setItem('loggedin_address', $scope.response.records.u_address);
    						// sessionStorage.setItem('loggedin_pincode', $scope.response.records.u_pincode);
    						// $ionicHistory.nextViewOptions({
    						// 	disableAnimate: true,
    						// 	disableBack: true
    						// });




    }).error(function (data) {
      console.log(3);

        //$scope.status = status + ' ' + headers;
    });



    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
