// UNIQUE USER ID
let userId = localStorage.getItem("userId");
if (!userId) {
    userId = "USER_" + Math.floor(Math.random()*100000);
    localStorage.setItem("userId", userId);
}

function saveData(){

let data = {
    userId: userId,
    date: document.getElementById("date").value,
    line: document.getElementById("line").value,
    department: document.getElementById("department").value,
    location: document.getElementById("location").value,
    activity: document.getElementById("activity").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value,
    person: document.getElementById("person").value,
    critical: document.getElementById("critical").value,
    supervisor: document.getElementById("supervisor").value,
    contact: document.getElementById("contact").value,
    permit: document.getElementById("permit").value,
    hira: document.getElementById("hira").value,
    status: document.getElementById("status").value
};

localStorage.setItem("lastData", JSON.stringify(data));

fetch("https://script.google.com/macros/s/AKfycbxRH7YcEGCFS9VpPBEPWj09XIRB2Rt14DQxpTN6RNukBgtt4bVmFmlVBjmgHOo8ou7-tw/exec", {
    method: "POST",
    body: JSON.stringify(data)
})
.then(res => res.text())
.then(() => alert("Saved in Excel ✅"));

}


// ✅ ONLY ONE downloadPDF FUNCTION
function downloadPDF(){

    let data = JSON.parse(localStorage.getItem("lastData"));

    if(!data){
        alert("पहले form submit करो");
        return;
    }

    let content = `
        <html>
        <head>
            <title>Daily Report</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h2 { text-align: center; }
                p { margin: 8px 0; }
            </style>
        </head>
        <body>

        <h2>Daily Job Report</h2>

        <p><b>Date:</b> ${data.date}</p>
        <p><b>Line:</b> ${data.line}</p>
        <p><b>Department:</b> ${data.department}</p>
        <p><b>Location:</b> ${data.location}</p>
        <p><b>Activity:</b> ${data.activity}</p>
        <p><b>Category:</b> ${data.category}</p>
        <p><b>Priority:</b> ${data.priority}</p>
        <p><b>Person:</b> ${data.person}</p>
        <p><b>Critical:</b> ${data.critical}</p>
        <p><b>Supervisor:</b> ${data.supervisor}</p>
        <p><b>Contact:</b> ${data.contact}</p>
        <p><b>Permit:</b> ${data.permit}</p>
        <p><b>HIRA:</b> ${data.hira}</p>
        <p><b>Status:</b> ${data.status}</p>

        </body>
        </html>
    `;

    let newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write(content);
    newWindow.document.close();

    newWindow.print(); // 🔥 MAGIC
}