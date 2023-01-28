function makeSave(data) {
	if (localStorage.getItem("tmsave") !== null) {
		localStorage.removeItem("tmsave");
	}
	localStorage.setItem("tmsave", JSON.stringify(data));
}

function pullSave() {
	return JSON.parse(localStorage.getItem("tmsave"));
}

function sendNotification() {
	console.log(Notification.permission);
	if (Notification.permission === "granted") {
		//alert("we have permission");
		new Notification("TaskMaster", {
			body: "Make sure to stay focused!",
		});
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then((permission) => {
			console.log(permission);
			new Notification("TaskMaster", {
				body: "Make sure to stay focused!",
			});
		});
	}

	setTimeout(function () {
		sendNotification();
	}, 600000);
}
sendNotification();

var tasks = [];

var currentTask = {
	id: 0,
	title: "",
	description: "",
	dueDate: "",
	priority: 1,
};

function addTask(title, description, dueDate, priority) {
	currentTask.title = title; // text title
	currentTask.description = description; // text description
	currentTask.dueDate = dueDate; // int unix millis
	currentTask.priority = priority; // int

	// set currentTask.id to the current unix timestamp
	currentTask.id = Date.now();

	// push the currentTask to the tasks array
	tasks.push(currentTask);
	console.log(tasks);

	makeSave(tasks);
}

function deleteRow(id) {
	var btr = document.getElementById(id);
	btn.remove;
	btr.parentElement.removeEventListener("click", (event) => {
		deleteRow(tasksadd[k][2]);
	});
}

function getTask(id) {
	// get the task with the given id from the tasks array
	for (i in tasks) {
		if (tasks[i].id == id) {
			return tasks[i];
		}
	}
	return null;
}

function add_tasks_to_table() {
	var tasksadd = [[], [], [], [], [], [], []];
	var tasks_tr = document.getElementById("tasks_table");
	var dt = new Date();
	function get_week_num(curr_dt) {
		var start_date = new Date(dt.getFullYear(), 0, 1);
		var days = Math.floor((dt - start_date) / 86400000);
		var week_num = Math.ceil(days / 7);
		return week_num;
	}

	function convert_array(task_arr) {
		var converted = "";
		converted = converted + "<tr>";
		for (k in tasksadd) {
			if (tasksadd[k][0] != undefined) {
				converted =
					converted +
					"<th><button id=" +
					tasksadd[k][2] +
					" title='" +
					tasksadd[k][1] +
					" (priority " +
					tasksadd[k][3] +
					")'>" +
					tasksadd[k][0] +
					"</button></th>";
				document
					.getElementById("add_task")
					.addEventListener("click", (event) => {
						deleteRow(tasksadd[k][2]);
					});
			} else {
				converted = converted + "<th></th>";
			}
		}
		converted = converted + "</tr>";
		return converted;
	}

	for (i in tasks) {
		var dyear =
			tasks[i].dueDate.charAt(4) +
			tasks[i].dueDate.charAt(5) +
			tasks[i].dueDate.charAt(6) +
			tasks[i].dueDate.charAt(7);
		var dday = tasks[i].dueDate.charAt(2) + tasks[i].dueDate.charAt(3);
		var dmonth = tasks[i].dueDate.charAt(0) + tasks[i].dueDate.charAt(1);
		if (parseInt(dyear) == dt.getFullYear()) {
			var taskdate = new Date(dyear, dmonth, dday);
			console.log("same year");
			if (get_week_num(dt) == get_week_num(taskdate)) {
				console.log("same week");
				var dayofweeknum = taskdate.getDay() + 4;
				tasksadd[dayofweeknum] = [
					tasks[i].title,
					tasks[i].description,
					tasks[i].id,
					tasks[i].priority,
				];
			}
		}
	}
	console.log(tasksadd);
	console.log(tasksadd[dayofweeknum]);
	//if (tasksadd == []) {
	tasks_tr.innerHTML = tasks_tr.innerHTML + convert_array(tasksadd);
	//}
}

function add_task() {
	if (confirm("Are you sure you want to add a task?")) {
		var pri = 0;
		pri = parseInt(document.getElementById("taskpri").value);
		if (pri < 0 || pri > 10) {
			alert("Invalid priority value! Defaulting to 1");
			pri = 1;
		}
		var titl = document.getElementById("tasktitle").value;
		var desc = document.getElementById("taskdesc").value;

		var duedate = document.getElementById("taskdate").value;
		if (duedate.length != 8) {
			alert("Invalid due date! Aborting creation.");
			return;
		}
		duedate = duedate.padStart(8, "0");
		addTask(titl, desc, duedate, pri);
		add_tasks_to_table();
		return;
	} else {
		return;
	}
}
function setup_btns() {
	document.getElementById("add_task").addEventListener("click", (event) => {
		add_task();
	});
}
window.onload = function () {
	setup_btns();
};
