
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

let table = createTable(document.querySelector("#table"), [" ", "LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ", "SABATO", "DOMENICA"]);
table = createTable(document.querySelector("#table"), ["8", "9", "10", "11", "12"]);