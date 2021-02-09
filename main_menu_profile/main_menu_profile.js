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

    var friend_1 = document.getElementById('friend_1');
    var friend_2 = document.getElementById('friend_2');
    var friend_3 = document.getElementById('friend_3');
    var friend_4 = document.getElementById('friend_4');
    var friend_5 = document.getElementById('friend_5');

    getFriendList()

    firebase.database().ref('friend_list/'+profile_data['username']).on('value',function(snapshot){
        current_friend_list = snapshot.val().list;
    })

    setTimeout(function(){

        $('#profile_loading').hide()
        console.log(current_friend_list)

        if (typeof current_friend_list[1] != "undefined"){
            friend_1.innerHTML = current_friend_list[1]
            $('#friends_list_name_1').show();
        }

        if (typeof current_friend_list[2] != "undefined"){
            friend_2.innerHTML = current_friend_list[2]
            $('#friends_list_name_2').show();
        }

        if (typeof current_friend_list[3] != "undefined"){
            friend_3.innerHTML = current_friend_list[3]
            $('#friends_list_name_3').show();
        }

        if (typeof current_friend_list[4] != "undefined"){
            friend_4.innerHTML = current_friend_list[4]
            $('#friends_list_name_4').show();
        }

        if (typeof current_friend_list[5] != "undefined"){
            friend_5.innerHTML = current_friend_list[5]
            $('#friends_list_name_5').show();
        }
        
    }, 3000)
    

}

function getFriendList(){

    firebase.database().ref('friend_list/'+profile_data['username']).on('value',function(snapshot){
        current_friend_list = snapshot.val().list;
    })

}


function addFriend(){

    var user_list = firebase.database().ref('friend_list')
    user_list.on('value', gotData)

}

function gotData(data){

    var name_exists = false

    var friend_name = document.getElementById('friend_name').value;

    console.log(friend_name)
    
    if (friend_name == profile_data['username']) { //informs user if they are trying to add themselves
        console.log('Cannot add yourself!');
    }
    

    var retrieved_details = data.val();
    var keys = Object.keys(retrieved_details); //array with all possible usernames
    console.log(keys);

    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        console.log(k)
        console.log(keys.length)

        if (k == friend_name){

            console.log('friend found! adding friend...')

            getFriendList();

            current_friend_list.push(friend_name);

            name_exists = true;

            break
        } 
    }

    if (name_exists == true){
        
        console.log("end");
        name_exists = false;

    }

}


function updateDatabase(){

    console.log(typeof current_friend_list)
    console.log(current_friend_list)


    firebase.database().ref('friend_list/'+profile_data['username']).update({
        'list': current_friend_list,
    })
}

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


$('#profile_add_friend').click(function(e){

    e.preventDefault();
    addFriend();
    

    setTimeout(function(){
        updateDatabase();
        document.getElementById('friend_search').reset()
        $('#friend_search').hide();
        alert('Friend Added!')
    },5000)
    
})

setUp();
enterStatData();
