let current_profile

function setUp(){
    current_profile = JSON.parse(localStorage.getItem('profile')); 
    console.log(current_profile);
}

function getProfileDetails(){
    var database = firebase.database();
    var ref = database.ref('profiles'); //ref contains profile data of all stored users
    ref.on('value', gotProfileData)
}

function gotProfileData(data){ 
    
    var retrieved_profiles = data.val();
    var keys = Object.keys(retrieved_profiles);

    var check_username = current_profile['username']


    console.log(keys);
    console.log(retrieved_profiles)

    for (var i = 0; i < keys.length; i++) { //this function get key of profile

        var k =keys[i];

        console.log(check_username)

        profile_username = retrieved_profiles[k].username;
        profile_level = retrieved_profiles[k].level;
        profile_hp = retrieved_profiles[k].HP;
        profile_level_hp = retrieved_profiles[k].level_HP;
        profile_total_HP = retrieved_profiles[k].total_HP_earned;
        profile_QR_scanned = retrieved_profiles[k].QR_codes_scanned;

        if (check_username == retrieved_profiles[k].username){ 
            console.log('Found profile')

            current_profile = {
                'username': profile_username,
                'level': profile_level,
                'HP':profile_hp,
                'level_HP': profile_level_hp,
                'total_HP_earned': profile_total_HP,
                'QR_codes_scanned': profile_QR_scanned,
                'key': keys[i]
            }

            break
        }

        
    }
    console.log(current_profile)

}

function updateHP(){
    var hp = current_profile['HP'];
    var lifetime_hp = current_profile['total_HP_earned'];
    var leveling_hp = current_profile['level_HP'];

    leveling_hp = leveling_hp + 500;
    lifetime_hp = lifetime_hp + 500;
    hp = hp + 500;

    if (leveling_hp >= 5000) { //this levels the user up
        leveling_hp = 0
        var new_level = current_profile['level'] + 1
        level_up = true
    } else {
        var new_level = current_profile['level']
        level_up = false
    }

    var new_profile_data = {
        'username': current_profile['username'],
        'level': new_level,
        'HP':hp,
        'level_HP': leveling_hp,
        'total_HP_earned': lifetime_hp,
        'QR_codes_scanned': current_profile['QR_codes_scanned'],
        'key': current_profile['key']
    }
    
    current_profile = {
        'username': new_profile_data['username'],
        'level': new_profile_data['level'],
        'HP': new_profile_data['HP'],
        'level_HP': new_profile_data['level_HP'],
        'total_HP_earned': new_profile_data['total_HP_earned'],
        'QR_codes_scanned': new_profile_data['QR_codes_scanned'],
    }

    localStorage.setItem("profile", JSON.stringify(current_profile));

    firebase.database().ref('profiles/'+ new_profile_data['key']).update({
        'username': new_profile_data['username'],
        'level': new_profile_data['level'],
        'HP': new_profile_data['HP'],
        'level_HP': new_profile_data['level_HP'],
        'total_HP_earned': new_profile_data['total_HP_earned'],
        'QR_codes_scanned': new_profile_data['QR_codes_scanned'],
    })
}



function start(){
    setUp();

    getProfileDetails();

    setTimeout(function(){

        updateHP();

        if (level_up = true){
            alert('You earned 500 points and leveled up!')
        } else {
            alert('You earned 500 points!')
        }
        
        window.location = '../main_menu_scan/main_menu_scan.html'
    },5000)
}

start()





