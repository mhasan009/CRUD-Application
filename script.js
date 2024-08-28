let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("input");
let allBtn = regForm.querySelectorAll("button");
let closeBtn = document.querySelector(".btn-close");
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let searchEl = document.querySelector(".search")
let delALLBtn = document.querySelector(".delete-all-btn")
let allRegData = [];
let url = "";


if (localStorage.getItem("allRegData") != null) {
    allRegData = JSON.parse(localStorage.getItem("allRegData"));
}

console.log(allRegData)

//Adding data
regForm.onsubmit = (e) => {
    e.preventDefault();

    let checkEmail = allRegData.find((data) => data.email == allInput[1].value);
    if(checkEmail == undefined){
        allRegData.push({
            name: allInput[0].value,
            email: allInput[1].value,
            mobile: allInput[2].value,
            dob: allInput[3].value,
            password: allInput[4].value,
            profile: url == "" ? "images/profile.png" : url
    
        });
    
        localStorage.setItem("allRegData", JSON.stringify(allRegData));
        swal("Data Inserted", "Successfully !", "success");
        closeBtn.click();
        regForm.reset('');
        getRegData();
    }else {
        swal("Email Already Exists", "Failed", "warning")
    }

}

const getRegData = () => {
    regList.innerHTML = "";
    allRegData.forEach((data, index) => {
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g,"'")
        regList.innerHTML += `
        <tr>
                                    <td>${index + 1}</td>
                                    <td>
                                        <img src="${data.profile}" width="30px">
                                    </td>
                                    <td>${data.name}</td>
                                    <td>${data.email}</td>
                                    <td>${data.mobile}</td>
                                    <td>${data.dob}</td>
                                    <td>
                                        <button index = "${index}" data = "${finalData}" class="edit-btn btn-primary p-1 px-2">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button index = "${index}" class="del-btn btn-danger p-1 px-2">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
        `
    })
    action();
}

//Delete
const action = () => {
let allDelBtn = regList.querySelectorAll(".del-btn");
for(let btn of allDelBtn){
    btn.onclick = async () => {
        let isConfirm = await confirm();
        if(isConfirm){
            let index = btn.getAttribute("index");
        allRegData.splice(index, 1);
        localStorage.setItem("allRegData", JSON.stringify(allRegData)),
        getRegData();
        }
        
    }
}

//Update
let allEditBtn = regList.querySelectorAll(".edit-btn");
let headingEl = document.querySelector(".heading")

for(let btn of allEditBtn){
    btn.onclick = () => {
        headingEl.innerHTML = "Editing User";
        let index = btn.getAttribute("index");
        let dataStr = btn.getAttribute("data");
        
        let finalData = dataStr.replace(/'/g,'"');
        let data = JSON.parse(finalData);
        addBtn.click();
        allInput[0].value = data.name;
        allInput[1].value = data.email;
        allInput[2].value = data.mobile;
        allInput[3].value = data.dob;
        allInput[4].value = data.password;
        url = data.profile;
        allBtn[0].disabled = false;
        allBtn[1].disabled = true;

        allBtn[0].onclick = () => {
            allRegData[index] = {
                name: allInput[0].value,
                email: allInput[1].value,
                mobile: allInput[2].value,
                dob: allInput[3].value,
                password: allInput[4].value,
                profile: url == "" ? "images/profile.png" : url
        
            }
            localStorage.setItem("allRegData", JSON.stringify(allRegData));
        swal("Data Updated", "Successfully !", "success");
        closeBtn.click();
        regForm.reset('');
        getRegData();
        allBtn[1].disabled = false;
        allBtn[0].disabled = true;
        }
    }
}
}

getRegData();
//Reading profile
allInput[5].onchange = () => {
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[5].files[0]);
    fReader.onload = (e) => {
        url = e.target.result;
        console.log(url);

    }
}

//Delete All
delALLBtn.onclick = async () => {
    let isConfirm = await confirm();
    if(isConfirm){
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();  //Live Delete
    }
}

//Confirmation
const confirm = () => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                resolve(true);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
                reject(false);
              swal("Your imaginary file is safe!");
            }
          });
    })
}

//Searching Data
searchEl.oninput = () => {
    search();
}

const search = () => {
    let value = searchEl.value.toLowerCase();
    let tr = regList.querySelectorAll("TR");
    //console.log(tr) //Number of rows (Users)
    let i;
    for(i = 0; i < tr.length; i++){
        let allTd = tr[i].querySelectorAll("TD");
        //console.log(allTd)  //index numbers of all table descriptions
        let name = allTd[2].innerHTML;
        let email = allTd[3].innerHTML;
        let mobile = allTd[4].innerHTML;
        //alert(name) //prints names of all users one by one as we click OK
        if(name.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display = "";
        }else if(email.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display = "";
        }
        else if(mobile.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
        
    }
}