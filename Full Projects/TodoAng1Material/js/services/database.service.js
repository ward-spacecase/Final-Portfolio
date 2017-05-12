(function () {
    angular.module('myApp')
        .factory('FirebaseStorage', ["$firebaseObject", "$user", function ($firebaseObject, $user) {
                return function() {
                    var ref = firebase.database().ref().child("users").child($user.getUser().uid);
                    return $firebaseObject(ref);
                };





        }]);


})();