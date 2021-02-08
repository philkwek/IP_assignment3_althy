function setUp(){
    
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

function enterStatData(){

    var set_AP_earned = document.getElementById('table_ap_earned')
    var set_codes_scanned = document.getElementById('table_codes_scanned')

    set_AP_earned.innerHTML = profile_data['total_HP_earned']
    set_codes_scanned.innerHTML = profile_data['QR_codes_scanned']


}

function displayFriends(){

}

function addFriend(){
    var friend_name = document.getElementById('friend_name').value;
    console.log(friend_name)
}



setUp();
enterStatData();

$('#navBar_5_2').click(function(){
    window.location  = '../main_menu_leaderboard/main_menu_leaderboard.html'
})

$('#navBar_5_3').click(function(){
    window.location = '../main_menu_nearby/main_menu_nearby.html'
})

$('#navBar_5_4').click(function(){
    window.location = '../main_menu_shop/main_menu_shop.html'
})

$('#navBar_5_1').click(function(){
    window.location = '../main_menu_scan/main_menu_scan.html'
})

$('#friend_add').click(function(){ //add friend toggle to show/hide search

    var x = document.getElementById('friend_search')

    if (window.getComputedStyle(x).display ==='none'){
        $('#friend_search').show();
    } else {
        $('#friend_search').hide();
    }
    
})

$('#profile_add_friend').click(function(){
    addFriend();
})

