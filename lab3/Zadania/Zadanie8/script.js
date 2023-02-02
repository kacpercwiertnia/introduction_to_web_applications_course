const pass1 = document.querySelector("#pass1");
const pass2 = document.querySelector("#pass2");
const show1 = document.querySelector("#show1");
const show2 = document.querySelector("#show2");
const requirements = document.querySelectorAll(".requirement");

let ifShow = [false, false]
let req = [false, false, false, false];

const special_chars = new RegExp("[@$!%*?&+_\-]{1,}");
const capital_letter = new RegExp("[A-Z]{1,}");
const digit = new RegExp("[0-9]{1,}");


function checkFirstReq(password){
    if( password.length >= 8 ){
        requirements[0].innerHTML = "done";
        requirements[0].style.backgroundColor = "rgb(112, 187, 0)";
        req[0] = true;
    }else{
        requirements[0].innerHTML = "close";
        requirements[0].style.backgroundColor = "grey";
        req[0] = false;
    }

}

function checkSecondReq(password){
    if( special_chars.test(password) ){
        requirements[1].innerHTML = "done";
        requirements[1].style.backgroundColor = "rgb(112, 187, 0)";
        req[1] = true;
    }else{
        requirements[1].innerHTML = "close";
        requirements[1].style.backgroundColor = "grey";
        req[1] = false;
    }

}

function checkThirdReq(password){
    if( capital_letter.test(password) ){
        requirements[2].innerHTML = "done";
        requirements[2].style.backgroundColor = "rgb(112, 187, 0)";
        req[2] = true;
    }else{
        requirements[2].innerHTML = "close";
        requirements[2].style.backgroundColor = "grey";
        req[2] = false;
    }
}

function checkFourthReq(password){
    if( digit.test(password) ){
        requirements[3].innerHTML = "done";
        requirements[3].style.backgroundColor = "rgb(112, 187, 0)";
        req[3] = true;
    }else{
        requirements[3].innerHTML = "close";
        requirements[3].style.backgroundColor = "grey";
        req[3] = false;
    }
}

show1.addEventListener("click", () => {
    ifShow[0] = !ifShow[0];

    if( ifShow[0] ){
        pass1.type = "text";
        show1.innerHTML = "visibility_off";
    }else{
        pass1.type = "password";
        show1.innerHTML = "visibility";
    }
});

show2.addEventListener("click", () => {
    ifShow[1] = !ifShow[1];

    if( ifShow[1] ){
        pass2.type = "text";
        show2.innerHTML = "visibility_off";
    }else{
        pass2.type = "password";
        show2.innerHTML = "visibility";
    }
});

pass1.addEventListener("input", (e) => {
    let password = e.target.value;
    
    checkFirstReq(password) 
    
    checkSecondReq(password)
    
    checkThirdReq(password)
    
    checkFourthReq(password)

    if( req[0] && req[1] && req[2] && req[3]){
        pass2.disabled = false;
    }else{
        pass2.disabled = true;
    }
});

pass2.addEventListener("input", e =>{
    if(pass1.value != pass2.value){
        pass2.setCustomValidity("Password are not matching");
        pass2.reportValidity();
    }else{
        pass2.setCustomValidity("");
    }
});