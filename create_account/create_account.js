function getNewAccount_details(){
    username = document.getElementById("username").value
    password = document.getElementById("password").value
}

function uploadAccountData(){ //this function uploads data to firebase
    var database = firebase.database();

    var data = {
        'username': username,
        'password': password,
    };

    var ref = database.ref('account_details');

    ref.push(data);
}

function createFriendList(){

    var database = firebase.database();

    database.ref('friend_list/'+username).set({
        'username': username,
        'list': [''],
    })


}

function createNewProfile(){
    var database = firebase.database();

    var data = {
        'username': username,
        'level': 0,
        'HP': 0,
        'level_HP': 0, //this value is for levelling, on 5000 total HP earned, level goes up by one and value resets
        'total_HP_earned': 0, //this is for stat tracking
        'QR_codes_scanned': 0, //used for stat tracking
    };

    var ref = database.ref('profiles')

    ref.push(data);
}


$('#create_account_click_continue').click(function(){
    getNewAccount_details();
    console.log(username);
    console.log(password);
    uploadAccountData();
    createNewProfile();
    createFriendList();
    $('#create_account_form')[0].reset();
    alert("Account created!")
})

console.log(firebase)

$('#create_account_back_arrow').click(function(){
    window.location = '../index.html'
})



