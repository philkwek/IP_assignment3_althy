function getAccount_details(){
    entered_username = document.getElementById("username").value
    entered_password = document.getElementById("password").value
};

function retrieveProfiles(){
    
    var database = firebase.database();
    var ref = database.ref('profiles');
    ref.on('value', gotProfileData)
}

function gotProfileData(data){
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

        if (profile_username == entered_username){
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
    }, 3000)
    console.log('loading...')
}


console.log(firebase)

localStorage.removeItem('profile') // allows users to relog in if they use the back button

$('#login_account_click_continue').click(function(){
    
    login_check = '';
    retrieveDetails();

    

    setTimeout(function(){
        $('#login_account_form')[0].reset();

        if (login_check == 'True'){
            $('#login_loading_animation').show();
            retrieveProfiles();

            openApp();
        } else {
            console.log(login_check)
        }
    }, 1000)
    
})

$('#login_back_arrow').click(function(){
    window.location = '../index.html'
})