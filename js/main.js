var nameinput = document.getElementById("name");
var urlinput = document.getElementById("url");
var addbtn = document.getElementById("addbtn");
var tablebody = document.getElementById("tablebody");
var inputs = document.getElementsByClassName("form-control");

var pnameinput = document.getElementById("pname");
var purlinput = document.getElementById("purl");

var bookmars;

var recurentindex = 0; 
if (localStorage.getItem("Bookmarks") == null)
{
    bookmars = [];
}

else
{
    bookmars = JSON.parse(localStorage.getItem("Bookmarks"));
    display();
}
addbtn.onclick = function()
    {
        if (addbtn.innerHTML == "update")
        {
            addbtn.innerHTML = "submit";
            editData();
            

        }
        else
        {
            addbookmark();
        }
        
        
        display();
        rest();
       
    }

function addbookmark()
{
    var bookmark = 
    {
        name: nameinput.value , 
        url: urlinput.value ,
       
    }

    bookmars.push(bookmark);
    console.log(bookmars)
    
    localStorage.setItem("Bookmarks" , JSON.stringify(bookmars));

}   


function display()
{
    var container = "";
    for (var i = 0 ; i < bookmars.length ; i++)
    {
        container += 
            `
            <tr  class="m-auto  ">
            <td class = " fontcolor crudname  "> ${bookmars[i].name} </td>
            <td> <a href= "https://${bookmars[i].url}" class = "butttonlink btn btn-primary mt-4" target="_blank"> visit </a></td>
            <td> <button onclick='deletebook(${i})' class = " btn btn-danger ">delete</button></td>
            <td> <button onclick='update(${i})' class = " btn btn-warning  ">update</button></td>

            </tr>`   
           

    }

    tablebody.innerHTML  = container;
}


function deletebook (index)
{
   
    bookmars.splice(index , 1);
    display();
    localStorage.setItem("Bookmarks" , JSON.stringify(bookmars));
    

}

function rest ()
{
    for(var i = 0 ; i <inputs.length; i++)
    {
        inputs[i].value = "";
    }

}

function update(index)

{

    var currentindex = bookmars[index];

    nameinput.value = currentindex.name;
    urlinput.value = currentindex.url;
    addbtn.innerHTML = "update";
    recurentindex = index;

}

function editData()
{
    var bookmark = 
    {
        name: nameinput.value , 
        url: urlinput.value ,

    }

    bookmars[recurentindex] = bookmark;
    localStorage.setItem("Bookmarks" , JSON.stringify(bookmars));

}


function search(searchTxt)
{
    var container = "";
    for (var i = 0 ; i < bookmars.length ; i++)
    {
        if (bookmars[i].name.toLowerCase().includes(searchTxt))
        {
            container += 
            `
            <tr class="d-flex align-items-center ">
            <td class = "fontcolor"> ${bookmars[i].name} </td> 
            <td> <a href= "http://${bookmars[i].url}" class = "butttonlink btn btn-primary " target="_blank"> visit </a></td>
            <td> <button onclick='deletebook(${i})' class = " btn btn-danger">delete</button></td>
            <td> <button onclick='update(${i})' class = " btn btn-warning">update</button></td>
            </tr>`   
           

        }
        
    }

    document.getElementById("tablebody").innerHTML = container;
}


nameinput.onkeyup = function()
{
    namevalidate();
}

urlinput.onkeyup = function()
{
    urlvalidate();
}

function namevalidate()
{
    var rexname = /^[A-Z][a-z]{2,7}$/;

    if (!rexname.test(nameinput.value))
    {
        addbtn.disabled = "true";

    }

    else
    {
        addbtn.removeAttribute("disabled");
        pnameinput.parentNode.removeChild(pnameinput);
    }
}

function urlvalidate()
{
    var rexurl =/^www.[a-zA-z0-9]{2,15}.com$/;



    if (!rexurl.test(urlinput.value))
    {
        addbtn.disabled = "true";

    }

    else
    {
        addbtn.removeAttribute("disabled");
        purlinput.parentNode.removeChild(purlinput);
    }
}