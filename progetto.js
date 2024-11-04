const precedente = document.querySelector(".precedente");
const successivo = document.querySelector(".successiva")

precedente.onclick=()=>{
    let giorno = giorno_iniziale()
    giorno.setDate(giorno.getDate() - 7);
    table.creaheader(giorno)
}

successivo.onclick=()=>{
    let giorno = giorno_iniziale()
    giorno.setDate(giorno.getDate() + 7);
    table.creaheader(giorno)
}


const giorno_iniziale = () => {
    let oggi = new Date();
    let giorno_settimanale = oggi.getDay();

    if (giorno_settimanale === 6){
        oggi.setDate(oggi.getDate() + 2);
    } else if (giorno_settimanale === 0){
        oggi.setDate(oggi.getDate() + 1);
    }
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
        
        creaheader:(giorno) => {
            header = "<table class='table' border='1'><thead>";
            header += "<th>ORE</th>";

            header += data.map(day => {
                const formato = day + " " + giorno.toLocaleDateString("it-IT");
                giorno.setDate(giorno.getDate() + 1);
                return `<th>${formato}</th>`;
            }).join("");
            header += "</thead><tbody>";

            parentElement.innerHTML = header;
        },

        crea: (listadata, hours) => {
            newrow = listadata;
            console.log(newrow);
            let Row = "";
            for (let i=0;i<newrow;i++) {
                let htmlRow = "<tr><td>" + hours[i] + "</td>" + "<td></td>" + "<td></td>" + "<td></td>" + "<td></td>" + "<td></td>" + "</tr>" + "\n";
                Row += htmlRow;
                console.log("ciao",Row) 
            }
            parentElement.innerHTML = header + Row + "</tbody></table>";
        }
    }
}

let table = createTable(document.querySelector("#table"));
table.build( ["LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ"]);
let giorno = giorno_iniziale()
table.creaheader(giorno);
let hours = ["8", "9", "10", "11", "12"];
table.crea(5, hours);