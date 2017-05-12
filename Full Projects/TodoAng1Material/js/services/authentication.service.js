(function () {
    angular.module('myApp')
        .service('auth', function ($firebaseAuth) {
            var self = this;

            self.registerUser = function (user) {
                return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password);
            };

            self.loginWithGoogle = function() {
              return $firebaseAuth().$signInWithPopup('google');
            };

            self.loginUser = function (user){
                return $firebaseAuth().$signInWithEmailAndPassword(user.email, user.password);
            };

            self.logout = function() {
                return $firebaseAuth().$signOut();
            }
        })


})();