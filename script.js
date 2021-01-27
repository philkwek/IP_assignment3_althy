function setup(){
    var firebaseConfig = {
        apiKey: "AIzaSyCQeeciUXdCf4XqbeZT1WBhXfVLxJxWXok",
        authDomain: "ip-asg3-althy.firebaseapp.com",
        projectId: "ip-asg3-althy",
        storageBucket: "ip-asg3-althy.appspot.com",
        messagingSenderId: "481043972970",
        appId: "1:481043972970:web:3899a20054db93d8bf5b13",
        measurementId: "G-Q3MRCRX3V7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    console.log(firebase);

    var database = firebase.database();
    
}

setup();



$('#create_account').click(function(){
    window.location = 'create_account/create_account.html'
})

$('#login_account').click(function(){
    window.location = 'login_page/login.html'
})

