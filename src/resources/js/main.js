var id = 0;

function addToList(e){
    e.preventDefault();
   
    var taskText = document.getElementById("taskToAdd").value,
        taskCountdown = document.getElementById("taskToAddCountdown").value;

    if (taskText === "" || taskCountdown === ""){
        alert("Cannot be empty");
    }
    else{
        var todoList = document.getElementById("todoList");

        // Create li element
        var taskToAdd = document.createElement("li");
        taskToAdd.appendChild(document.createTextNode(taskText));
        taskToAdd.className = "list-group-item mb-1";
        
        // Add countdown
        var countDown = document.createElement("span");
        countDown.className = "float-right";
        countDown.id = "timer" + id;
        //countDown.appendChild(document.createTextNode(taskCountdown + ":00"));
        taskToAdd.appendChild(countDown);

        // Add to the list
        taskToAdd.id = "todo" + id;
        todoList.appendChild(taskToAdd);  

        // Start countdown
        startTimer(countDown, taskCountdown);

        document.getElementById("taskToAdd").value = "";
        taskCountdown = document.getElementById("taskToAddCountdown").value = "";
        id++;
    }
}

function deleteTodo(e) {
    if(e.target && e.target.nodeName === "LI") {
        //console.log(e.target.id);

        // 100% to completly hide li
        e.target.style.left = "100%";

        // Wait for transition to be done 
        setTimeout( function () {
            todoToDelete = document.getElementById(e.target.id);
            todoToDelete.parentNode.removeChild(todoToDelete);
        }, 1000);
	}
}

function rednerTime(timer) 
{
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

function startTimer(element, duration) 
{
    var timer = duration * 60;

    element.textContent = rednerTime(timer);
    timer--;

    var todoCountdown = setInterval(function () 
        {
            if (timer === 0){
                clearInterval(todoCountdown);
            }

            element.className = timer < 60 ? "float-right text-danger" : "float-right";
            element.textContent = rednerTime(timer);
            timer--;
        },
        1000
    );
}


document.getElementById("addButton").addEventListener("click", addToList);
document.getElementById("todoList").addEventListener("click", deleteTodo);