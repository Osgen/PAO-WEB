

let file;
let image;
let iduser;
let announcement={goal:null, image:null, title:null, body:null, howto:null, to:null, pdf:null};

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      iduser = user.email;  
    } 
  });

function uploadFile()
{
  let pdf = document.getElementById('pdf');
  pdf.addEventListener('change', function(e){
    file = e.target.files[0];
    });
}

function uploadImage()
{
  let img = document.getElementById('image');
  img.addEventListener('change', function(e){
    image= e.target.files[0];
  });
}

function goHome(where)
{
  location.href=`index.html?id=${iduser}${where}`;
}


function submit()
{
  announcement.title =document.getElementById('title').value;
  announcement.body = document.getElementById('body').value;
  announcement.goal = document.getElementById('obj').value;
  announcement.howto = document.getElementById('howto').value;
  announcement.to = document.getElementById('to').value;
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

      announcement.title = announcement.title.toUpperCase();
      announcement.pdf = urlFile;
      announcement.image = urlImage;
      firebase.database().ref('announcements').push(announcement, function(error){
        if(!error)
        {
          location.href=`index.html?id=${iduser}#blog`;
        }
      });
    });
  });
}