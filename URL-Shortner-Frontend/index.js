document
  .getElementById("short-url-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const URL = document.getElementById("url").value;
    console.log(URL, "short-url-form");
    try {
      const response = await axios.post(`http://localhost:4000/url`, {
        url: URL,
      });
      console.log(response.status, "short-url-form-1");
      if (response.status == 401) {
        window.location.href = "signup.html"; // Redirect to the sign-in page
      } else {
        displayShortURL(response.data);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      if (error.response && error.response.status === 401) {
        window.location.href = "signup.html"; // Redirect to the sign-up page
      } else {
        document.getElementById("analytics").innerHTML = `<p>Error: ${
          error.response ? error.response.data.message : error.message
        }</p>`;
      }
    }
  });

document
  .getElementById("analytics-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const shortURL = document.getElementById("shortURL").value;
    const shortId = shortURL.split("/").pop();

    try {
      const response = await axios.get(
        `http://localhost:4000/url/analytics/${shortId}`
      );
      displayAnalytics(response.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("analytics").innerHTML = `<p>Error: ${
        error.response ? error.response.data.message : error.message
      }</p>`;
    }
  });

function displayAnalytics(data) {
  const analyticsDiv = document.getElementById("analytics");
  analyticsDiv.innerHTML = `
          <p>Total Clicks: ${data.TotalClicks}</p>
          <ul>
              ${data.analytics
                .map((visit) => `<li>${visit.timestamp}  :${visit._id} </li>`)
                .join("")}
          </ul>
      `;
}
function displayShortURL(data) {
  const analyticsDiv = document.getElementById("short-url");
  analyticsDiv.innerHTML = `
          <h3>Short URL : </h3>
                <a href="http://localhost:4000/url/${data.shortURL}" target="_blank" >http://localhost:4000/url/${data.shortURL}</a>
      `;
}
