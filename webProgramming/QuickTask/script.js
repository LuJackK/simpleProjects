/*Variable initializations*/
var addGroup = document.getElementById("addGroup");
var addTask = document.getElementById("addTask");//buttons
var groupName = document.getElementById("NewGroup");
var taskName = document.getElementById("NewTask");//input values
var pile = document.getElementById("cTasks");
var deck = document.getElementById("cGroups");//containers

let numOfTasks = 0;

/*create new task */ 


addTask.addEventListener("click", function() {
    var name = taskName.value;

    taskName.value = "";// resetting textbox

    var newTask = createTask(name);

    pile.appendChild(newTask);

    var finalTop = Math.floor(Math.random() * 74);

    var fallInterval = setInterval(function() {
        taskFall(newTask, finalTop);
    }, 20);
});

function createTask(name){
    var newTask = document.createElement("div");
    newTask.draggable = 'True';
    newTask.classList.add("task");//initialize task element

    var top = 0;//this will be changed in the taskFall animation function
    var right = Math.floor(Math.random()*74);
    newTask.style.top = top + "%";
    newTask.style.right = right + "%";//// random x cordinates for task cell
    

    newTask.id = numOfTasks;
    numOfTasks++;// asign unique id starting from 0

    newTask.addEventListener('dragstart', function(event){dragTask(newTask.id, event);});
    var done = document.createElement('button');
    done.classList.add('done');
    done.addEventListener('click',function(){taskDone(newTask.id)});
    var trash = document.createElement('button');
    trash.classList.add('trash');
    trash.addEventListener('click', function(){taskDelete(newTask.id)});
    var text = document.createElement('p');
    text.innerHTML=name;
    newTask.appendChild(done);
    newTask.appendChild(text);
    newTask.appendChild(trash);// create and add  inner elements

    return(newTask);
}

function taskFall(task, finalTop){
    var currentTop = parseFloat(task.style.top) // Ensure currentTop is a number
    if(currentTop >= finalTop){
        clearInterval(fallInterval);
    }
    else{
        task.style.top = (currentTop + 1) + "%";
    }
}

/*buttons inside the task cell*/
function taskDone(taskId){
    var doneTask = document.getElementById(taskId);

    doneTask.remove();
}
function taskDelete(taskId){
    var doneTask = document.getElementById(taskId);

    doneTask.remove();
}

/* create new group */
addGroup.addEventListener("click", function() {
    var name = groupName.value;
    groupName.value = '';
    var group = createGroup(name);
    deck.appendChild(group);
})
function createGroup(name){
    let group = document.createElement('div');
    group.classList.add('group');
    group.id = name;//initialize group element

    var head = document.createElement("h1");
    head.innerHTML = name;
    head.classList.add('groupName');
    group.appendChild(head);//add group heading

    group.addEventListener('dragover', function(event){
        event.preventDefault();
    })
    group.addEventListener('drop', function(event){
        drop(event, group.id);
    })//add drag and drop event calls 

    return(group);
}

/*drag and drop functions*/
function dragTask (taskId, event) {
    var draggedTask = document.getElementById(taskId);
    event.dataTransfer.setData('id', taskId);
    // parse id to drop function through the events dataTransfer method
}

function drop(event, groupId){
    let taskId = event.dataTransfer.getData('id');
    let targetGroup = document.getElementById(groupId);
    let draggedTask = document.getElementById(taskId);//get elements

    draggedTask.style.position = 'relative';
    draggedTask.style.width = '90%';
    draggedTask.style.top = '';
    draggedTask.style.right = '';
    draggedTask.style.margin = 'auto';//set format styling

    targetGroup.appendChild(draggedTask);//add task to target group
}