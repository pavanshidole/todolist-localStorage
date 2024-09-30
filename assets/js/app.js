const cl=console.log;

const todoForm=document.getElementById("todoForm");
const todoContainer=document.getElementById("todoContainer");
const todoitemControl=document.getElementById("todoitem");
const AddBtn=document.getElementById("AddBtn");
const updateBtn=document.getElementById("updateBtn");


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let todoArr=[
    // {
    //     todoitem:"javascript",
    //     todoId:"120",
    // }
]

const onEdit=(ele)=>{
    let editId=ele.closest("li").id;

    localStorage.setItem("editId", editId);

    let getObj=todoArr.find(todo=>todo.todoId===editId);

    todoitemControl.value=getObj.todoitem;
    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    ;
}

const onRemove=(ele)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let removeId=ele.closest("li").id;
            let getIndex=todoArr.findIndex(todo=>todo.todoId===removeId);
        
            todoArr.splice(getIndex,1);
            localStorage.setItem("todoArr", JSON.stringify(todoArr));
            ele.closest("li").remove();

            snackbar("this todoitem remove is successfully!", "success");
        }
      });
      
          
    
    
}

const snackbar=(title,icon)=>{
    swal.fire({
        title:title,
        icon:icon,
        timer:2000,
        confirmButtonColor:"#00ff00",
    })
}

const temptodo=(arr)=>{
    let result=`<ul class="list-group">`;

    result+=todoArr.map(todo=>{
        return `<li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
                    <span>${todo.todoitem}</span>
                    <span>
                        <i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i>
                        <i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                    </span>    
                `
    }).join("");

    result+=`</ul>`;

    todoContainer.innerHTML=result;
}

if(localStorage.getItem("todoArr")){
    todoArr=JSON.parse(localStorage.getItem("todoArr"));
}

if(todoArr.length > 0){
    temptodo(todoArr);
}

const onTodoForm=(ele)=>{
    ele.preventDefault();

    let todoObj={
        todoitem:todoitemControl.value,
        todoId:uuid(),
    }

    todoArr.push(todoObj);

    if(todoContainer.querySelector("ul")){
        let list=document.createElement("li");
        list.id=todoObj.todoId;
        list.className="list-group-item d-flex justify-content-between";
        list.innerHTML=`
                    <span>${todoObj.todoitem}</span>
                    <span>
                        <i class="fa-solid fa-pen-to-square text-primary" onclick="onEdit(this)"></i>
                        <i class="fa-solid fa-trash text-danger" onclick="onRemove(this)"></i>
                    </span> 
    
    
    `

        todoContainer.querySelector("ul").append(list);
    }else{
        temptodo(todoArr);
    }

    snackbar(`the  ${todoObj.todoitem} is added successFully!`, `success`);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    ele.target.reset();

    
}

const onUpdateBtn=()=>{

    let updateId=localStorage.getItem("editId");

    
    let updateObj={
        todoitem:todoitemControl.value,
        todoId:updateId,
    }

    let getIndex=todoArr.findIndex(todo=> todo.todoId===updateId);

    todoArr[getIndex]=updateObj
    

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    let list=document.getElementById(updateId).firstElementChild;

    list.innerHTML=`<span>${updateObj.todoitem}</span>`;

    

    AddBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    snackbar(`this todolist ${updateObj.todoitem} is successFully!`, `success`);

    todoForm.reset();
}



todoForm.addEventListener("submit", onTodoForm);
updateBtn.addEventListener("click", onUpdateBtn);