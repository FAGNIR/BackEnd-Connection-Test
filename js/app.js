const url = "http://localhost:55772/api/Users";
const id_user = $("#id_user");
const ShowT = $("#showTable");
const AddT =  $("#id_userToTable");
const buttonAddUser = $("input[name = addUser]");
var user = {
    FirstName: "",
    LastName: "",
    MiddleName: "",
    Password: "",
    BirthDate: "",
    Picture: "",
    Registered: ""
}
var Users = new Array();
var is_edit = false;
var is_hidden = true;
var is_valid = "";

ShowT.click(()=>{
    if(is_hidden == true)
    {
        ShowT[0].innerHTML = 'Hide';
        AddT.show();
    }
    else
    {
        ShowT[0].innerHTML = 'Show more';     
        AddT.hide();
    }
    is_hidden = !is_hidden;
});


function createInputText(newUserValue) {
    let newIput = document.createElement("input");
    newIput.type = "text";
    newIput.value = `${newUserValue}`;
    return newIput;
}


function addRequest(user){
    $.ajax(
        {
            type: "POST",
            url: url,
            data: user,
            success: function(data){
                console.log("success")
            },
            error:function(data){
                console.log("Error")
            }
        }
    );
}

function deleteItem(button) {
    if (is_edit) is_edit = false;
    {
        const rowParent = $(button).parent().parent().parent();
        $(button).parent().parent().remove();
       
        let userID = rowParent.prevObject[0].cells[0].innerText; 
        console.dir(userID);
        deleteRequest(userID);
    }
}


function deleteRequest(userID)
{
    $.ajax({
        url: url + "/"+userID,
        type: 'DELETE',
        success: function(data)
        {
            console.log(data);
        },
        error: function (data) {
            console.log('Error:', data);
        }
      }); 
}

showUsers()

buttonAddUser.click( () => {
        user.FirstName = $("[name='FirstName']").val();
        user.LastName = $("[name='LastName']").val();
        user.MiddleName = $("[name='MiddleName']").val();
        user.Password = $("[name='Password']").val();
        user.BirthDate = $("[name='BirthDate']").val();
        user.Picture = $("[name='Picture']").val();
        user.Registered = $("[name='Registered']").val();

        if (Validate(user)) 
        {
            addRequest(user);
            Users.push(user);
            setTimeout(()=>{$("#id_user").children('tbody')[0].innerHTML = "";}, 100);              
            setTimeout(()=>{showUsers(Users)}, 100);      
        }
        else
        {
            alert(is_valid);
        }

    }
)


function showUsers() {
    Users = getRequest()
    console.log(Users.length)
    for (let i = 0; i < Users.length; i++) {
        
        $("#id_user").children('tbody').append( 
            `<tr>
            <td>${Users[i].UserID}</td>
            <td>${Users[i].FirstName}</td>
            <td>${Users[i].LastName}</td>
            <td>${Users[i].MiddleName}</td>
            <td>${Users[i].Password}</td>
            <td>${Users[i].BirthDate}</td>
            <td>${Users[i].Picture}</td>
            <td>${Users[i].Registered}</td>
            <td>       
           <button name='buttonDelete' style="width: 100%" onclick='deleteItem(this)'> Delete</button>
           <button name='buttonEdit'style="width: 100%" onclick='editItem(this)'>Edit</button>           
            </td></tr>`);
        
        
        $("[name='FirstName']").val("");
        $("[name='LastName']").val("");
        $("[name='MiddleName']").val("");
        $("[name='Password']").val("");
        $("[name='BirthDate']").val("");
        $("[name='Picture']").val("");
        $("[name='Registered']").val(""); 
    }
};
function saveItem(button) {

    var Row = $(button).parent().parent();
    console.dir(Row)
    save(Row);
}
function save(Row) {
    user.UserID = Row.find("input")[0].value;
    user.FirstName = Row.find("input")[1].value;
    user.LastName = Row.find("input")[2].value;
    user.MiddleName = Row.find("input")[3].value;
    user.Password = Row.find("input")[4].value;
    user.BirthDate = Row.find("input")[5].value;
    user.Picture = Row.find("input")[6].value;
    user.Registered = Row.find("input")[7].value;

    if (Validate(user)) {
        Row.children()[0].innerText = user.UserID;
        Row.children()[1].innerText = user.FirstName;
        Row.children()[2].innerText = user.LastName;
        Row.children()[3].innerText = user.MiddleName;
        Row.children()[4].innerText = user.Password;
        Row.children()[5].innerText = user.BirthDate;
        Row.children()[6].innerText = user.Picture;
        Row.children()[7].innerText = user.Registered;

        editRequest(user)
        if (is_edit) is_edit = false;
        $("[name=btnSaveUser]").remove();
        $("[name=btnEditUser]").show();
    }
    else {
        alert(is_valid);
    }
}
function Validate(user) {
    let result = true;
    is_valid = "";

    if (user.FirstName == "") {
        result = false;
        is_valid += "Enter First Name!\n";
    }
    if (user.LastName == "") {
        result = false;
        is_valid += "Enter Last Name!\n";
    }
    if (user.MiddleName == "") {
        result = false;
        is_valid += "Enter Middle Name!\n";
    }

    if (user.Password == "") {
        result = false;
        is_valid += "Enter Password!\n";
    }
    if (user.BirthDate == "") {
        result = false;
        is_valid += "Enter Birth date!\n";
    }
    if (user.Registered == "") {
        result = false;
        is_valid += "Enter Registeration date!\n";
    }
    return result;
}