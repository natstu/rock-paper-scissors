'use strict';
angular.module('gameApp', [])
.controller('mainController', function($rootScope, $scope, $http, $timeout, getResult){

  //view setting 
  $('.right-hand-paper, .right-hand-scissors, .left-hand-scissors, .left-hand-paper').hide();

  //setting weapon opetions
  $rootScope.weapons = ["Rock", "Paper", "Scissors"];
  console.log($rootScope.weapons);
  $rootScope.result = "";

  //initialiasing the score
  $rootScope.draw = 0;
  $rootScope.lose = 0;
  $rootScope.win = 0;

  //restart the game
  $scope.gameReinit = function(){
    // set up hand animation
    $('.right-hand-paper, .right-hand-scissors, .left-hand-scissors, .left-hand-paper, .result').hide();
    $('.right-hand-rock, .left-hand-rock').removeClass('animate-shake');
    $('.right-hand-rock, .left-hand-rock').show();
    $rootScope.result = "";

    //reinitialiasing the score
    $rootScope.draw = 0;
    $rootScope.lose = 0;
    $rootScope.win = 0;

    //reset weapons
    $rootScope.userWeapon = "";
    $rootScope.computerWeapon = "";
  }

  //setting weapon of choice
  $scope.setWeapons = function(weapon) { 
    $('.right-hand-paper, .right-hand-scissors, .left-hand-scissors, .left-hand-paper, .right-hand-rock, .left-hand-rock, .result').hide();
    $('.right-hand-rock, .left-hand-rock').show(100);

    //setting users weapon
    var userWeapon = weapon;

    //assigning weapon value to dom
    $rootScope.userWeapon = weapon;

    //setting user weapon animation
    if (userWeapon  == 'Rock') {
      $('.right-hand-rock').addClass('animate-shake');
    }
    if (userWeapon  == 'Paper') {
      $('.right-hand-rock').addClass('animate-shake').delay( 500 ).hide(300);
      $('.right-hand-paper').delay( 800 ).show(100);
    }
    if (userWeapon  == 'Scissors') {
      $('.right-hand-rock').addClass('animate-shake').delay( 500 ).hide(300);
      $('.right-hand-scissors').delay( 800 ).show(100);
    }

    //setting computers random
    var computerWeapon = Math.random();

    //assigning weapon to computers random result
    if (computerWeapon < 0.34) {
      computerWeapon = "Rock";
      //setting computer weapon animation
      $('.left-hand-rock').addClass('animate-shake');
      
    } else if (computerWeapon <= 0.67) {
      computerWeapon = "Paper";
      $('.left-hand-rock').addClass('animate-shake').delay( 500 ).hide(300);
      $('.left-hand-paper').delay( 800 ).show(100);
    } else {
      computerWeapon = "Scissors";
      $('.left-hand-rock').addClass('animate-shake').delay( 500 ).hide(300);
      $('.left-hand-scissors').delay( 800 ).show(100);
    }

    //assigning weapon value to view
    $rootScope.computerWeapon = computerWeapon;

    //start comparison war
    if(userWeapon === computerWeapon) {
      $timeout(function () {
        $rootScope.draw += 1;
        $('.draw').fadeIn(1300);
        getResult.finalScore();
          }, 1300);
    } else if (userWeapon === "Rock" && computerWeapon == "Scissors") {
      $timeout(function () {
        $rootScope.win += 1;
        $('.win').delay( 1300 ).fadeIn(400);
        getResult.finalScore();
      }, 1300);   
    }
    else if (userWeapon === "Rock" && computerWeapon == "Paper") {
      $timeout(function () {
        $rootScope.lose += 1;
        $('.lose').delay( 1300 ).fadeIn(400);
        getResult.finalScore();
      }, 1300);
    }
    else if (userWeapon === "Paper" && computerWeapon == "Rock") {
      $timeout(function () {
        $rootScope.win += 1;
        $('.win').delay( 1300 ).fadeIn(400);
        getResult.finalScore();
       }, 1300);
    }
    else if (userWeapon === "Paper" && computerWeapon == "Scissors") {
       $timeout(function () {
        $rootScope.lose += 1;
        $('.lose').delay( 1300 ).fadeIn(400);
        getResult.finalScore();
      }, 1300);
    }
    else if (userWeapon === "Scissors" && computerWeapon == "Rock") {
       $timeout(function () {
        $rootScope.lose += 1;
        $('.lose').delay( 1300 ).fadeIn(400);
        getResult.finalScore();
       }, 1300);
    }
    else  {
      $timeout(function () {
        $rootScope.win += 1;
        $('.win').delay( 1500 ).fadeIn(400);
        getResult.finalScore();
      }, 1300); 
    }
  }; 
})

// find the winner
.service('getResult', ['$rootScope', function($rootScope) {
  return {
    finalScore: finalScore
  }
  function finalScore () {
    var draw = $rootScope.draw;
    var lose = $rootScope.lose;
    var win = $rootScope.win;
    if(draw === 3){
      $rootScope.result = "It's a draw!"
      $('.result').fadeIn(400);
    }
    else if(lose === 3){
      $rootScope.result = "You lose!"
      $('.result').fadeIn(400);
    }
    else if(win === 3){
      $rootScope.result = "You win!"
      $('.result').fadeIn(400);
    }
    else {
      $rootScope.result = "";
      $('.result').hide();
    }
  }
}])

