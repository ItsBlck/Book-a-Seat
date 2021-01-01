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
    var btnJan = document.getElementById("jan");
    var btnFeb = document.getElementById("feb");
    var btnMar = document.getElementById("mar");

    btnJan.addEventListener("click", e=> {
        loadData("");
        btnJan.className = "active item";
        btnFeb.className = "item";
        btnMar.className = "item";
    })
    btnFeb.addEventListener("click", e=> {
        loadData("2");
        btnJan.className = "item";
        btnFeb.className = "active item";
        btnMar.className = "item";
    })
    btnMar.addEventListener("click", e=> {
        loadData("3");
        btnJan.className = "item";
        btnFeb.className = "item";
        btnMar.className = "active item";
    })
    
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

    
    async function loadData(str) {
        var tSold = document.getElementById("tSold");
        var tRemaining = document.getElementById("tRemaining");
        var tRevenue = document.getElementById("tRevenue");
        tSold.innerHTML = '<div class="ui active inline loader"></div>'
        tRemaining.innerHTML = '<div class="ui active inline loader"></div>';
        tRevenue.innerHTML = '<div class="ui active inline loader"></div>';
        var list = document.getElementById("list");
        list.innerHTML = '<div class="ui active inline loader"></div>';
        var totalRevenue = 0;
        var totalAllocated = 0;
        var sNames = [];
        var dict = {};

        for(i=1; i < 121; i++) {
            var docRef = db.doc("120seats"+ str +"/seat" + i);
            var lastName;
            var purchased, reserved, price, name;
            await docRef.get().then(function(doc) {
                const data = doc.data();
                purchased = data.purchased;
                reserved = data.reserved;
                price = data.price;
                name = data.name;
                var res = name.split(" ");
                lastName = res[1];
                sNames.push(lastName);
                totalRevenue = totalRevenue + price;
                if(purchased == true || reserved == true) {
                    totalAllocated = totalAllocated + 1;
                    dict[lastName] = `Seat ${i}: ${name}\t${data.phonenumber}`;
                }
            })
        }
        while(list.firstChild) {
            list.removeChild(list.lastChild);
        }
        sNames.sort();
        for(i=0; i < sNames.length; i++) {
            var header = document.createElement("div");
            header.className = "header";
            header.textContent = dict[sNames[i]];
            list.appendChild(header);
        }
        tSold.textContent = totalAllocated;
        tRemaining.textContent = 120 - totalAllocated;
        tRevenue.textContent = "£" + totalRevenue;
    }
    document.addEventListener('DOMContentLoaded', async function() {
        await loadData("");
     }, false);

    async function load(str) {
        var docRef = db.doc("120seats" + str + "/seat" + document.getElementById("number").value);
        var res = await docRef.get().then(function(doc) {
            const data = doc.data();
            if(data.purchased || data.reserved || data.blocked) {
                return false;
            } else {
                return true;
            };
        })
        return res;
    }

    $("#blockingForm").submit(async function(e) {
        e.preventDefault();
        var str = "";
        if(btnFeb.className == "active item") {
            str = "2";
        } else if(btnMar.className == "active item") {
            str = "3";
        }
        var check = await load(str);
        console.log(check);
        if(!check) {
            $('.ui.form').form('add prompt', "number", "Seat already in use");
            return false;
        }
        if($('.ui.form').form('is valid')) {
            var seatNumber = document.getElementById("number").value;
            db.collection("120seats" + str).doc("seat" + seatNumber).set({
                purchased: false,
                reserved: false,
                blocked: true,
                name: "",
                phonenumber: "",
                type: "",
                price: 0,
                seat: seatNumber
            }).then(function() {
                console.log("Document written");
            }).catch(function(error) {
                console.error("Error adding document ", error);
            })
        }
    });
}());