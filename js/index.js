console.log("This is my script");

// Sample results = {
//     "tag": "",
//     "free": true,(Free Email Provider:yes)
//     "role": false,(Role Email Address:no)
//     "user": "ayush0146patel",
//     "email": "ayush0146patel@gmail.com",
//     "score": 0.64,
//     "state": "deliverable",
//     "domain": "gmail.com",
//     "reason": "valid_mailbox",
//     "mx_found": true,(MX Valid:found and valid)
//     "catch_all": null,
//     "disposable": false,(Disposable Email Provider:no)
//     "smtp_check": true,(SMTP Valid:can receive mail)
//     "did_you_mean": "",
//     "format_valid": true(found and valid)
// }

submitbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Submit clicked");
    resultCont.innerHTML=`<img src="img/loading.svg" alt=""></img>`
    let key = "ema_live_R5EsJAolvOZT3dJoW5DyUnAAc3KxQOswOOCIx2UJ";
    let email = document.getElementById("useremail").value;
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    let res = await fetch(url);
    let result = await res.json();console.log(result);

    let str = ``;
    resultCont.innerHTML = "";
    for (key of Object.keys(result)) {
        if (result[key] != "" && result[key] != " " && result[key] != null) {
            let mod_key = key;
            let res = result[key];
            let id;
            if (key == "free") {
                // mod_key=key.padEnd(19," Email Provider");
                mod_key = "Free Email Provider";
                result[key] ? res = "yes" : res = "no";
            }
            else if (key == "disposable") {
                mod_key = "Disposable Email Provider";
                result[key] ? res = "yes" : res = "no";
            }
            else if (key == "format_valid") {
                mod_key = "Format Valid";
                result[key] ? res = "found and valid" : res = "not found";
            }
            else if (key == "mx_found") {
                mod_key = "MX Valid";
                result[key] ? res = "found and valid" : res = "not found";
            }
            else if (key == "smtp_check") {
                mod_key = "SMTP Valid";
                result[key] ? res = "can receive mail" : res = "can't receive mail";
            }
            else if (key == "role") {
                mod_key = "Role Email Address";
                result[key] ? res = "yes" : res = "no";
            }
            if (key == "state") {
                res == "deliverable" ? id = "green" : id = "red";
                str = `<div id=${id}><b>${mod_key} :</b> ${res}</div>`;
                resultCont.innerHTML += str;
                document.getElementById(`${id}`).style.color = `${id}`;
            } else {
                str = `<div><b>${mod_key} :</b> ${res}</div>`;
                resultCont.innerHTML += str;
            }
        }
    }
})