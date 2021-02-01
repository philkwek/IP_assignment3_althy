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

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
};


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

function showPosition(pos){
    var crd = pos.coords;
    console.log('getting location')
    console.log(crd.latitude, crd.longitude)
}

function error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}




getLocation();
setUp();

$('#navBar_3_1').click(function(){
    window.location  = '../main_menu_scan/main_menu_scan.html'
});

$('#navBar_3_2').click(function(){
    window.location  = '../main_menu_leaderboard/main_menu_leaderboard.html'
})

