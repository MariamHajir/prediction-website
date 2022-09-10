// Getting elements by ID
let btnSubmit=document.getElementById("submit");
let nameField=document.getElementById("name");
let result=document.getElementById("result");
let gender;
let age;
let country_codes;
const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

// asyncronize dog api pictures

async function getDog(){
    const response= await fetch("https://dog.ceo/api/breeds/image/random");
    const img=await response.json();
    document.getElementById("dogImage").src=img.message; //display random dog image from api
}
getDog();
// catching errors if name not found.
btnSubmit.addEventListener("click",()=>{
    let name=nameField.value;
    if(!name){
        result.textContent="Please enter a name first.";
    }
    else{
        getGender(name,getAge);
    }
});

// asyncronize gender api 

async function getGender(name, getAge){
    const response=await fetch("https://api.genderize.io?name="+name);
    gender=await response.json();
    getAge(name,getNationality); //call function get age after get gender is done
} 

// asyncronize age api 

async function getAge(name,getNationality){
    const response=await fetch("https://api.agify.io/?name="+name);
    age=await response.json();
    getNationality(name); //call function get nationality after get age is done
}

// asyncronize age api 

async function getNationality(name){
    const response=await fetch("https://api.nationalize.io/?name="+name);
    const country=await response.json();
    country_codes=country.country;
    print();
}

// getresults 

function print(){
    result.innerHTML="Gender: "+ gender.gender;
    result.innerHTML+="<br>Age: "+ age.age;
    result.innerHTML+="<br>Country: ";
    country_codes.map(function (code){  
        result.innerHTML+=regionNames.of(code.country_id)+" ";
    });
}
