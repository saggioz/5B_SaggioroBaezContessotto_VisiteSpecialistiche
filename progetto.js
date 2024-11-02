const createTable = (parentElement) => {
    let data = null;
    let header;
    let settimana = 0;
    const giorni = ["LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ"]
    let hours = ["8", "9", "10", "11", "12"];
    let newrow = [];

    const settimane = (spostamento) => {
        const inizio = new Date();
        inizio.setDate(inizio.getDate() + (spostamento * 7) - inizio.getDay() + 1);
        return giorni.map((giorno, i) => {
            const date = new Date(inizio);
            date.setDate(inizio.getDate() + 1);
            return `${day} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        });
    };

    const tableheader = () => {
        const week = getWeekDates(settimana);
        header = "<table class='table' border='1'><thead><tr><th>ORE</th>";
        header += week.map(date => `<th>${date}</th>`).join("");
        header += "</tr></thead><tbody>";
        parentElement.innerHTML = header;
    };

    const tablerow = () => {
        let rows = "";
        for (let hour of hours) {
            rows += `<tr><td>${hour}</td><td></td><td></td><td></td><td></td><td></td></tr>`;
        }
        parentElement.innerHTML = header + rows + "</tbody></table>";
    };

    return {
        init: () => {
            tableheader();
            tablerow();
        },
        nextWeek: () => {
            settimana++;
            tableheader();
            tablerow();
        },
        previousWeek: () => {
            settimana--;
            tableheader();
            tablerow();
        }
    };
};

let tablec = createTable(document.querySelector("#table"));
const table = createTable(tablec);
table.init();

document.querySelector(".successiva").addEventListener("click", () => table.nextWeek());
document.querySelector(".precedente").addEventListener("click", () => table.previousWeek());