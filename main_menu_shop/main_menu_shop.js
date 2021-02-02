function setUp(){

    leaderboard_list = [],
   
    profile_data = JSON.parse(localStorage.getItem('profile')); 
    console.log(profile_data);

    var set_level = document.getElementById('header_level')
    var set_username = document.getElementById('header_username')
    var set_points = document.getElementById('header_points_number')

    console.log(profile_data['username'])

    set_level.innerHTML = profile_data['level']
    set_username.innerHTML = profile_data['username']
    set_points.innerHTML = profile_data['HP']

}

setUp();

$('#navBar_4_1').click(function(){
    window.location  = '../main_menu_scan/main_menu_scan.html'
});

$('#navBar_4_2').click(function(){
    window.location  = '../main_menu_leaderboard/main_menu_leaderboard.html'
});

$('#navBar_4_3').click(function(){
    window.location  = '../main_menu_nearby/main_menu_nearby.html'
});