const createForm = (parentElement) => {
    let data;
    callback = null;

    parentElement.innerHTML = `
    <div class="modal" id="modal" style="display: none;">
            <div class="modal-content">
                <span class="close-button" id="closeButton">&times;</span>
                <div id="formContent"></div>
                <button type="button" class="btn btn-primary" id="submit">SUBMIT</button>
                <button type="button" class="btn btn-secondary" id="cancel">CANCEL</button>
            </div>
        </div>
    `;

    const closeModal = () => {
        document.getElementById("form").style.display = "none";
    };

    return {
        setlabels: (labels) => {data = labels},
        submit: (callbackinput) => {callback = callbackinput},
        render: () => {
            parentElement.innerHTML = data.map((index) => {
                if (index[1] === "dropdown") {
                    return `
                    <div class="form-group">
                            ${field[0]}
                            <select id="${field[0]}" class="form-control">
                                ${field[2].map(option => `<option value="${option}">${option}</option>`).join('')}
                            </select>
                        </div>`;
                }
                return `
                    <div class="form-group">
                        ${field[0]}
                        <input type="${field[1]}" id="${field[0]}" class="form-control"/>
                    </div>`;
                
            }).join("\n");

            document.getElementById("form").style.display = "block";

            document.getElementById("submit").onclick = () => {
                const result = {};
                console.log(data)
                data.forEach((index) => {
                    result[index[0]] = document.getElementById(index[0]).value;
                });
                if (callback) {
                    closeModal();
                };
                Booking(result);        
            }
            },
        };
    };

    const Booking = (result) => {
        let available=[...lista_dizionario_giorni]
        console.log(available)
        let controllo = false
        available.forEach((giorno)=>{
            if(giorno["Data"]==result.Data){
                for(chiave_dizionario in result){
                    if (chiave_dizionario!="Data"){
                        if((giorno[chiave_dizionario]-result[chiave_dizionario])<0){
                            controllo=true
                        }
                    }
                } 
            }
        })
        if(controllo){
            alert("Non ci sono abbastanza stanze disponibili per la sua prenotazione")
        }
        else{
            console.log("stai aggiornando")
            Aggiorna(result)
        }
        
    };
    

    const form = createForm(document.getElementById("form"));
    form.setlabels([["Data","date"], ["Singole","number"], ["Doppie","number"],["Triple","number"], ["Suite", "number"]]);
    form.submit = ((formData) => {
        console.log("Dati inviati:", formData);
    })
    form.render();