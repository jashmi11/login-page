let fnameEl = document.getElementById("fname");
let fnameErrMsgEl = document.getElementById("fnameErrMsg");

let lnameEl = document.getElementById("lname");
let lnameErrMsgEl = document.getElementById("lnameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let phnoEl = document.getElementById("phno");
let phnoErrMsgEl = document.getElementById("phnoErrMsg");

let currentYearEl = document.getElementById("year");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let myFormEl = document.getElementById("myform");

let formData = {
    fname: "",
    lname: "",
    email: "",
    phno: "",
    currentYear: "First year",
    gender: ""
};

fnameEl.addEventListener("blur", function(event) {
    formData.fname = event.target.value;
    if (formData.fname === "") {
        fnameErrMsgEl.textContent = "Required*";
    } else {
        fnameErrMsgEl.textContent = "";
    }
});

lnameEl.addEventListener("blur", function(event) {
    formData.lname = event.target.value;
    if (formData.lname === "") {
        lnameErrMsgEl.textContent = "Required*";
    } else {
        lnameErrMsgEl.textContent = "";
    }
});

emailEl.addEventListener("blur", function(event) {
    formData.email = event.target.value;
    if (formData.email === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
});

phnoEl.addEventListener("blur", function(event) {
    formData.phno = event.target.value;
    if (formData.phno === "") {
        phnoErrMsgEl.textContent = "Required*";
    } else {
        phnoErrMsgEl.textContent = "";
    }
});

currentYearEl.addEventListener("change", function(event) {
    formData.currentYear = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
    if (genderMaleEl.checked) {
        formData.gender = genderMaleEl.value;
    }
});

genderFemaleEl.addEventListener("change", function(event) {
    if (genderFemaleEl.checked) {
        formData.gender = genderFemaleEl.value;
    }
});

function validateFormData(formData) {
    let isValid = true;
    if (formData.fname === "") {
        fnameErrMsgEl.textContent = "Required*";
        isValid = false;
    }
    if (formData.lname === "") {
        lnameErrMsgEl.textContent = "Required*";
        isValid = false;
    }
    if (formData.email === "") {
        emailErrMsgEl.textContent = "Required*";
        isValid = false;
    }
    if (formData.phno === "") {
        phnoErrMsgEl.textContent = "Required*";
        isValid = false;
    }
    return isValid;
}

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 698578068d090485808ed9ff5cefd3d83c580486b1160bf09b1ed3cb0571539f",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                jsonData.data.forEach(error => {
                    if (error.field === "email" && error.message === "has already been taken") {
                        emailErrMsgEl.textContent = "Email Already Exists";
                    }
                });
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
}

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateFormData(formData)) {
        submitFormData(formData);
    }
});
