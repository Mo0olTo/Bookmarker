var siteNameInput = document.getElementById("siteName");
var urlNameInput = document.getElementById("urlName");
var submitBtn = document.getElementById("submitBtn")

var tableContent = document.getElementById("tableContent")


// var deleteBtn =document.getElementById("delete")
// var visitBtn = document.getElementById("visit")

var urlList=[];


submitBtn.addEventListener("click",submitLink)
if(localStorage.getItem("urlWallet")!= null ){
    urlList=JSON.parse(localStorage.getItem("urlWallet"))

  
     displayUrl();
    
}



function submitLink(){
    
    if(validName() && validUrl() ){

        var link = {
            name : siteNameInput.value , 
            url : urlNameInput.value
        };
    
        urlList.push(link)
    
        localStorage.setItem("urlWallet" , JSON.stringify(urlList))
        
        displayUrl();

        clear();
       



    }else{
        
        showLayer();
    }
 

    
    
}



function displayUrl(){

    var cartona = "";

    for(var i = 0 ; i < urlList.length ; i++){

        cartona+= `
            <tr>
              <td>${i+1}</td>
              <td>${urlList[i].name}</td>
              <td>
                <button class="btn btn-success" id="visit" onclick="visitItem(${i})">
                  <i class="fa-regular fa-eye"></i>  Visit
                </button>
              </td>
              <td>
                <button class="btn btn-danger" id="delete" onclick="deleteItem(${i})">
                  <i class="fa-regular fa-trash-can"></i> Delete
                </button>
              </td>
              
            </tr>
        
        
        
        `
    }

    tableContent.innerHTML= cartona;
}

function deleteItem(index){
    urlList.splice(index,1);
    localStorage.setItem("urlWallet" , JSON.stringify(urlList))
    displayUrl()
    clear()
}

function visitItem(index){
    window.open(urlList[index].url);
    }


function clear(){
    siteNameInput.value="";
    urlNameInput.value="https://";
}



function validName(){
    var input = siteNameInput.value;
    var regex = /^[A-Z][a-x]{2,14}$/ 

    // var msg = document.getElementById("alertMsg")

    if( regex.test(input) == true  ){
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        // msg.classList.add("d-none")

        return true;
    } else{
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        // msg.classList.remove("d-none")

        return false;
        
    }
}

function validUrl(){
    var inputx = urlNameInput.value;
    var regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/ 


    // var alert = document.getElementById("alertURL")
    if(regex.test(inputx)== true){

        urlNameInput.classList.add("is-valid")
        urlNameInput.classList.remove("is-invalid")
        // alert.classList.add("d-none")

        return true;

    } else{
        urlNameInput.classList.add("is-invalid")
        urlNameInput.classList.remove("is-valid")
        // alert.classList.remove("d-none")

        return false;
    }

}




function showLayer(){
    var showlayer = document.querySelector(".layer")
    showlayer.classList.remove("d-none")
}

function hidelayer(){
    var showlayer = document.querySelector(".layer")
    showlayer.classList.add("d-none")
   
}

var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click" , hidelayer)

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      hidelayer();
    }
  });


