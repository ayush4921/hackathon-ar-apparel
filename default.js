document.getElementById("logout").onclick = function () {
  logout();
};
document.getElementById("google").onclick = function () {
  signinwithgoogle();
};

function additem() {
  var db = firebase.firestore();

  var user = firebase.auth().currentUser;

  var cityRef = db.collection(user.uid).doc("data");

  var setWithMerge = cityRef.set(
    {
      cart: document.getElementById("qty").value,
    },
    { merge: true }
  );
}

function getCheckoutdata() {
  var db = firebase.firestore();

  var user = firebase.auth().currentUser;

  let first_name = document.getElementById("first_name").value;
  let last_name = document.getElementById("last_name").value;
  let company = document.getElementById("company").value;
  let email = document.getElementById("email").value;
  let country = document.getElementById("country").value;
  let street_address = document.getElementById("street_address").value;
  let city = document.getElementById("city").value;
  let zipCode = document.getElementById("zipCode").value;
  let phone_number = document.getElementById("phone_number").value;
  let comment = document.getElementById("comment").value;

  var db = firebase.firestore();

  var user = firebase.auth().currentUser;

  var cityRef = db.collection("orders").doc(user.uid);

  var setWithMerge = cityRef.set(
    {
      first_name: first_name,
      last_name: last_name,
      company: company,
      email: email,
      country: country,
      street_address: street_address,
      city: city,
      zipCode: zipCode,
      phone_number: phone_number,
      comment: comment,
    },
    { merge: true }
  );
}

function readdata() {
  var db = firebase.firestore();

  var user = firebase.auth().currentUser;

  db.collection(user.uid)
    .doc("data")
    .onSnapshot(function (doc) {
      console.log("Current data: ", doc.data());
      const number_of_items = doc.data();
      document.getElementById("number_of_items").innerText =
        number_of_items.cart;
      try {
        document
          .getElementById("qty")
          .setAttribute("value", number_of_items.cart);
      } catch {}
      document.getElementById("subtotal").innerText =
        "$ " + number_of_items.cart * 180;
      try {
        if (number_of_items.cart > 0) {
          document.getElementById("cartitem").style.display = "block";
        }
      } catch {}
    });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    document.getElementById("userdetails").style.display = "block";

    var name, email, photoUrl, uid, emailVerified;
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    console.log(name, email, photoUrl, uid, emailVerified);
    document.getElementById("google").style.display = "none";
    document.getElementById("logout").style.display = "block";
    var src = document.getElementById("userdetails");
    src.innerText = "Hello, " + name;
    /*
    var img = document.createElement("img");

    img.src = photoUrl;

    src.appendChild(img);*/
    readdata();
  } else {
    document.getElementById("google").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("userdetails").style.display = "none";
    try {
      document.getElementById("cartitem").style.display = "none";
    } catch {}
  }
});

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      alert("logout successful");
    })
    .catch(function (error) {
      alert("an error happened");
    });
}

function signinwithgoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user.displayName);
      console.log(user.email);
      console.log(user.photoURL);
      console.log(user.emailVerified);
      console.log(user.uid);
      document.getElementById("google").style.display = "none";
      document.getElementById("logout").style.display = "block";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert(errorCode);
      // ...
    });
}
