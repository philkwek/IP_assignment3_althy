function getAccount_details(){
    entered_username = document.getElementById("username").value
    entered_password = document.getElementById("password").value
};

function retrieveDetails(){
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
        var password = retrieved_details[k].password
        var username = retrieved_details[k].username
        console.log(username, password)

        if (entered_username.length == 0 || entered_password.length == 0){
            console.log('User did not input any information')
            login_check = 'null'
            break
        }

        if (entered_username == username){
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

$('#login_account_click_continue').click(function(){
    login_check = '';
    retrieveDetails();

    setTimeout(function(){
        $('#login_account_form')[0].reset();

        if (login_check == 'True'){
            $('#login_loading_animation').show();
            openApp();
        } else {
            console.log(login_check)
        }
    }, 1000)
    
})

$('#login_back_arrow').click(function(){
    window.location = '../index.html'
})