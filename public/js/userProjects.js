//Firebase root reference
const rootRef = firebase.database().ref();
//Get id from url
let str = window.location.href;
str = str.split("=")[1];
let id = str.split("#")[0];
//console.log(id);

function take_part_projects()
{
  let projectsKeys=[];
  let projectsnKeys=[];
  let projects=[];
//Set firebase reference to projects which are equal to an id
  const projectRef = rootRef.child('projects').orderByChild('iduser').equalTo(id);

  //Get all values from projects reference
    projectRef.on('value', snap => {
      projectsKeys = Object.keys(snap.val());
      projectsnKeys = snap.val();

      for(let i =0; i<projectsKeys.length; i++)
      {
        projects[i] = projectsnKeys[projectsKeys[i]];
        projects[i].id = projectsKeys[i];
      }
//Create list html for projects
      const userProject = `
      <div class="portfolioContainer">
        ${projects.map(project =>`
          <div class=" Portfolio-box" webdesign>
            <a href="proyecto.html?id=${project.id}">
              <img src="${project.image}" alt="" >
            </a>
          </div>
        `)}   
      </div>
      `;
      //console.log(userProject);
      document.getElementById('projects').innerHTML=userProject; 
    });
}


    function evaluate_projects()
    {
      let evaluateProjectsKeys=[];
      let evaluateProjectsnKeys=[];
      let evaluateProjects=[];
      //Set firebase reference to projects which are equal to an id
      const evaluateProjectRef= rootRef.child('projects').orderByChild('evaluator').equalTo(id);
      
  //Get all values from projects reference
      evaluateProjectRef.on('value', snap=> {
        evaluateProjectsKeys = Object.keys(snap.val());
        evaluateProjectsnKeys = snap.val();

        //console.log(snap.val());
        for(let i =0; i<evaluateProjectsKeys.length; i++)
        {
          evaluateProjects[i] = evaluateProjectsnKeys[evaluateProjectsKeys[i]];
          evaluateProjects[i].id = evaluateProjectsKeys[i]; 
          
        }
        //console.log(evaluateProjects.id);

        //Create list html for projects
        const userEvaluateProjects = `
        <div class="portfolioContainer">
        ${evaluateProjects.map(eval =>`
          <div class=" Portfolio-box" webdesign>
            <a href="proyecto.html?id=${eval.id}">
              <img src="${eval.image}" alt="" >
            </a>
          </div>
        `)}   
      </div>
      `;
        //console.log(userEvaluateProjects);
        document.getElementById('projects').innerHTML=userEvaluateProjects; 
      });
    }
    
    
