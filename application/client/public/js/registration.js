const regForm = document.forms[0];
const submit = document.getElementById("submit");
submit.addEventListener("click",validate);

function validate(e) {
  const username = document.getElementById("username");
  const pass = document.getElementById("password");
  const cpass = document.getElementById("confirmPassword");
  const email = document.getElementById("email");
  const cAge = document.getElementById("confirmAge");
  const tos = document.getElementById("tos");
  //TODO TOS and confirmAge
  if( !checkUsername(username) || !checkPassword(pass,cpass) || !checkEmail(email) || !checkAge(cAge) || !checkTOS(tos)) {
    e.preventDefault();
  } 
}

const checkUsername = (username) => {
  let valid = false;
  const minChars = 3;
  const charReg = /[a-zA-Z]/;
  const alphReg = /^\w+$/; 
  const name = document.getElementById("username").value.trim();

  let errorMsg = "";
  if (name.length < minChars) {
    errorMsg += "Username must be longer than 2 characters.\n";
  }
  //first char of username must be letter
  if (!charReg.test(name[0])) {
    errorMsg += "Error: Username must begin with a letter.\n";
  }
  if (!alphReg.test(name)) {
    errorMsg += "Error: Invalid characters in username.\n";
  }   
  if(errorMsg === "") {
    valid = true;
  }
  username.setCustomValidity(errorMsg);
  username.reportValidity();
  return valid;
}

const checkPassword = (pass, cpass) => {
  const pwd = pass.value;
  const cpwd = cpass.value;
  let valid = false;
  //at least one uppercase letter, digit, and special char
  const regex = /(?=.*\d)(?=.*[A-Z])(?=.*[/*-+!@#$^&~\[\]])/;
  const minLength = 8;
  let errorMsg = "";
  if (pwd.length < minLength) {
    errorMsg += "Password must be at least 8 characters.\n";
  }
  if (!regex.test(pwd)) {
    errorMsg += "Password must contain a mix of uppercase, lowercase, and special characters.\n";
  }
  if (pwd !== cpwd) {
    errorMsg += "Passwords do not match.\n";
  } 
  if (errorMsg === "") {
    valid = true;
  }
  pass.setCustomValidity(errorMsg);
  pass.reportValidity();
  return valid;
}

const checkEmail = (email) => {
  let valid = false;
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Invalid email.");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
    valid = true;
  }
  return valid;
}

const checkTOS = (tos) => {
  if(tos.validity.valueMissing) {
    tos.setCustomValidity("Accept the TOS and Privacy Policy to continue");
    tos.reportValidity();
    return false;
  }
  tos.setCustomValidity("");
  return true;
}

const checkAge = (cAge) => {
  if(cAge.validity.valueMissing) {
    cAge.setCustomValidity("Confirm your age to continue");
    cAge.reportValidity();
    return false;
  }
  cAge.setCustomValidity("");
  return true;
}

