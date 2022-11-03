// adding DOM elements to variables
const inputs = document.querySelectorAll("input[type=text]");
const errors = document.querySelectorAll(".error-msg");
const success = document.querySelector(".success");
const cards = document.querySelector(".cards");
const cardForm = document.querySelector(".form");
const firstInput = document.querySelector("#name");
const secondInput = document.querySelector("#cardNumber");
const thirdInput = document.querySelector("#expMonth");
const fourthInput = document.querySelector("#expYear");
const fifthInput = document.querySelector("#securityCard");
const buttonConfirm = document.querySelector(".form .btn");
const buttonContinue = document.querySelector(".success .btn");
//This function adds the card owner name to the front card
function ownerName(){
    const name = document.querySelector(".owner-name");
    if (this.value.length >= 22) this.value = this.value.slice(0,-1);
    name.innerHTML =  this.value == ""? "Jane Appleseed" : this.value;
}
//This function adds the card number to the front card
function numberCard(){
    const cardNumber = document.querySelector(".card-number");
    let value = "";
        this.value = this.value.replace(/\s/g, ""); //remove white spaces
        //formats the input and number in frond card
        for (let index = 0; index < this.value.length; index++) {
            value+=this.value[index]
            if((index+1)%4===0){
                value +=" "
            }
            
        }
        this.value = value.toUpperCase();
    //Needed to restrict user of putting white spaces
    if(/\s/g.test(this.value[this.value.length-1])){
        this.value = this.value.slice(0,-1);
    }
   //checks the lenght of the input value
    if (this.value.length >= 20) this.value = this.value.slice(0,-1);
    //insert the input data into front card
    cardNumber.innerHTML =  this.value == ""? "0000 0000 0000 0000" : this.value;
}
//This function adds the card expiration month to the front card
function expMonth(){
    const month = document.querySelector(".exp-date .month");
    if (this.value.length > 2) this.value = this.value.slice(0,-1);
    month.innerHTML =  this.value == ""? "00" : this.value;
    this.value = this.value.toUpperCase();
}
//This function adds the card expiration year to the front card
function expYear(){
    const year = document.querySelector(".exp-date .year");
    if (this.value.length > 2) this.value = this.value.slice(0,-1);
    year.innerHTML =  this.value == ""? "00" : this.value;
    this.value = this.value.toUpperCase();

}
//This function adds the card security number to the front card
function securityCard(){
    const securityCode = document.querySelector(".card-code");
    if (this.value.length > 3) this.value = this.value.slice(0,-1);
    securityCode.innerHTML =  this.value == ""? "000" : this.value;   
    this.value = this.value.toUpperCase();

}
//Validates and confirm form
function confirm(){
    //min lenght of numeric data: card number, expiration data, security number
    const minNumber = [16,2,2,3];
    let response = true;
    // Check if there is empty inputs
    for(let i=0; i<inputs.length; i++){
        if(inputs[i].value==""){
            //error message of expiration data values
            if(i == 3 || i == 4){
                errors[i-1].innerHTML = "Can't be blank";
                errors[i-1].style.display="block";
                response = false;
                continue
            }
            errors[i].innerHTML = "Can't be blank";
            errors[i].style.display="block";
            response = false;
        }
    }
    // Checks if owner name is in the right format
    if(inputs[0].value!="" && (/[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(inputs[0].value)){
        errors[0].innerHTML = "Wrong format, letters only";
        errors[0].style.display="block";
        response = false;
    }
    // Checks if numeric data is in the right format
    for(let i=1; i<inputs.length; i++){
        if(inputs[i].value==""){
           continue;
        }
        // Check if the value is just numeric data
        if((/^\d+$/).test(inputs[i].value.replace(/\s/g, ""))==false){
            if(i == 3 || i == 4){
                errors[i-1].innerHTML = "Wrong format, numbers only";
                errors[i-1].style.display="block";
                response = false;
                continue
            }
            errors[i].innerHTML = "Wrong format, numbers only";
            errors[i].style.display="block";
            response = false;
        }
    }
    // Checks if numeric values have the min length according to the format
    for(let i=1; i<inputs.length; i++){
        if(inputs[i].value==""){
           continue;
        }
        // Remove white spaces to check the right value
        if(inputs[i].value.replace(/\s/g, "").length<minNumber[i-1]){
            if(i == 3 || i == 4){
                errors[i-1].innerHTML = `Wrong format, must be ${minNumber[i-1]} digits`;
                errors[i-1].style.display="block";
                response = false;
                continue
            }
            errors[i].innerHTML = `Wrong format, must be ${minNumber[i-1]} digits`;
            errors[i].style.display="block";
            response = false;
        }
       
    }
    // If everything is ok, then show success message
    if(response){
        cardForm.style.display="none";
        success.style.display="initial";
    }    
}
// Reset forms and card data
function formContinue(){
    const name = document.querySelector(".owner-name");
    const cardNumber = document.querySelector(".card-number");
    const month = document.querySelector(".exp-date .month");
    const year = document.querySelector(".exp-date .year");
    const securityCode = document.querySelector(".card-code");
    cardForm.reset();
    name.innerHTML="Jane Appleseed";
    cardNumber.innerHTML="0000 0000 0000 0000";
    month.innerHTML="00";
    year.innerHTML="00";
    securityCode.innerHTML="000";
    cards.classList.add("refresh");
    setTimeout(()=>cards.classList.remove("refresh"),1500);
    cardForm.style.display="initial";
    success.style.display="none"; 
}
// Remove error message after click in a input
inputs.forEach((element)=>{
    element.addEventListener("click",()=>{
        errors.forEach(element => element.style.display="none");
    })
})
// Adding events to DOM elements
buttonConfirm.addEventListener("click",confirm);
buttonContinue.addEventListener("click",formContinue);
firstInput.addEventListener("input", ownerName);
secondInput.addEventListener("input", numberCard);
thirdInput.addEventListener("input", expMonth);
fourthInput.addEventListener("input", expYear);
fifthInput.addEventListener("input", securityCard);
