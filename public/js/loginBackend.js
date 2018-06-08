//Create new user with firebase authentication
function signUp()
{
    let email = document.getElementById('emailSign').value;
    let password=document.getElementById('passwordSign').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         location.href=`index.html?id=${user.email}`;
        }
        });
}

function goHome(where)
{
  location.href=`index.html?id=${where}`;
}

//Log in with firebase authentication
function login()
{
    let email = document.getElementById('emailLogin').value;
    let password = document.getElementById('passwordLogin').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         location.href=`index.html?id=${user.email}`;
        }
        });
}
function goToLogin()
{
    location.href = "Login.html";
}

function logOut()
{
    firebase.auth().signOut();
    document.getElementById('home_login_btn').classList.remove("hidden");
    location.href = "index.html";
}
//Show signup if user does click "crear cuenta"
function showSignUP()
{
    let signUpHead = document.getElementById("register-form-link");
    signUpHead.classList.add("active");
    signUpHead.innerHTML="Crear cuenta";
    document.getElementById("login-form").style.display="none";
    document.getElementById("login_head").style.display="none";
    document.getElementById("register-form").style.display="block";
}
//Show login if user does click "iniciar  sesion"
function showLogin()
{
    let signUpHead = document.getElementById("register-form-link");
    signUpHead.classList.remove("active");
    signUpHead.innerHTML="Crear cuenta";
    document.getElementById("login-form").style.display="block";
    document.getElementById("login_head").style.display="block";
    document.getElementById("register-form").style.display="none";
}

//Show projects and buttons if user login
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('home_login_btn').classList.add("hidden");
        document.getElementById('mis_proyectos_logout').classList.add('hidden');
        document.getElementById('mis_proyectos_login').classList.remove('hidden');  
        document.getElementById('subscribe').classList.add('hidden');
        document.getElementById('log_out').classList.remove("hidden"); 
    } else {
        document.getElementById('mis_proyectos_logout').classList.remove('hidden');
        document.getElementById('mis_proyectos_login').classList.add('hidden');  
        document.getElementById('log_out').classList.add("hidden");
        document.getElementById('subscribe').classList.add('hidden');
    }
});
