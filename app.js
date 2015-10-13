(function(){

	'use strict';
	
	function MainCtrl ($http, $window) {

		var vm = this;

		vm.showGallery    = false;

		vm.setVars = function () {

			vm.navPos         = 0;
			vm.currentItem    = 0;
			vm.imageWidth     = 211;
			vm.navRight       = false;
			vm.navLeft        = false;
			vm.sliderMargin	  = 0;
			vm.navPosStyle    = {right: vm.navPos + 'px'};
			vm.displayImage   = vm.galleryItems.image[vm.currentItem].big;

			if ( angular.element($window).width() > 1060 ) {

				vm.sliderMargin = 5;

			} else if ( angular.element($window).width() < 1060 && angular.element($window).width() > 640 ) {

				vm.sliderMargin = 3;

			} else {

				vm.sliderMargin = 1;

			}

			vm.galleryLength  = vm.galleryItems.image.length - vm.sliderMargin;
			
		}

		vm.checkNav = function () {

			if ( vm.currentItem > 0 < vm.galleryLength ) {

				vm.navRight = true;

				vm.navLeft = true;

			} 
			
			if ( vm.currentItem == vm.galleryLength ) {

				vm.navRight = false;

				vm.navLeft = true;

			}

			if ( vm.currentItem == 0 && vm.galleryLength <= 5  && angular.element($window).width() > 1060 ) {

				vm.navRight = false;

				vm.navLeft = false;

			}

			else if ( vm.currentItem == 0 ) {

				vm.navRight = true;

				vm.navLeft = false;

			}

		}

		vm.toggleGallery = function () {

			vm.showGallery = !vm.showGallery;

		}

		vm.setImage = function ( url ) {

			vm.displayImage = url;

		}

		vm.navigateRight = function () {
			
			if ( vm.currentItem < vm.galleryLength && angular.element($window).width() > 640 ) {

				vm.currentItem += 1;
				
				vm.navPos = parseInt(vm.navPos) + parseInt(vm.imageWidth);

				vm.navPosStyle = {

					right: vm.navPos + 'px'

				}

				vm.checkNav();
				
			} else if ( vm.currentItem < vm.galleryLength && angular.element($window).width() < 640 ) {

				vm.currentItem += 1;

				vm.displayImage = vm.galleryItems.image[vm.currentItem].big;

				vm.checkNav();
					
			}

		}

		vm.navigateLeft  = function () {
			
			if ( vm.currentItem > 0 && angular.element($window).width() > 640 ) {

				vm.currentItem -= 1;

				vm.navPos = parseInt(vm.navPos) - parseInt(vm.imageWidth);

				vm.navPosStyle = {

					right : vm.navPos + 'px'

				}
			
			} else if ( vm.currentItem > 0 && angular.element($window).width() < 640 ) {

				vm.currentItem -= 1;

				vm.displayImage = vm.galleryItems.image[vm.currentItem].big;
					
			}

			vm.checkNav();

		}

		vm.getResource = function (url) {

			$http.get( url ).success(function (data) {

				vm.galleryItems = data;

				vm.setVars();
				
				vm.checkNav();

				vm.toggleGallery();

			}).error(function (data) {

				console.log( data + 'Request failed, please try again.');

			});
				 
		}

	}

	angular
		.module('app',[])
		.controller('MainCtrl', MainCtrl )
		.directive('resize', function ($window) {
		    
		    return function (scope) {

		   	var window = angular.element($window);

	        scope.vm.windowSize = function () {

	            return {

	                'width': window.width()

	            };

	        };

	        scope.$watch(scope.vm.windowSize, function () {

	        	scope.vm.navPos         = 0;
				scope.vm.currentItem    = 0;
				scope.vm.imageWidth     = 211;
				scope.vm.navRight       = false;
				scope.vm.navLeft        = false;
				
				if ( angular.element($window).width() > 1060 ) {

					scope.vm.sliderMargin = 5;

				} else if ( angular.element($window).width() < 1060 && angular.element($window).width() > 640 ) {

					scope.vm.sliderMargin = 3;

				} else {

					scope.vm.sliderMargin = 1;

				}
				
				scope.vm.navPosStyle    = {right: '0px'}
				scope.vm.galleryLength  = scope.vm.galleryItems.image.length - scope.vm.sliderMargin;
				scope.vm.checkNav();
				scope.vm.displayImage   = scope.vm.galleryItems.image[scope.vm.currentItem].big;

	        }, true);

	        window.bind('resize', function () {

	            scope.$apply();

	        });
	    }
	});
}())
