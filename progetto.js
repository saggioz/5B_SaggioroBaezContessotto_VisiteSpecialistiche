
const createTable = (parentElement, data) => {
    console.log(data);
    let header = "<table class='table' border='1'><thead>";
    header += "<th>ORE</th>";
    header += data.map(t => `<th>${t}</th>`).join("");
    header += "</thead><tbody>";
    parentElement.innerHTML = header;
    let newrow = [];
    return {
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

let table = createTable(document.querySelector("#table"), ["LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ"]);
let hours = ["8", "9", "10", "11", "12"];
table.crea(5, hours);