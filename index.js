const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';



let password='';
let passwordLength=10;
let checkcount=0;
handleSlider();
//set strenght colour to grey
setIndicator("#ccc")
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=inputSlider.value;
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
function getRndInteger(min,max)//this function will give any random no between min and max no 
//and this will be used in further functions
{
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);//function used to get integer between 0-9
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123)); //first chose a random no from 97-123 and then converted 
    //to alphabet as per assci value using fromCharCode
}
function generateUpperCase (){
    return String.fromCharCode(getRndInteger(65,91));

}
function generateSymbol(){
    const randNum= getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);

}
function calcStrength(){
   let hasUpper = false;
   let hasLower = false;
   let hasNum = false;
   let hasSym = false;
   if (uppercaseCheck.checked) hasUpper = true;
   if (lowercaseCheck.checked) hasLower = true;
   if (numbersCheck.checked) hasNum = true;
   if (symbolsCheck.checked) hasSym = true;
   if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f9");
    } else if (
   (hasLower || hasUpper) &&
   (hasNum || hasSym) &&
   passwordLength >= 6
   ) {
   setIndicator ("#ff9");
   } else {
   setIndicator ("#f00") ;}
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML="Copied"
        //write text function is used to copy the content
        //on the clipboard
    }
    catch(e){
        copyMsg.innerHTML="Failed"
    }
    copyMsg.classList.add("active")//adding active class in css 
    console.log("copied");

    setTimeout(()=>{
        copyMsg.classList.remove("active");//adding remove class in css 
        console.log("removed")

    },2000)
    

}

function generatePassword(){
 
}
function shufflePassword(array){
    //Fish Yates Method algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math. floor (Math. random() * (i + 1));
        const temp = array[i];
        array [i] = array [j];
        array [j] = temp;
        let str = "";
        array. forEach((el) => (str += el));
        return str;  

    }
}
function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach(((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }


    }));
    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleSlider();
    }

}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener("input",(event)=>{
    passwordLength=event.target.value;
    handleSlider();

})
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})


generateBtn.addEventListener('click',()=>{
    //if none of the checkbox selected then do not return the password
    if(checkcount<=0){
        return;
    }
    //if passwordLength is less than the checkbox count 
    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleSlider();
    }
    //let's start journey to new password
    console.log("starting the journey")
    //removing old password
    password="";
    //

    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory addition atleast one of the element of the no of boxes checked
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
        
    }
    console.log("compulsory Addition done");
    //adding rest of elements
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("remaining addition done");
    //shuffling the password
    console.log("shufflibg password done")
    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;

    //calculating Strength;
    calcStrength();
    

})
