const createForm = (parentElement) => {
    let data;
    callback = null;

    parentElement.innerHTML += `
    <div class="modal" id="modal" style="display: none;">
            <div class="modal-content">
                <span class="close-button" id="closeButton">;</span>
                <div id="formContent"></div>
                <button type="button" class="btn btn-primary" id="submit">PRENOTA</button>
                <button type="button" class="btn btn-secondary" id="cancel">ANNULLA</button>
            </div>
        </div>
    `;

    const closeModal = () => {
        document.getElementById("modal").style.display = "none";
    };

    const openModal = () => {
        document.getElementById("modal").style.display = "block";
    };

    document.getElementById("closeButton").onclick = closeModal;
    document.getElementById("cancel").onclick = closeModal;


    return {
        setlabels: (labels) => {data = labels},
        submit: (callbackinput) => {callback = callbackinput},
        render: () => {
            const formContent = document.getElementById("formContent");
            formContent.innerHTML = data.map((index) => {
                if (index[1] === "dropdown") {
                    return `
                    <div class="form-group">
                            ${index[0]}
                            <select id="${index[0]}" class="form-control">
                                ${index[2].map(option => `<option value="${option}">${option}</option>`).join('')}
                            </select>
                        </div>`;
                }
                return `
                    <div class="form-group">
                        ${index[0]}
                        <input type="${index[1]}" id="${index[0]}" class="form-control"/>
                    </div>`;
                
            }).join("\n");

            openModal();

            document.getElementById("submit").onclick = () => {
                const result = {};
                console.log(data)
                data.forEach((index) => {
                    result[index[0]] = document.getElementById(index[0]).value;
                });
                closeModal();
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
    form.setlabels([["Data", "date"],
        ["Orario Prenotazione", "dropdown", ["09:00", "12:00", "15:00", "18:00"]],
        ["Nome", "text"],
        ["Singole", "number"],
        ["Doppie", "number"],
        ["Triple", "number"],
        ["Suite", "number"]
    ]);
    form.submit = ((formData) => {
        console.log("Dati inviati:", formData);
        Booking(formData);
    })
    form.render();