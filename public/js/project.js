
//Get id project from url
let str = window.location.href;
let id = str.split("=")[1];
//console.log(id);
let linkPdf;
let iduser;

//Set firebase reference to projects
const project = firebase.database().ref('projects/'+id);

//Get all the values from projects reference
project.on('value', snap =>{
  //Create list for html
  const head = `
  <div class="fill" style="background-image:url('${snap.val().image}');">
    <div class="hero">
      <h1>${snap.val().title}</h1>
    </div>
  </div>`;
  linkPdf = snap.val().pdf;
  document.getElementById('head-project').innerHTML=head;

//Watch fireabse authentication state
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      iduser = user.email;  
      if(user.email!=snap.val().evaluator)
      {
        document.getElementById('do-grade').classList.add('hidden');
      }
      else
      {
        document.getElementById('see-grade').classList.add('hidden');
      } 
    } 
  });
})

function goHome(where)
{
  location.href=`index.html?id=${iduser}${where}`;
}

function calificar()
{
  let calificacion=document.getElementById('uname').value;
  project.update({grade:calificacion});
}

function downloadPdf()
{
  window.open(linkPdf);
  //href=`'${linkPdf}'`;
}
