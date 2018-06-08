const refRequests = firebase.database().ref("requests");

let requestsnKeys=[];
let requestsKeys=[];
let requests=[];
let iduser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      iduser = user.email;  
    } 
  });

refRequests.on("value", snap => {
    requestsKeys = Object.keys(snap.val());
    requestsnKeys = snap.val();
  
    if(requestsKeys.length<1)
    {
        document.getElementById("requests-list").innerText='Sin peticiones';
    }
    else
    {
        for (let i = 0; i < requestsKeys.length; i++) {
            requests[i] = requestsnKeys[requestsKeys[i]];
            requests[i].id = requestsKeys[i];
          }
          //console.log(requests);
        
          const Allrequests = `
          <div class="panel-group" id="accordion">
              ${requests.map(request =>`
              <div class="panel panel-info">
                  <div class="panel-heading">
                      <h4 class="panel-title">
                      <a href="#collapse${request.id}" data-toggle="collapse" data-parent="accordion">${request.user}</a>
                      </h4>
                  </div>
                  <div id="collapse${request.id}" class="panel-collapse collapse in">
                      <div class="panel-body">
                          Para la convocatoria: ${request.announcement}
                          <hr>
                          <a href="#" class="card-link" onClick="pdfRequest('${request.pdf}')">Ver Pdf</a>
                          <hr>
                          <button type="button" class="btn btn-success" onClick="acept('${request.user}+${request.announcement}+${request.id}')">Aceptar</button>
                          <button type="button" class="btn btn-danger" onClick="reject('${request.id}')">Rechazar</button>
                      </div>
                  </div>
              </div>
              `)}
          </div>
        `;
          //console.log(Allrequests);
          document.getElementById("requests-list").innerHTML = Allrequests;
    }
  });

  function reject(id)
  {
    firebase.database().ref("requests/"+id).remove();
  }

  function acept(emailAnnouncement)
  {
    let email = emailAnnouncement.split('+')[0];
    let annon = emailAnnouncement.split('+')[1];
    let id = emailAnnouncement.split('+')[2];
    firebase.database().ref('evaluators/').push({announcement:annon,user:email});
    firebase.database().ref("requests/"+id).remove();
  }

  function pdfRequest(pdf)
  {
      window.open(pdf);
  }

  function goHome(where)
{
  location.href=`index.html?id=${iduser}${where}`;
}

