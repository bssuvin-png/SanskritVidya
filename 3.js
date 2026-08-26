// ==============================
// MANTRA DATA
// ==============================

const mantras = {

    ganapati: {
        title: "??? Ganapati Mantra",
        type: "Mantra",
        text: "? ?? ?????? ???",
        notes: "Your teacher can add the meaning and explanation here."
    },

    hanuman: {
        title: "?? Hanuman Chalisa",
        type: "Stotra",
        text: "Hanuman Chalisa",
        notes: "Your teacher can add the notes and explanation here."
    },

    vishnu: {
        title: "?? Vishnu Sahasranama",
        type: "Stotra",
        text: "Vishnu Sahasranama",
        notes: "Your teacher can add the notes and explanation here."
    },

    guru: {
        title: "?? Guru Sloka",
        type: "Sloka",
        text: "Guru Sloka",
        notes: "Your teacher can add the notes and explanation here."
    }

};


// ==============================
// SHOW MANTRA
// ==============================

function showMantra(name) {

    const mantra = mantras[name];

    const details = document.getElementById("mantra-details");

    const content = document.getElementById("mantra-content");

    content.innerHTML = `

        <h1>${mantra.title}</h1>

        <h2>?? Sanskrit</h2>

        <div class="sanskrit">
            ${mantra.text}
        </div>

        <h2>?? Notes & Meaning</h2>

        <p>
            ${mantra.notes}
        </p>

        <h2>?? Audio</h2>

        <p>
            Audio will be added by the teacher.
        </p>

    `;

    details.style.display = "block";

    details.scrollIntoView({
        behavior: "smooth"
    });
}


// ==============================
// CLOSE MANTRA
// ==============================

function closeMantra() {

    document.getElementById("mantra-details").style.display = "none";

}


// ==============================
// SEARCH
// ==============================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const searchText =
            search.value.toLowerCase();

        const cards =
            document.querySelectorAll(".mantra-card");

        cards.forEach(function (card) {

            const name =
                card.innerText.toLowerCase();

            if (name.includes(searchText)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// ==============================
// CATEGORY FILTER
// ==============================

function filterMantras(category) {

    const cards =
        document.querySelectorAll(".mantra-card");

    cards.forEach(function (card) {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// ==============================
// LOGIN WINDOW
// ==============================

function openLogin() {

    document.getElementById("login-box").style.display = "flex";

}


function closeLogin() {

    document.getElementById("login-box").style.display = "none";

}


// ==============================
// TEMPORARY LOGIN
// ==============================

function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("login-message");


    if (email === "" || password === "") {

        message.innerText =
            "Please enter Gmail and password.";

        return;

    }


    /*
       TEMPORARY TEST LOGIN

       This is NOT secure.
       We will replace this with
       real authentication later.
    */

    if (
        email === "teacher@gmail.com" &&
        password === "123456"
    ) {

        message.innerText =
            "Teacher login successful!";

    } else {

        message.innerText =
            "Gmail or password is incorrect.";

    }

}