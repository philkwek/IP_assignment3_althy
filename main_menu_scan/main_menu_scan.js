function onScanSuccess(qrCodeMessage) {
    html5QrcodeScanner.clear();
    window.location = qrCodeMessage;
    
	// handle on success condition with the decoded message
}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);


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

setUp()


$('#trophy_1').click(function(){
    window.location  = '../main_menu_leaderboard/main_menu_leaderboard.html'
})

$('#location_1').click(function(){
    window.location = '../main_menu_nearby/main_menu_nearby.html'
})

$('#shop_1').click(function(){
    window.location = '../main_menu_shop/main_menu_shop.html'
})

$('#profile_1').click(function(){
    window.location = '../main_menu_profile/main_menu_profile.html'
})

$('#scan_1').click(function(){
    location.reload()
})

