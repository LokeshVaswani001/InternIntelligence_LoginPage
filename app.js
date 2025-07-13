const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;
  const rememberMe = document.getElementById("rememberMe").checked;

  if (email === "" || password === "") {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  const auth = firebase.auth();

  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  auth.setPersistence(persistence)
    .then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    })
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // redirect on success
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
    });
});
