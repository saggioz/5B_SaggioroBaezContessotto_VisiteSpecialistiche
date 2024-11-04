let lista = [];

const createForm = () => {
    let data;
    callback = null;

    const modal = document.getElementById("modal");
    modal.style.display = "none";

    const closeModal = () => {
        modal.style.display = "none";    
    };

    const openModal = () => {
        modal.style.display = "block";    
    };

    const renderModalContent = () => {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" id="closeButton"></span>
                <div id="formContent"></div>
                <div id ="Message"></div>
                <button type="button" class="btn btn-primary" id="submit">PRENOTA</button>
                <button type="button" class="btn btn-secondary" id="cancel">ANNULLA</button>
            </div>
        `;

        document.getElementById("Message").onclick = closeModal;
        document.getElementById("closeButton").onclick = closeModal;
        document.getElementById("cancel").onclick = closeModal;

        const submitButton = document.getElementById("submit");
        submitButton.onclick = () => {
            const result = {};
            data.forEach((index) => {
                result[index[0]] = document.getElementById(index[0]).value;
            });
            let nom_rep = document.querySelector(".active").textContent.trim()
            console.log(nom_rep)
            result["Reparto"] = nom_rep
            console.log(result)
            let chiave_d = `${result["Reparto"]}-${result["Data"]}-${result["Orario Prenotazione"]}`
            Aggiorna(chiave_d,result["Nominativo"])
            document.getElementById("Message").innerText="Prenotazione eseguita con successo"
            lista.push(result);
            console.log("Lista:", lista);
            
            if (callback) {
                console.log(result)
                callback(result);
            }
        };
    };

    return {
        setlabels: (labels) => { data = labels; },
        submit: (callbackinput) => { callback = callbackinput; },
        render: () => {
            renderModalContent();
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
        alert("Errore")
    }
    else{
        console.log("stai aggiornando")
        Aggiorna(result)
    }
    
};


const form = createForm(document.getElementById("form"));
form.setlabels([["Data", "date"],
    ["Orario Prenotazione", "dropdown", ["08:00", "09:00", "10:00", "11:00", "12:00"]],
    ["Nominativo", "text"],
]);
form.submit = ((formData) => {
    document.getElementById("Message").onclick = openModal();
    console.log("Dati inviati:", formData);
    Booking(formData);
})
console.log(document.querySelectorAll("#openModalButton"))
