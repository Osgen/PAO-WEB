
//Get reference for announcements root from firebase
const refAnnouncements = firebase.database().ref("announcements");


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
  const announc = `
    <ul class="thumbnails" >
        ${announcements.map(ann => `
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
        `)}    
    </ul>
  `;
  console.log(announc);
  document.getElementById("announcements").innerHTML = announc;
});

function goToNuevaConvocatoria()
{
  location.href="nuevaConvocatoria.html";
}

function goToRequests()
{
    location.href='requests.html';
}
