
const createTable = (parentElement, data) => {
    console.log(data);
    let header = "<table class='table' border='1'><thead>";
    header += "<th>Ore</th>";
    header += data.map(t => `<th>${t}</th>`).join("");
    header += "</thead><tbody>";
    parentElement.innerHTML = header;
    let newrow = [];
    return {
        crea: (listadata, hours) => {
            newrow=listadata
            console.log(newrow);
            let Row = "";
            newrow.forEach((dato, index) => {
                let htmlRow = "<tr><td>" + hours[index] + "</td>" + dato.map(d => `<td>${d}</td>`).join('') + "</tr>" + "\n";
                Row += htmlRow;
            }) 
            parentElement.innerHTML = header + Row + "</tbody></table>";
        }
    }
}

const headers = [" ", "LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ"];
const hours = ["8", "9", "10", "11", "12"];

let tableContainer = document.querySelector("#table");
let table = createTable(headers, hours);
