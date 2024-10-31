const createForm = (parentElement) => {
    let data;
    callback = null;

    return {
        setlabels: (labels) => {data = labels},
        submit: (callbackinput) => {callback = callbackinput},
        render: () => {
            parentElement.innerHTML = data.map((index) => {
                return `<div class="form-group">
                        ${index[0]}\n <input type="${index[1]}" id="${index[0]}" class="form-control"/>
                        </div>`;
            }).join("\n") + `<button type="button" class="btn btn-primary" id="submit">SUBMIT</button>`;
            document.getElementById("submit").onclick = () => {
                const result = {};
                console.log(data)
                data.forEach((index) => {
                    const campo = index[0];  
                    result[campo] = document.getElementById(campo).value;
                });
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