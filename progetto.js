
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
            let col = "";
            newrow.forEach((dato) => {
                let htmlRow = "<tr>" + dato.map(d => `<td>${d}</td>`).join('') + "</tr>" + "\n";
                let htmlCol = "<th>" + dato.map(d => `<td>${d}</td>`).join('') + "</th>" + "\n";
                Row += htmlRow;
                col += htmlCol;
            }) 
            parentElement.innerHTML = header + Row + "</tbody></table>";
        }
    }
}

let table = createTable(document.querySelector("#table"), [" ", "LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ", "SABATO", "DOMENICA"]);