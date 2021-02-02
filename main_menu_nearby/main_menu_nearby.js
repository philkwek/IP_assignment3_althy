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

function initMap() { //function loads first map
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 1.3521, lng: 103.8198 },
      zoom: 9,
    });
};


function getLocation() { //function runs to display current  location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

function showPosition(pos){ //this function recenters map on current location and places a marker
    var crd = pos.coords;
    console.log('getting location')
    console.log(crd.latitude, crd.longitude)

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: crd.latitude, lng: crd.longitude },
        zoom: 16,
      });

    new google.maps.Marker({
        position: {lat: crd.latitude, lng: crd.longitude},
        map,
        title:'Test!'
    });

    $('#map').show();
    $('#nearby_loading').hide();
}

function error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// event listeners for filters
checkbox_hawker = document.querySelector('#nearby_hawker');

checkbox_hawker.addEventListener('change', function(){
    if (this.checked) {
        console.log('hawker checked')
    } else {
        console.log('hawker not checked')
    }
})

checkbox_rest = document.querySelector('#nearby_restaurants');

checkbox_rest.addEventListener('change', function(){
    if (this.checked) {
        console.log('restaurant checked')
    } else {
        console.log('restaurant not checked')
    }
})

checkbox_rest = document.querySelector('#nearby_cafes');

checkbox_rest.addEventListener('change', function(){
    if (this.checked) {
        console.log('cafes checked')
    } else {
        console.log('cafes not checked')
    }
})




getLocation();
setUp();

$('#navBar_3_1').click(function(){
    window.location  = '../main_menu_scan/main_menu_scan.html'
});

$('#navBar_3_2').click(function(){
    window.location  = '../main_menu_leaderboard/main_menu_leaderboard.html'
})

