(function() {
    angular.module('dashboard', [])
        .component('dashboardhome', {
           templateUrl: 'js/components/dashboard-home/dashboard-home.template.html',
            controller: DashboardHomeController,
            controllerAs: 'vm'
        });

    function DashboardHomeController($user, FirebaseStorage, $scope, $mdDialog, auth, $mdToast, $state) {
        var vm = this;

        vm.user = $user.getUser();

        vm.logout = function() {                //logs user out, don't mind the error...
          auth.logout().then(function(){
              $mdToast.show(
                  $mdToast.simple()
                      .textContent('Success! Now logged out. ')
                      .hideDelay(3000)
              );
              delete localStorage.qu;
              $state.go('home');
          }).catch(function(error){

          });
        };

       var test = FirebaseStorage().$bindTo($scope, "userFire").then(function(){                //intializes database and EVERYTHING!

            if(!$scope.userFire.completed) {
                $scope.userFire.completed = 0;
            }
            if(!$scope.userFire.leftTodo) {
                $scope.userFire.leftTodo = 0;
            }


       });

       vm.checkoff = function(item){                                    //on check button click

           item.completed = !item.completed;

           for(var i = 0; i < $scope.userFire.activeList.items.length; i++) {
               if(item.item == $scope.userFire.activeList.items[i].item) {
                   $scope.userFire.activeList.items[i] = item;
               }
           }

           if(item.completed) {                                         //mark complete
               $scope.userFire.completed++;
               $scope.userFire.leftTodo--;
               $mdToast.show(
                   $mdToast.simple()
                       .textContent(item.item + " marked as complete!")
                       .hideDelay(2000)
               );
           } else {                                     //mark incomplete
               $scope.userFire.completed--;
               $scope.userFire.leftTodo++;
               $mdToast.show(
                   $mdToast.simple()
                       .textContent(item.item + ' marked as incomplete!')
                       .hideDelay(2000)
               );
           }
        updateActive();

       };

       vm.delete = function(item, ev){
                                                                                                //delete item
           var confirm = $mdDialog.confirm()
               .title('Are you sure you won\'t regret this?')
               .textContent('There is no way of recovering this item after deletion.')
               .ariaLabel('DELETE')
               .targetEvent(ev)
               .ok('Delete Item')
               .cancel('I changed my mind...');

           $mdDialog.show(confirm).then(function() {

               for(var i = 0; i < $scope.userFire.activeList.items.length; i++){

                   if(item.item == $scope.userFire.activeList.items[i].item) {
                       $scope.userFire.activeList.items.splice(i, 1);
                       $mdToast.show(
                           $mdToast.simple()
                               .textContent('Goodbye, \'' + item.item + '\'. I\'ll miss you ;(')
                               .hideDelay(5000)
                       );

                       if(item.completed){
                           $scope.userFire.completed--;
                       } else {
                           $scope.userFire.leftTodo--;
                       }
                   }
               }
               updateActive();
           });
       };

       vm.setActiveList = function(listObject){                         //sets current active list
          $scope.userFire.activeList = listObject;

        };

        vm.showPrompt = function(ev) {                                                  //add list prompt
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('Name your new list: ')
                .placeholder('List Title')
                .ariaLabel('List Title')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('...Nevermind');

            $mdDialog.show(confirm).then(function(result) {

                if(!$scope.userFire.lists) {
                    $scope.userFire.lists = [];
                }
                if(result != '') {
                    $scope.userFire.lists.push({
                        listTitle: result
                    });
                    for(var i = 0; i < $scope.userFire.lists.length; i++) {
                        if(result == $scope.userFire.lists[i].listTitle) {
                            vm.setActiveList($scope.userFire.lists[i]);
                        }
                    }
                }
            });
        };

        vm.showItemPrompt = function(ev) {                                      //add item prompte
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What have you got to do?')
                .placeholder('Do This')
                .ariaLabel('Do This')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('...Nevermind');

            $mdDialog.show(confirm).then(function(result) {

                if(!$scope.userFire.activeList.items) {
                    $scope.userFire.activeList.items = [];
                }
                if(result != '') {
                    $scope.userFire.activeList.items.push({
                        item: result,
                        completed: false
                    })
                }
                $scope.userFire.leftTodo++;
                updateActive();
            });
        };

        vm.strikeBool = function(item) {                    //adds strikethrough class if completed
            if(item.completed){
                return 'strikethrough';
            }
            return '';
        };

        function updateActive() {                               //pushed activeList to main data list
            for(var i = 0; i < $scope.userFire.lists.length; i++) {
                if($scope.userFire.activeList.listTitle == $scope.userFire.lists[i].listTitle) {
                    $scope.userFire.lists[i] = $scope.userFire.activeList;
                }
            }
        }


    }
})();