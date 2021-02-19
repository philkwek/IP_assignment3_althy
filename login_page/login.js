function getAccount_details(){
    entered_username = document.getElementById("username").value
    entered_password = document.getElementById("password").value
};

function retrieveProfiles(){
    
    var database = firebase.database();
    var ref = database.ref('profiles'); //ref contains profile data of all stored users
    ref.on('value', gotProfileData)
}

function gotProfileData(data){
    //console.log(data.val())
    var retrieved_profiles = data.val();
    var keys = Object.keys(retrieved_profiles);
    console.log(keys);

    for (var i = 0; i < keys.length; i++) { //this functions checks if profile data from list matches entered username & password
        var k =keys[i];

        profile_username = retrieved_profiles[k].username;
        profile_level = retrieved_profiles[k].level;
        profile_hp = retrieved_profiles[k].HP;
        profile_level_hp = retrieved_profiles[k].level_HP;
        profile_total_HP = retrieved_profiles[k].total_HP_earned;
        profile_QR_scanned = retrieved_profiles[k].QR_codes_scanned;

        console.log(profile_username,profile_level,profile_hp, retrieved_profiles[k].level_HP)

        if (profile_username == entered_username){ //if matches, it stores corresponding profile data for current session
            console.log('Found profile')

            current_profile = {
                'username': profile_username,
                'level': profile_level,
                'HP':profile_hp,
                'level_HP': profile_level_hp,
                'total_HP_earned': profile_total_HP,
                'QR_codes_scanned': profile_QR_scanned,
            }

            localStorage.setItem("profile", JSON.stringify(current_profile));

            break
        }
    }


}





function retrieveDetails(){ //this code retrieves info to check account details
    getAccount_details();
    var database = firebase.database();
    var ref = database.ref('account_details')
    ref.on('value', gotData, errData)
}

function gotData(data){ 
    //console.log(data.val())
    var retrieved_details = data.val();
    var keys = Object.keys(retrieved_details);
    console.log(keys);

    for (var i = 0; i < keys.length; i++) { //this retrieves the usernames and passwords one by one
        var k = keys[i];
        var password = retrieved_details[k].password;
        got_username = retrieved_details[k].username;
        console.log(got_username, password)

        if (entered_username.length == 0 || entered_password.length == 0){
            console.log('User did not input any information')
            login_check = 'null'
            break
        }

        if (entered_username == got_username){
            if(entered_password == password){
                login_check = 'True'
                console.log('Username and Password Checks out!')
                break
            } else {
                login_check = 'False'
                continue
            }
        } else{
            login_check = 'none'
            continue
        }
    }

    if (login_check == 'True'){
        console.log("You're logged in!")

    } else if (login_check == 'False'){
        console.log("Password is wrong!")
        alert('Password is wrong!')
    } else if (login_check == 'none'){
        console.log("Account doesn't exist!")
        alert('Account does not exist.')
    } else {
        alert('Please enter account details.')
    }

    

}

function errData(err){
    console.log('Error')
    console.log(err)
}

function openApp(){
    setTimeout(function(){
        window.location = "../main_menu_scan/main_menu_scan.html"
    }, 5000)
    console.log('loading...')
}


console.log(firebase)

localStorage.removeItem('profile') // allows users to relog in if they use the back button

$('#login_account_click_continue').click(function(){
    
    console.log('clicked')
    login_check = '';
    retrieveDetails();

    $('#login_loading_animation').show();
    $('#login_account_form').hide();
    $('#login_account_click_continue').hide();

    
    setTimeout(function(){ 

        if (login_check == 'True'){
    
            retrieveProfiles();
            openApp();

        } else {
            console.log(login_check)
        }
    }, 3000)
    
})

$('#login_back_arrow').click(function(){
    window.location = '../index.html'
})