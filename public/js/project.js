let str = window.location.href;
let id = str.split("=")[1];
console.log(id);
let linkPdf;
let iduser;

const project = firebase.database().ref('projects/'+id);
project.on('value', snap =>{
  const head = `
  <div class="fill" style="background-image:url('${snap.val().image}');">
    <div class="hero">
      <h1>${snap.val().title}</h1>
    </div>
  </div>`;
  linkPdf = snap.val().pdf;
  document.getElementById('head-project').innerHTML=head;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    iduser = user.email;  
  } 
});

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
