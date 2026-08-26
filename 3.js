/* =====================================================
   SANSKRIT VIDYA JAVASCRIPT
===================================================== */


/* =====================================================
   TEACHER LOGIN
===================================================== */

const ADMIN_EMAIL = "teacher@gmail.com";

const ADMIN_PASSWORD = "123456";


function adminLogin() {

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    const message =
        document.getElementById("loginMessage");


    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        localStorage.setItem(
            "adminLoggedIn",
            "yes"
        );

        message.innerHTML =
            "✅ Login successful!";

        showPage("admin");

        loadAdmin();

    }

    else {

        message.innerHTML =
            "❌ Incorrect Gmail or password.";

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    showPage("home");

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.add("hidden");

    });


    const selected =
        document.getElementById(pageName);


    if (selected) {

        selected.classList.remove("hidden");

    }


    if (pageName === "mantras") {

        loadMantras();

    }


    if (pageName === "classes") {

        loadClasses();

    }


    if (pageName === "admin") {

        loadAdmin();

    }

}


/* =====================================================
   MANTRAS
===================================================== */

let mantras =
    JSON.parse(
        localStorage.getItem("mantras")
    ) || [

        {
            name: "Ganapati Mantra",

            text:
`ॐ गं गणपतये नमः`,

            meaning:
            "A traditional mantra associated with Lord Ganesha.",

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


/* =====================================================
   SAVE MANTRAS
===================================================== */

function saveMantras() {

    localStorage.setItem(
        "mantras",
        JSON.stringify(mantras)
    );

}


/* =====================================================
   LOAD MANTRAS
===================================================== */

function loadMantras() {

    const list =
        document.getElementById("mantraList");


    list.innerHTML = "";


    mantras.forEach(function(mantra, index) {

        const card =
            document.createElement("div");


        card.className =
            "mantra-card";


        card.innerHTML = `

            <h2>
                ${mantra.name}
            </h2>

            <p>
                ${mantra.text}
            </p>

            <button
                class="main-btn"
                onclick="openMantra(${index})">

                Read More

            </button>

        `;


        list.appendChild(card);

    });

}


/* =====================================================
   OPEN MANTRA
===================================================== */

function openMantra(index) {

    const mantra =
        mantras[index];


    const content =
        document.getElementById(
            "detailsContent"
        );


    let audio = "";


    if (mantra.audio) {

        audio = `

            <h3>🔊 Audio</h3>

            <audio controls>

                <source
                    src="${mantra.audio}"
                >

            </audio>

        `;

    }


    content.innerHTML = `

        <h1>
            ${mantra.name}
        </h1>

        <div class="mantra-text">

            ${mantra.text}

        </div>

        <div class="notes">

            <h2>
                📝 Meaning / Notes
            </h2>

            <p>
                ${mantra.meaning}
            </p>

        </div>

        ${audio}

    `;


    showPage("mantraDetails");

}


/* =====================================================
   SEARCH
===================================================== */

function searchMantras() {

    const value =
        document
        .getElementById("searchMantra")
        .value
        .toLowerCase();


    const cards =
        document.querySelectorAll(
            ".mantra-card"
        );


    cards.forEach(function(card) {

        const text =
            card.innerText.toLowerCase();


        if (
            text.includes(value)
        ) {

            card.style.display =
                "block";

        }

        else {

            card.style.display =
                "none";

        }

    });

}


/* =====================================================
   ADD MANTRA
===================================================== */

function addMantra() {

    const name =
        document.getElementById(
            "newMantraName"
        ).value.trim();


    const text =
        document.getElementById(
            "newMantraText"
        ).value.trim();


    const meaning =
        document.getElementById(
            "newMantraMeaning"
        ).value.trim();


    const audio =
        document.getElementById(
            "mantraAudio"
        ).value.trim();


    if (
        name === "" ||
        text === ""
    ) {

        alert(
            "Please enter the mantra name and text."
        );

        return;

    }


    mantras.push({

        name: name,

        text: text,

        meaning: meaning,

        audio: audio

    });


    saveMantras();


    document.getElementById(
        "newMantraName"
    ).value = "";


    document.getElementById(
        "newMantraText"
    ).value = "";


    document.getElementById(
        "newMantraMeaning"
    ).value = "";


    document.getElementById(
        "mantraAudio"
    ).value = "";


    alert(
        "✅ Mantra added!"
    );


    loadAdmin();

}


/* =====================================================
   DELETE MANTRA
===================================================== */

function deleteMantra(index) {

    if (
        confirm(
            "Delete this mantra?"
        )
    ) {

        mantras.splice(
            index,
            1
        );


        saveMantras();

        loadAdmin();

    }

}


/* =====================================================
   CLASSES
===================================================== */

let classes =
    JSON.parse(
        localStorage.getItem("classes")
    ) || [];


function saveClasses() {

    localStorage.setItem(
        "classes",
        JSON.stringify(classes)
    );

}


/* =====================================================
   ADD CLASS
===================================================== */

function addClass() {

    const title =
        document.getElementById(
            "classTitle"
        ).value.trim();


    const date =
        document.getElementById(
            "classDate"
        ).value.trim();


    const link =
        document.getElementById(
            "classLink"
        ).value.trim();


    if (
        title === "" ||
        date === "" ||
        link === ""
    ) {

        alert(
            "Please fill all class details."
        );

        return;

    }


    classes.push({

        title: title,

        date: date,

        link: link

    });


    saveClasses();


    document.getElementById(
        "classTitle"
    ).value = "";


    document.getElementById(
        "classDate"
    ).value = "";


    document.getElementById(
        "classLink"
    ).value = "";


    alert(
        "✅ Class added!"
    );


    loadAdmin();

}


/* =====================================================
   LOAD CLASSES
===================================================== */

function loadClasses() {

    const list =
        document.getElementById(
            "classList"
        );


    list.innerHTML = "";


    if (classes.length === 0) {

        list.innerHTML = `

            <div class="class-card">

                <h2>
                    No classes added yet.
                </h2>

                <p>
                    Teacher can add classes
                    from the dashboard.
                </p>

            </div>

        `;

        return;

    }


    classes.forEach(function(item) {

        list.innerHTML += `

            <div class="class-card">

                <h2>
                    ${item.title}
                </h2>

                <p>
                    📅 ${item.date}
                </p>

                <a
                    href="${item.link}"
                    target="_blank">

                    Join Class

                </a>

            </div>

        `;

    });

}


/* =====================================================
   DELETE CLASS
===================================================== */

function deleteClass(index) {

    if (
        confirm(
            "Delete this class?"
        )
    ) {

        classes.splice(
            index,
            1
        );


        saveClasses();

        loadAdmin();

    }

}


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function loadAdmin() {

    const mantraList =
        document.getElementById(
            "adminMantraList"
        );


    mantraList.innerHTML = "";


    mantras.forEach(
        function(mantra, index) {

            mantraList.innerHTML += `

                <div class="admin-item">

                    <b>
                        ${mantra.name}
                    </b>

                    <button
                        class="delete-btn"
                        onclick="deleteMantra(${index})">

                        Delete

                    </button>

                </div>

            `;

        }
    );


    const classList =
        document.getElementById(
            "adminClassList"
        );


    classList.innerHTML = "";


    classes.forEach(
        function(item, index) {

            classList.innerHTML += `

                <div class="admin-item">

                    <b>
                        ${item.title}
                    </b>

                    <br>

                    📅 ${item.date}

                    <br>

                    <a
                        href="${item.link}"
                        target="_blank">

                        Open Class

                    </a>

                    <button
                        class="delete-btn"
                        onclick="deleteClass(${index})">

                        Delete

                    </button>

                </div>

            `;

        }
    );

}


/* =====================================================
   START WEBSITE
===================================================== */

showPage("home");
