//Set Objects attributes
project ={title:null, pdf:null, image:null, iduser:null, idann:null};
request ={pdf:null, announcement:null, user:null};



//Get id from url
let str = window.location.href;
str = str.split("=")[1];
let id = str.split("#")[0];

let iduser;
let pdfEvaluator
let pdfAnnoun;
let file;
let image;

//Set firebase references
const refProject = firebase.database().ref("projects");
const refAnnouncement = firebase.database().ref("announcements/" + id);

//Get all JSONs from firebase in with Announcement reference
refAnnouncement.on("value", snap => {
  announcement = snap.val();
  //console.log(announcement);
  document.getElementById("announcement_goal").innerHTML = announcement.goal;
  document.getElementById("announcement_to").innerHTML = announcement.to;
  document.getElementById("announcement_howto").innerHTML = announcement.howto;
  pdfAnnoun = announcement.pdf;
  //Create objects list for html
  const announ = `
              <div class="fill"  style="background-image:url('${announcement.image}');">
                <div class="hero">
                  <h1>${announcement.title}</h1>
                </div>
              </div>`;
  document.getElementById('announcement_title').innerHTML=announ;
});

function pdfAnnouncement()
{
  window.open(pdfAnnoun);
}
//Get uploaded images and files from html
function uploadFile()
{
  let pdf = document.getElementById('pdf');
  pdf.addEventListener('change', function(e){
    file = e.target.files[0];
    });
}

function uploadPdf()
{
  let pdfEvaluate = document.getElementById('pdfEvaluate');
  pdfEvaluate.addEventListener('change', function(e){
    pdfEvaluator = e.target.files[0];
    });
}

function uploadImage()
{
  let img = document.getElementById('image');
  img.addEventListener('change', function(e){
    image= e.target.files[0];
  });
}

//Get all info to create a new project
function sumit()
{
  let  title =document.getElementById('title').value;
  let storageFile = firebase.storage().ref(file.name);
  let storageImage = firebase.storage().ref(image.name);
  console.log(file.name);
  console.log(image.name);
  let taskImage = storageImage.put(image);
  let taskFile=storageFile.put(file);
  let urlImage;
  let urlFile;

  taskImage.on('state_changed', function(snapshot){}, function(err){},function(){
    urlImage = taskImage.snapshot.downloadURL;
    taskFile.on('state_changed',function(snapshot){},function(err){},function(){
      urlFile = taskFile.snapshot.downloadURL;

      project.iduser = iduser;
      project.title = title.toUpperCase();
      project.pdf = urlFile;
      project.image = urlImage;
      project.idann = id;

      //Upload to firebase with projects reference
      firebase.database().ref('projects').push(project, function(error){
        if(!error)
        {
          location.href=`index.html?id=${iduser}#portfolio`;
        }
      });
      
    });
  });
}

//Get all info to create a new request
function submitEvaluator()
{
  let storagePdf = firebase.storage().ref(pdfEvaluator.name);
  let taskFile=storagePdf.put(pdfEvaluator);
  let urlPdf;
  taskFile.on('state_changed',function(snapshot){},function(err){},function(){
    urlPdf = taskFile.snapshot.downloadURL;

    request.user = iduser;
    request.announcement=id;
    request.pdf = urlPdf

    //Upload to firebase with projects reference
    firebase.database().ref('requests').push(request, function(error){
      if(!error)
      {
        location.href=`index.html?id=${iduser}`;
      }
    });
    
  });
}

//Watch authentication state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    iduser = user.email;  
  } 
});

function goHome(where)
{
  location.href=`index.html?id=${iduser}${where}`;
}

//Authentication controls
function showTakePart()
{
  if(iduser!=undefined)
  {
    document.getElementById('evaluate').classList.add('hidden');
    document.getElementById('take_part').classList.remove('hidden');
  }
  else
  {
    document.getElementById('take_part_login').classList.remove('hidden');
  }
}

function showEvaluate()
{
  if(iduser!=undefined)
  {
    document.getElementById('take_part').classList.add('hidden');
    document.getElementById('evaluate').classList.remove('hidden');
  }
  else
  {
    document.getElementById('take_part_login').classList.remove('hidden');
  }
}
