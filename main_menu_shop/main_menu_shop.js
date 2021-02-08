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

setUp();

$('#navBar_4_1').click(function(){
    window.location  = '../main_menu_scan/main_menu_scan.html'
});

$('#navBar_4_2').click(function(){
    window.location  = '../main_menu_leaderboard/main_menu_leaderboard.html'
});

$('#navBar_4_3').click(function(){
    window.location  = '../main_menu_nearby/main_menu_nearby.html'
});

$('#navBar_4_5').click(function(){
    window.location = '../main_menu_profile/main_menu_profile.html'
})

$('#product_1').click(function(){

    var purchase_information = {
        'product_name': 'Sloth Mug',
        'product_price': 5000,
        'img name': 'purchase_mug'
    }
    localStorage.setItem("purchase_information", JSON.stringify(purchase_information));
    window.location = '../main_menu_shop/buy_page/buy_page.html'

})

$('#product_2').click(function(){

    var purchase_information = {
        'product_name': 'Skipping Rope',
        'product_price': 3500,
        'img name': 'purchase_rope'
    }
    localStorage.setItem("purchase_information", JSON.stringify(purchase_information));
    window.location = '../main_menu_shop/buy_page/buy_page.html'

})

$('#product_3').click(function(){

    var purchase_information = {
        'product_name': 'Nalgene Bottle',
        'product_price': 4000,
        'img name': 'purchase_bottle'
    }
    localStorage.setItem("purchase_information", JSON.stringify(purchase_information));
    window.location = '../main_menu_shop/buy_page/buy_page.html'

})

$('#product_4').click(function(){

    var purchase_information = {
        'product_name': 'Fitness Watch',
        'product_price': 30000,
        'img name': 'purchase_fitness'
    }
    localStorage.setItem("purchase_information", JSON.stringify(purchase_information));
    window.location = '../main_menu_shop/buy_page/buy_page.html'

})