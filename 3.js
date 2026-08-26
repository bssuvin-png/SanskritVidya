/* =========================================
   SANSKRIT VIDYA JAVASCRIPT
========================================= */


/* =========================================
   ADMIN LOGIN
========================================= */

const ADMIN_EMAIL = "teacher@gmail.com";
const ADMIN_PASSWORD = "123456";


function adminLogin() {

    let email = document.getElementById("adminEmail").value;

    let password =
        document.getElementById("adminPassword").value;

    let message =
        document.getElementById("loginMessage");


    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        localStorage.setItem("adminLoggedIn", "yes");

        message.innerHTML =
            "Login successful!";

        showPage("admin");

        loadAdmin();

    } else {

        message.innerHTML =
            "❌ Gmail or password is incorrect.";

    }

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem("adminLoggedIn");

    showPage("home");

}


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(page) {

    let pages =
        document.querySelectorAll(".page");

    pages.forEach(function(p) {

        p.classList.add("hidden");

    });


    document
        .getElementById(page)
        .classList.remove("hidden");


    if (page === "mantras") {

        loadMantras();

    }


    if (page === "admin") {

        loadAdmin();

    }

}


/* =========================================
   DEFAULT MANTRAS
========================================= */

let mantras =
    JSON.parse(localStorage.getItem("mantras")) || [

    {
        name: "Ganapati Mantra",

        text:
`ॐ गं गणपतये नमः`,

        meaning:
        "A mantra traditionally associated with Lord Ganesha.",

        audio: ""
    },

    {
        name: "Gayatri Mantra",

        text:
`ॐ भूर्भुवः स्वः
तत्सवितुर्वरेण्यं
भर्गो देवस्य धीमहि
धियो यो नः प्रचोदयात्`,

        meaning:
        "A traditional Vedic prayer.",

        audio: ""
    }

];


/* =========================================
   SAVE MANTRAS
========================================= */

function saveMantras() {

    localStorage.setItem(
        "mantras",
        JSON.stringify(mantras)
    );

}


/* =========================================
   SHOW MANTRAS
========================================= */

function loadMantras() {

    let list =
        document.getElementById("mantraList");

    list.innerHTML = "";


    mantras.forEach(function(mantra, index) {

        let card =
            document.createElement("div");

        card.className = "mantra-card";


        card.innerHTML = `

            <h2>${mantra.name}</h2>

            <p>${mantra.text.substring(0, 100)}</p>

            <button
                class="main-btn"
                onclick="openMantra(${index})">
                Open Mantra
            </button>

        `;


        list.appendChild(card);

    });

}


/* =========================================
   OPEN MANTRA
========================================= */

function openMantra(index) {

    let mantra = mantras[index];


    let content =
        document.getElementById("detailsContent");


    let audioHTML = "";


    if (mantra.audio) {

        audioHTML = `

            <h3>🔊 Listen</h3>

            <audio controls>
                <source src="${mantra.audio}">
            </audio>

        `;

    }


    content.innerHTML = `

        <h1>${mantra.name}</h1>

        <div class="mantra-text">

            ${mantra.text}

        </div>

        <div class="notes">

            <h2>📝 Notes / Meaning</h2>

            <p>
                ${mantra.meaning}
            </p>

        </div>

        <br>

        ${audioHTML}

    `;


    showPage("mantraDetails");

}


/* =========================================
   SEARCH
========================================= */

function searchMantras() {

    let search =
        document
        .getElementById("searchMantra")
        .value
        .toLowerCase();


    let cards =
        document.querySelectorAll(".mantra-card");


    cards.forEach(function(card) {

        let text =
            card.innerText.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =========================================
   ADD MANTRA
========================================= */

function addMantra() {

    let name =
        document.getElementById("newMantraName").value;

    let text =
        document.getElementById("newMantraText").value;

    let meaning =
        document.getElementById("newMantraMeaning").value;


    if (
        name === "" ||
        text === ""
    ) {

        alert("Please enter mantra name and text.");

        return;

    }


    let audioFile =
        document.getElementById("mantraAudio").files[0];


    let audioURL = "";


    /*
       For the simple demo, the audio file is
       converted to a local browser URL.
    */

    if (audioFile) {

        audioURL =
            URL.createObjectURL(audioFile);

    }


    mantras.push({

        name: name,

        text: text,

        meaning: meaning,

        audio: audioURL

    });


    saveMantras();


    alert("Mantra added successfully!");


    document.getElementById("newMantraName").value = "";

    document.getElementById("newMantraText").value = "";

    document.getElementById("newMantraMeaning").value = "";

    document.getElementById("mantraAudio").value = "";


    loadAdmin();

}


/* =========================================
   DELETE MANTRA
========================================= */

function deleteMantra(index) {

    if (
        confirm("Delete this mantra?")
    ) {

        mantras.splice(index, 1);

        saveMantras();

        loadAdmin();

    }

}


/* =========================================
   ONLINE CLASSES
========================================= */

let classes =
    JSON.parse(localStorage.getItem("classes")) || [];


function saveClasses() {

    localStorage.setItem(
        "classes",
        JSON.stringify(classes)
    );

}


/* =========================================
   ADD CLASS
========================================= */

function addClass() {

    let title =
        document.getElementById("classTitle").value;

    let date =
        document.getElementById("classDate").value;

    let link =
        document.getElementById("classLink").value;


    if (
        title === "" ||
        date === "" ||
        link === ""
    ) {

        alert("Please fill all class details.");

        return;

    }


    classes.push({

        title: title,

        date: date,

        link: link

    });


    saveClasses();


    alert("Class added successfully!");


    document.getElementById("classTitle").value = "";

    document.getElementById("classDate").value = "";

    document.getElementById("classLink").value = "";


    loadAdmin();

}


/* =========================================
   ADMIN DASHBOARD
========================================= */

function loadAdmin() {

    let mantraList =
        document.getElementById("adminMantraList");


    mantraList.innerHTML = "";


    mantras.forEach(function(mantra, index) {

        mantraList.innerHTML += `

            <div class="admin-item">

                <b>${mantra.name}</b>

                <button
                    class="delete-btn"
                    onclick="deleteMantra(${index})">
                    Delete
                </button>

            </div>

        `;

    });


    let classList =
        document.getElementById("adminClassList");


    classList.innerHTML = "";


    classes.forEach(function(classItem, index) {

        classList.innerHTML += `

            <div class="admin-item">

                <b>${classItem.title}</b>

                <br>

                Date:
                ${classItem.date}

                <br>

                <a
                    href="${classItem.link}"
                    target="_blank">
                    Open Class
                </a>

                <br><br>

                <button
                    class="delete-btn"
                    onclick="deleteClass(${index})">
                    Delete
                </button>

            </div>

        `;

    });

}


/* =========================================
   DELETE CLASS
========================================= */

function deleteClass(index) {

    if (
        confirm("Delete this class?")
    ) {

        classes.splice(index, 1);

        saveClasses();

        loadAdmin();

    }

}


/* =========================================
   STUDENT LOGIN DEMO
========================================= */

function studentLogin() {

    let email =
        document.getElementById("studentEmail").value;

    let message =
        document.getElementById("studentMessage");


    if (email === "") {

        message.innerHTML =
            "Please enter your Gmail.";

        return;

    }


    message.innerHTML =
        "Login successful. You can join the available class.";

}


/* =========================================
   START WEBSITE
========================================= */

showPage("home");
