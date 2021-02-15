
$('#trophy_5').click(function(){
    window.location  = '../../main_menu_leaderboard/main_menu_leaderboard.html'
})

$('#location_5').click(function(){
    window.location = '../../main_menu_nearby/main_menu_nearby.html'
})

$('#shop_5').click(function(){
    window.location = '../../main_menu_shop/main_menu_shop.html'
})

$('#profile_5').click(function(){
    location.reload()
})

$('#scan_5').click(function(){
    window.location = '../../main_menu_scan/main_menu_scan.html'
})

$('#friend_back_arrow').click(function(){
    window.location = '../../main_menu_profile/main_menu_profile.html'
})



function retrieveProfiles(){ //function gets friend's profile data
    
    var database = firebase.database();
    var ref = database.ref('profiles'); //ref contains profile data of all stored users
    ref.on('value', gotProfileData)
}

function gotProfileData(data){
    //console.log(data.val())
    var retrieved_profiles = data.val();
    var keys = Object.keys(retrieved_profiles);
    console.log(keys);

    for (var i = 0; i < keys.length; i++) { //this functions checks if profile data from list matches friend username
        var k =keys[i];

        profile_username = retrieved_profiles[k].username;
        profile_level = retrieved_profiles[k].level;
        profile_hp = retrieved_profiles[k].HP;
        profile_level_hp = retrieved_profiles[k].level_hp;
        profile_total_HP = retrieved_profiles[k].total_HP_earned;
        profile_QR_scanned = retrieved_profiles[k].QR_codes_scanned;

        console.log(profile_username,profile_level,profile_hp)

        var friend_username = JSON.parse(localStorage.getItem('view_friend_profile'))

        if (profile_username == friend_username){ //if matches, it stores corresponding friend profile data for current session
            console.log('Found profile')

            friend_profile = {
                'username': profile_username,
                'level': profile_level,
                'HP':profile_hp,
                'level_HP': profile_level_hp,
                'total_HP_earned': profile_total_HP,
                'QR_codes_scanned': profile_QR_scanned,
            }

            localStorage.setItem("friend_profile", JSON.stringify(friend_profile));

            break
        }
    }


}

function setFriendData(){ //this sets the friend profile data into the HTML

    var friend_profile = JSON.parse(localStorage.getItem('friend_profile'))

    console.log(friend_profile)

    var set_level = document.getElementById('header_level')
    var set_username = document.getElementById('header_username')
    var set_points = document.getElementById('header_points_number')
    var set_AP_earned = document.getElementById('table_ap_earned')
    var set_codes_scanned = document.getElementById('table_codes_scanned')

    set_level.innerHTML = friend_profile['level']
    set_username.innerHTML = friend_profile['username']
    set_points.innerHTML = friend_profile['HP']
    set_AP_earned.innerHTML = friend_profile['total_HP_earned']
    set_codes_scanned.innerHTML = friend_profile['QR_codes_scanned']

    var x = document.getElementsByClassName('header_information_friends')
    x[0].style.display = 'block'
    x[1].style.display = 'block'

    $('#friends_header').show()

}

function setFriend_friendList(){

    var friend_friend_list;

    var friend_profile = JSON.parse(localStorage.getItem('friend_profile'));

    console.log(friend_profile['username']);

    firebase.database().ref('friend_list/'+friend_profile['username']).on('value',function(snapshot){
        friend_friend_list = snapshot.val().list;

        console.log(friend_friend_list)

        $('#profile_loading').hide()

        if (typeof friend_friend_list[1] != "undefined"){
            friend_1.innerHTML = friend_friend_list[1]
            $('#friends_list_name_1').show();
        }

        if (typeof friend_friend_list[2] != "undefined"){
            friend_2.innerHTML = friend_friend_list[2]
            $('#friends_list_name_2').show();
        }

        if (typeof friend_friend_list[3] != "undefined"){
            friend_3.innerHTML = friend_friend_list[3]
            $('#friends_list_name_3').show();
        }

        if (typeof friend_friend_list[4] != "undefined"){
            friend_4.innerHTML = friend_friend_list[4]
            $('#friends_list_name_4').show();
        }

        if (typeof friend_friend_list[5] != "undefined"){
            friend_5.innerHTML = friend_friend_list[5]
            $('#friends_list_name_5').show();
        }
    })

}

retrieveProfiles();

setTimeout(function(){
    setFriendData();
    setFriend_friendList();
},3000)
