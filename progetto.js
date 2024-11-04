const precedente = document.querySelector(".precedente");
const successivo = document.querySelector(".successiva")

precedente.onclick=()=>{
    console.log(giorno)
    giorno.setDate(giorno.getDate() - 7);
    console.log(giorno)
    table.creaheader(giorno)
    table.crea(5, hours);
    giorno.setDate(giorno.getDate() - 5);
}

successivo.onclick=()=>{
    giorno.setDate(giorno.getDate() + 7);
    table.creaheader(giorno)
    table.crea(5, hours);
    giorno.setDate(giorno.getDate() - 5);
}


const giorno_iniziale = () => {
    let oggi = new Date();
    let giorno_settimanale = oggi.getDay();

    if (giorno_settimanale === 6){
        oggi.setDate(oggi.getDate() + 2);
    } else if (giorno_settimanale === 0){
        oggi.setDate(oggi.getDate() + 1);
    }
    console.log(oggi)
    return oggi;
};

const createTable = (parentElement) => {
    let data = null;
    let header;
    let newrow = [];

    return {
        build:(dati) => {
            data = dati;
        },
        
        creaheader:(lunedi) => {
            header = "<table class='table' border='1'><thead>";
            header += "<th>ORE</th>";

            header += data.map(day => {
                const formato = day + " " + lunedi.toLocaleDateString("it-IT");
                lunedi.setDate(lunedi.getDate() + 1);
                return `<th>${formato}</th>`;
            }).join("");
            header += "</thead><tbody>";

            parentElement.innerHTML = header;
        },

        crea: (listadata, hours) => {
            newrow = listadata;
            let Row = "";
            for (let i=0;i<newrow;i++) {
                let htmlRow = "<tr><td>" + hours[i] + "</td>" + "<td></td>" + "<td></td>" + "<td></td>" + "<td></td>" + "<td></td>" + "</tr>" + "\n";
                Row += htmlRow;
            }
            parentElement.innerHTML = header + Row + "</tbody></table>";
        }
    }
}

let table = createTable(document.querySelector("#table"));
table.build( ["LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ"]);
let lunedi = giorno_iniziale()
let giorno = giorno_iniziale()
table.creaheader(lunedi);
let hours = ["8", "9", "10", "11", "12"];
table.crea(5, hours);