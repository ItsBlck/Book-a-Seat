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
    var db = firebase.firestore();

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
    async function loadData() {
        var date = document.getElementById("date").value;
        var str = "";
        if(date == "02/28/2021") {
            str = "2";
        } else if(date == "03/31/2021"){
            str = "3";
        }
        for(i=1; i < 121; i++) {
            var docRef = db.doc("120seats"+ str +"/seat" + i);
            var purchased, reserved, blocked;
            await docRef.get().then(function(doc) {
                const data = doc.data();
                purchased = data.purchased;
                reserved = data.reserved;
                blocked = data.blocked;
                var s = "seat" + i;

                var card = document.getElementById(s);
                if(reserved == true) {
                    card.className = "ui card blue";
                } else if (purchased == true) {
                    card.className = "ui card red";
                } else if (blocked == true) {
                    card.className = "ui card grey";
                } else {
                    card.className = "ui card green";
                }
            })
        } 
    }
    document.addEventListener('DOMContentLoaded', async function() {
        await loadData();
     }, false);

    var refBtn = document.getElementById("refBtn");
    refBtn.addEventListener("click", async function() {
        await loadData();      
    })
}());