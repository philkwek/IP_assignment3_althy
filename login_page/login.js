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

        if (entered_username == username){
            if(entered_password == password){
                login_check = 'True'
                console.log('Username and Password Checks out!')
                break
            } else {
                login_check = 'False'
                console.log('Username Checks, Password Failed!')
                break
            }
        } else{
            login_check = 'none'
            continue
        }
    }

    if (login_check == 'True'){
        console.log("You're logged in!")
        alert('Logged in!')

    } else if (login_check == 'False'){
        console.log("Password is wrong!")
        alert('Password is wrong!')
    } else {
        console.log("Account doesn't exist!")
        alert('Account does not exist.')
    }

}

function errData(err){
    console.log('Error')
    console.log(err)
}


console.log(firebase)

$('#login_account_click_continue').click(function(){
    retrieveDetails();
    $('#login_account_form')[0].reset();
})

$('#login_back_arrow').click(function(){
    window.location = '../index.html'
})