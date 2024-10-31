
const createTable = (parentElement, data) => {
    console.log(data);
    let header = "<table class='table' border='1'><thead>";
    header += data.map(t => `<th>${t}</th>`).join("");
    header += "</thead><tbody>";
    parentElement.innerHTML = header;
    let newrow = [];
    return {
        crea: (listadata) => {
            newrow=listadata
            console.log(newrow);
            let Row = "";
            newrow.forEach((dato) => {
                let htmlRow = "<tr>" + dato.map(d => `<td>${d}</td>`).join('') + "</tr>" + "\n";
                Row += htmlRow;
            }) 
            parentElement.innerHTML = header + Row + "</tbody></table>";
        }
    }
}

const generaData = (giorni,dati_get) => {
    const giorno = [];
    const date = new Date();
    console.log(dati_get)
    for (let i = 0; i < giorni; i++){
        let formato = date.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        formato = formato.replaceAll("/","-")
        let base_stanze = { ...defaultData };  
        let giornata = [];
        let dizionario = {};
        giornata.push(formato);
        dizionario["Data"] = formato;
        dati_get.forEach((prenotazione) => {
            if (prenotazione.Data === formato) {
                console.log("ciao");
                for (let chiave_dizionario in base_stanze) {
                    base_stanze[chiave_dizionario] -= prenotazione[chiave_dizionario];
                }
            }
        });
        for (let chiave_dizionario in base_stanze) {
            giornata.push(base_stanze[chiave_dizionario]);
            dizionario[chiave_dizionario] = base_stanze[chiave_dizionario];
        }
        giorno.push(giornata);
        lista_dizionario_giorni.push(dizionario);
        date.setDate(date.getDate() + 1);
    }
    return giorno;
}

const getDateKey = (date) => {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
};

const lista_dizionario_giorni=[]
const defaultData = { 
    "Singole": 10, 
    "Doppie": 5,
    "Triple": 4,
    "Suite" : 3
};
GET(chiave).then((result_get) => {
    let giorno = generaData(30,result_get)
    table.crea(giorno);
})
console.log(lista_dizionario_giorni)
let table = createTable(document.querySelector("#table"), ["LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ", "SABATO", "DOMENICA"]);