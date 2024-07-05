async function handleSignIn(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/signin",
      { email, password },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("Signed in successfully:", response.data);
      window.location.href = "./index.html";
    } else if (response.status === 400) {
      alert(response.data.message);
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

async function handleSignup(event) {
  console.log("handleSignup");
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:4000/auth/signup", {
      username,
      email,
      password,
    });

    // Handle successful sign-up
    if (response.status === 201) {
      console.log("Signed up successfully:", response.data);
      window.location.href = "signin.html"; // Redirect to the sign-in page
    }
  } catch (error) {
    console.error("Error signing up:", error);
  }
}
