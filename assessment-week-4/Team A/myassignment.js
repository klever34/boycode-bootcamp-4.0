const readline = require("readline");

// Simple in-memory CLI to-do list
// Save as myassignment.js and run with: node myassignment.js

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "todo> ",
});

const tasks = [];

function addTask(text) {
    if (!text) return console.log("Usage: add <task description>");
    tasks.push({ text: text.trim(), done: false });
    console.log(`Added: "${text.trim()}"`);
}

function listTasks() {
    if (tasks.length === 0) {
        console.log("No tasks yet.");
        return;
    }
    tasks.forEach((t, i) => {
        console.log(`${i + 1}. [${t.done ? "x" : " "}] ${t.text}`);
    });
}

function removeTask(indexStr) {
    const i = parseInt(indexStr, 10) - 1;
    if (Number.isNaN(i) || i < 0 || i >= tasks.length) {
        return console.log("Usage: remove <task number>");
    }
    const removed = tasks.splice(i, 1)[0];
    console.log(`Removed: "${removed.text}"`);
}

function toggleDone(indexStr) {
    const i = parseInt(indexStr, 10) - 1;
    if (Number.isNaN(i) || i < 0 || i >= tasks.length) {
        return console.log("Usage: done <task number>");
    }
    tasks[i].done = !tasks[i].done;
    console.log(
        `${tasks[i].done ? "Completed" : "Marked incomplete"}: "${tasks[i].text}"`
    );
}

function help() {
    console.log(`Commands:
    add <text>      - add a new task
    list            - list all tasks
    remove <number> - remove a task
    done <number>   - toggle task complete
    clear           - clear all tasks
    help            - show this help
    exit            - quit
    `);
}

rl.prompt();

rl.on("line", (line) => {
    const [cmd, ...rest] = line.trim().split(" ");
    const arg = rest.join(" ");
    switch ((cmd || "").toLowerCase()) {
        case "add":
            addTask(arg);
            break;
        case "list":
            listTasks();
            break;
        case "remove":
            removeTask(arg);
            break;
        case "done":
            toggleDone(arg);
            break;
        case "clear":
            tasks.length = 0;
            console.log("All tasks cleared.");
            break;
        case "help":
            help();
            break;
        case "exit":
            rl.close();
            return;
        case "":
            break;
        default:
            console.log(`Unknown command: ${cmd}. Type "help" for commands.`);
    }
    rl.prompt();
}).on("close", () => {
    console.log("Goodbye.");
    process.exit(0);
});