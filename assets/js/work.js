/******************/
/*    WORK.JS     */
/******************/

// define request options
let requestOptions = {
  method: "GET",
  redirect: "follow",
};

// fetching all projects from the server
fetch("../assets/projects.json", requestOptions)
  // parsing response as json
  .then((response) => response.json())
  // using that json
  .then((projects) => {

    // iterate through all objets in the main object
    projects.forEach((project) => {

      // defining empty array of links
      var links = [];

      // iterate through all links in current project-object
      Object.entries(project.links[0]).forEach(([url, name]) => {
        // adding html code to the 'links' array
        links.push(`<a href="${name}" target="_blank">${url}</a>`);
      });

      // adding html to frontend table
      document.getElementById("table")
              .innerHTML +=   `<tr class="table-border-row">
                                  <td class="table-row-labels" width="10%">
                                    ${project.name}
                                  </td>
                                  <td>
                                    ${project.description}
                                  </td>
                                  <td>
                                    ${project.topics.sort().join(", ")}
                                  </td>
                                  <td>
                                    ${project.languages.sort().join(", ")}
                                  </td>
                                  <td>
                                    ${links.sort().join("&nbsp;&nbsp;")}
                                  </td>
                              </tr>`;
    });
  });
