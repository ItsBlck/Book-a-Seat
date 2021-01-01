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
    async function load() {
        var docRef = db.doc("120seats/seat" + document.getElementById("number").value);
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
    $("#reserveForm").submit(function(e) {
        e.preventDefault();
        var date = document.getElementById("date").value;
        var str = "";
        if(date == "02/28/2021"){
            str = "2";
        } else if(date == "03/31/2021") {
            str = "3";
        }
        var check = await load(str);
        if(!check) {
            $('.ui.form').form('add prompt', "number", "Seat already in use");
            return false;
        }
        if($('.ui.form').form('is valid')) {
            var name = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
            var phonenumber = document.getElementById("phoneNumber").value;
            var type = document.getElementById("type").value;
            var seatNumber = document.getElementById("number").value;
            var price; 
            if(type == "0") {
                price = 5.0;
            } else if (type == "1") {
                price = 0.0;
            } else {
                price = 10.0;
            }
            db.collection("120seats" + str).doc("seat" + seatNumber).set({
                purchased: true,
                reserved: false,
                blocked: false,
                name: name,
                phonenumber: phonenumber,
                type: type,
                price: price,
                seat: seatNumber
            }).then(function() {
                console.log("Document written");
            }).catch(function(error) {
                console.error("Error adding document ", error);
            })
            /* Used to generate default files in database
            for(i=1;i<121;i++) {
                db.collection("120seats").doc("seat"+i).set({
                    purchased: false,
                    reserved: false,
                    blocked: false,
                    name: "",
                    phonenumber: "",
                    type: "",
                    price: 0.0,
                    seat: i
                }).then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                }).catch(function(error) {
                    console.error("Error adding document ", error);
                })
            }
            */
        };
     });

}());