


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

    getPurchase_Details()
}

setUp();

$('#trophy_4').click(function(){
    window.location  = '../../main_menu_leaderboard/main_menu_leaderboard.html'
})

$('#location_4').click(function(){
    window.location = '../../main_menu_nearby/main_menu_nearby.html'
})

$('#shop_4').click(function(){
    location.reload()
})

$('#profile_4').click(function(){
    window.location = '../../main_menu_profile/main_menu_profile.html'
})

$('#scan_4').click(function(){
    window.location = '../../main_menu_scan/main_menu_scan.html'
})

function getPurchase_Details(){

    purchase_details = JSON.parse(localStorage.getItem('purchase_information'));
    console.log(purchase_details);

    var image_name = purchase_details['img name'];
    var product_name = purchase_details['product_name'];
    var product_price = purchase_details['product_price'];
    
    remaining_balance = profile_data['HP'] - product_price;

    if (remaining_balance < 0) { //checks if user can afford item
        console.log('Cannot Afford!') //if user cannot afford, it takes user back to shop screen
        alert('You cannot afford this product! Taking you back to the shop...')
        window.location = '../../main_menu_shop/main_menu_shop.html'
    } else{
        console.log('Can Afford')
    }

    var insert_product_name = document.getElementById('purchase_name')
    var insert_product_price = document.getElementById('purchase_price')
    var insert_remaining = document.getElementById('purchase_remaining')

    insert_product_name.innerHTML = product_name;
    insert_product_price.innerHTML = product_price;
    insert_remaining.innerHTML = remaining_balance;
    
    //displays corresponding image of product
    if (image_name == 'purchase_fitness'){
        $('#purchase_fitness').show();
    } else if (image_name == 'purchase_mug'){
        $('#purchase_mug').show();
    } else if (image_name == 'purchase_rope'){
        $('#purchase_rope').show();
    } else if (image_name == 'purchase_bottle'){
        $('#purchase_bottle').show();
    }

}

$('#purchase_next').click(function(){
    var confirm_purchase = {
        'remaining_balance': remaining_balance
    }
    localStorage.setItem("confirm_purchase", JSON.stringify(confirm_purchase));
    window.location = '../../main_menu_shop/confirm_buy/confirm_buy.html'
})