
//Get reference for announcements root from firebase
const refAnnouncements = firebase.database().ref("announcements");
//Get reference for admin code from firebase
const refAdmin = firebase.database().ref('admin');

let announcementsnKeys = [];
let announcementKeys = [];
let announcements = [];

//Get all the info with announcements reference
refAnnouncements.on("value", snap => {
  announcementKeys = Object.keys(snap.val());
  announcementsnKeys = snap.val();

  for (let i = 0; i < announcementKeys.length; i++) {
    announcements[i] = announcementsnKeys[announcementKeys[i]];
    announcements[i].id = announcementKeys[i];
  }
  // console.log(announcements);
//Create list for html
let annList="";
  announcements.forEach(ann => {
  annList+=`
    <li class="col-sm-4">
        <div class="fff">
        <div class="thumbnail">
          <a href="convocatoria.html?id=${ann.id}"><img class="img_little" src=${ann.image} alt=""></a>
        </div>
        <div class="caption">
            <h4>${ann.title}</h4>
            <h6>${ann.body}</h6>
            <a class="btn btn-mini" href="convocatoria.html?id=${ann.id}">Read More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </li>
`});

  const announc = `
    <ul class="thumbnails" >
        ${annList}
    </ul>
  `;
  console.log(announc);
  document.getElementById("announcements").innerHTML = announc;
});

function goToNuevaConvocatoria()
{
  //If code typed from arduino is correct, admin logged in
  refAdmin.on('value', snap=>{
    if(snap.val().code)
    {
      alert('Contraseña valida');
      location.href="nuevaConvocatoria.html";
    }
    else
    {
      alert('Constraseña invalida');
    }
  });
  
}

function goToRequests()
{
  //If code typed from arduino is correct, admin logged in
  refAdmin.on('value', snap=>{
    if(snap.val().code)
    {
      alert('Contraseña valida');
      location.href='requests.html';
    }
    else
    {
      alert('Constraseña invalida');
    }
  });
    
}
