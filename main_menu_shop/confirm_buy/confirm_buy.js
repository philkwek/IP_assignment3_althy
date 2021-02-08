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

    getConfirmPurchase_Details()
}

function getConfirmPurchase_Details(){

    purchase_details = JSON.parse(localStorage.getItem('purchase_information'));
    remaining_balance = JSON.parse(localStorage.getItem('confirm_purchase'))
    console.log(purchase_details,remaining_balance);

    var product_name = purchase_details['product_name'];
    var product_price = purchase_details['product_price'];
    var user_remaining = remaining_balance['remaining_balance']

    var insert_product_name = document.getElementById('purchase_name')
    var insert_product_price = document.getElementById('purchase_price')
    var insert_remaining = document.getElementById('purchase_remaining')

    insert_product_name.innerHTML = product_name;
    insert_product_price.innerHTML = product_price;
    insert_remaining.innerHTML = user_remaining;

}

function checkout(){ //sends order to server and also updates HP value

    $('#shop_elements').hide()
    $('#confirming_loading').show()

    var entered_name = document.getElementById("full_name").value
    var entered_email = document.getElementById("email").value
    var entered_address = document.getElementById('address').value   
    var product_bought = purchase_details['product_name']

    var new_balance = remaining_balance['remaining_balance']

    var database = firebase.database();

    var data = {
        'customer': entered_name,
        'email': entered_email,
        'address': entered_address,
        'product': product_bought
    };

    var ref = database.ref('orders');

    ref.push(data);

    retrieveProfiles();
    
    setTimeout(function(){
        console.log(current_profile['key'])
        updateAP();
        setUp();
    }, 4000)

    setTimeout(function(){
        alert('Your order has been sent! Please wait 7-10 Business Days for Delivery.')
        window.location = '../../main_menu_shop/main_menu_shop.html'
    },8000)


}

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

    for (var i = 0; i < keys.length; i++) { //this functions checks if profile data from list matches current userna,e
        var k =keys[i];

        profile_username = retrieved_profiles[k].username;
        profile_level = retrieved_profiles[k].level;
        profile_hp = retrieved_profiles[k].HP;

        console.log(profile_username,profile_level,profile_hp)

        if (profile_username == profile_data['username']){ //if matches, it stores key value for AP updating
            console.log('Found profile')

            current_profile = {
                'username': profile_username,
                'level': profile_level,
                'HP':profile_hp,
                'key': keys[i]
            }

            break
        }
    }
    console.log(current_profile)


}




function updateAP(){
    firebase.database().ref('profiles/'+ current_profile['key']).update({
        'HP':remaining_balance['remaining_balance']
    })

    var update_profile = {
        'username': current_profile['username'],
        'level': current_profile['level'],
        'HP': remaining_balance['remaining_balance'],
    }

    localStorage.setItem("profile", JSON.stringify(update_profile));

}


setUp();

$('#confirm_next').click(function(){
    checkout();
})

$('#navBar_4_1').click(function(){
    window.location  = '../../main_menu_scan/main_menu_scan.html'
});

$('#navBar_4_2').click(function(){
    window.location  = '../../main_menu_leaderboard/main_menu_leaderboard.html'
});

$('#navBar_4_3').click(function(){
    window.location  = '../../main_menu_nearby/main_menu_nearby.html'
});

$('#navBar_4_4').click(function(){
    window.location = '../../main_menu_shop/main_menu_shop.html'
})

$('#navBar_4_5').click(function(){
    window.location = '../main_menu_profile/main_menu_profile.html'
})