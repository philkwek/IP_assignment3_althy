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

function retrieveProfiles(){ //updates info of profile
    
    var database = firebase.database();
    var ref = database.ref('profiles');
    ref.on('value', updateProfile)
}

function updateProfile(data){
    //console.log(data.val())
    var retrieved_profiles = data.val();
    var keys = Object.keys(retrieved_profiles);
    console.log(keys);

    for (var i = 0; i < keys.length; i++) {
        var k =keys[i];

        profile_username = retrieved_profiles[k].username;
        profile_level = retrieved_profiles[k].level;
        profile_hp = retrieved_profiles[k].HP;

        console.log(profile_username,profile_level,profile_hp)

        if (profile_username == profile_data['username']){
            console.log('Found profile')

            current_profile = {
                'username': profile_username,
                'level': profile_level,
                'HP':profile_hp,
            }

            localStorage.setItem("profile", JSON.stringify(current_profile));

            break
        }
    }

    setUp()

}

function leaderboard_setup(){
    var HP = [];
    var username = [];
    var firebaseRef = firebase.database().ref("profiles").orderByChild("HP");

    firebaseRef.on("value", function(snapshot){
        snapshot.forEach(function(element){

            username.push(element.val().username);
            HP.push(parseFloat(element.val().HP));
            HP.sort((b, a) => a - b);
            
        });
        
        username.reverse()
        console.log(username, HP)

        // 
        if (typeof HP[0] !== 'undefined'){
            var first = HP[0];
            document.getElementById('leaderboard_points_1').innerHTML = first;
        } else{
            $('.leaderboard_1').hide();
        }

        if (typeof HP[1] !== 'undefined'){
            var second = HP[1];
            document.getElementById('leaderboard_points_2').innerHTML = second;
        } else{
            $('.leaderboard_2').hide();
        }

        if (typeof HP[2] !== 'undefined'){
            var third = HP[2];
            document.getElementById('leaderboard_points_3').innerHTML = third;
        } else{
            $('.leaderboard_3').hide();
        }

        if (typeof HP[3] !== 'undefined'){
            var fourth = HP[3];
            document.getElementById('leaderboard_points_4').innerHTML = fourth;
        } else{
            $('.leaderboard_4').hide();
        }

        if (typeof HP[4] !== 'undefined'){
            var fifth = HP[4];
            document.getElementById('leaderboard_points_5').innerHTML = fifth;
        } else{
            $('.leaderboard_5').hide();
        }

        if (typeof HP[5] !== 'undefined'){
            var sixth = HP[5];
            document.getElementById('leaderboard_points_6').innerHTML = sixth;
        } else{
            $('.leaderboard_6').hide();
        }


        //name 
        var first_username = username[0];
        document.getElementById('leaderboard_name_1').innerHTML = first_username;

        var second_username = username[1];
        document.getElementById('leaderboard_name_2').innerHTML = second_username;

        var third_username = username[2];
        document.getElementById('leaderboard_name_3').innerHTML = third_username;

        var fourth_username = username[3];
        document.getElementById('leaderboard_name_4').innerHTML = fourth_username;

        var fifth_username = username[4];
        document.getElementById('leaderboard_name_5').innerHTML = fifth_username;

        var sixth_username = username[5];
        document.getElementById('leaderboard_name_6').innerHTML = sixth_username;

    });
}


setUp();
leaderboard_setup();
retrieveProfiles();

$('#navBar_2_1').click(function(){
    window.location  = '../main_menu_scan/main_menu_scan.html'
});

$('#navBar_2_3').click(function(){
    window.location  = '../main_menu_nearby/main_menu_nearby.html'
});

$('#navBar_2_4').click(function(){
    window.location = '../main_menu_shop/main_menu_shop.html'
})

