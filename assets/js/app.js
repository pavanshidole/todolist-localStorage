const cl=console.log;

const todoForm=document.getElementById("todoForm");
const todoContainer=document.getElementById("todoContainer");
const todoitemControl=document.getElementById("todoitem");


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

const temptodo=(arr)=>{
    let result=`<ul class="list-group">`;

    result+=todoArr.map(todo=>{
        return `<li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
                    <span>${todo.todoitem}</span>
                    <span>
                        <i class="fa-solid fa-pen-to-square text-primary"></i>
                        <i class="fa-solid fa-trash text-danger"></i>
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
                        <i class="fa-solid fa-pen-to-square text-primary"></i>
                        <i class="fa-solid fa-trash text-danger"></i>
                    </span> 
    
    
    `

        todoContainer.querySelector("ul").append(list);
    }else{
        temptodo(todoArr);
    }

    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    ele.target.reset();

    cl(todoObj);
}




todoForm.addEventListener("submit", onTodoForm);