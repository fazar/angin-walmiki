angular.module('lookats.controllers')
.controller('WelcomeInterestCtrl', function($scope, $state) {
	var interests = ['beach', 'party', 'formal party', 'travel', 'carnaval', 'sports', 'football', 'library', 'music', 'jazz', 'movie', 'film', 'car', 'girlie','mainly'];
	var interestsChosen = [];

	$scope.interests = interests;
	$scope.customInterest = '';
	$scope.interestsChosen = interestsChosen;

	$scope.addInterests = function(interest) {
		if (!$scope.isChosen(interest)) {
			interestsChosen.push(interest);
		} else {
			var idx = interestsChosen.indexOf(interest);
			interestsChosen.splice(idx, 1);
		}
	};

	$scope.isChosen = function(interest) {
		return interestsChosen.indexOf(interest) > -1;
	};

	$scope.nextToRecommendedUser = function() {
		$state.go('welcome-recommendedUser');
	};
});