$('#create_account').click(function(){
    window.location = 'create_account/create_account.html'
})

$('#login_account').click(function(){
    window.location = 'login_page/login.html'
})

localStorage.removeItem('profile') //clears profile data for new user