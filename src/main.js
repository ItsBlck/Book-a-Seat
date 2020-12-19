(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyCXZjU9JlbThavMd6E9vWlYKj93tdlT9og",
        authDomain: "bookaseat-7dc24.firebaseapp.com",
        projectId: "bookaseat-7dc24",
        storageBucket: "bookaseat-7dc24.appspot.com",
        messagingSenderId: "687700833742",
        appId: "1:687700833742:web:5691fb4c4e0a9e3d71a79f",
        measurementId: "G-P6LHMC59XR"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var btnSignOut = document.getElementById("SignOut");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var button = document.getElementById("UserName");
            button.textContent = user.email;
        } else {
          console.log("Logged Out");
        }
    });
    
    btnSignOut.addEventListener("click", e => {
        firebase.auth().signOut();
        document.location.href = "login.html";
    });
}());