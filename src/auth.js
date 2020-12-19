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
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            user = firebaseUser;
            console.log("Yo we signed in!!!");
        } else {
            console.log("not logged in");
        }
    })
}());