let specialtyTabs;
const createSpecialtyTabs = (parentElement,reparti) => {
  let activeIndex = 2; 
  console.log(parentElement)
  console.log(reparti)
  return {
    build: () => {
      return reparti.map((item,index) => {
        let buttonClass = 'specialty-tab';
        if (index === activeIndex) {
          buttonClass += ' active';
        }
        return `<button class="${buttonClass}" data-index="${index}">
          ${item}
        </button>`;
      }).join('');
    },
    render: function() {
      parentElement.innerHTML = this.build();
      Array.from(parentElement.querySelectorAll("button")).forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.getAttribute("data-index")); // Ottieni l'indice dal pulsante
          this.setActive(index); // Chiama setActive con l'indice corretto
        });
      });
    },
    setActive: function(index) {
      activeIndex = index;
      this.render();
    }
  };
};
  
const createBookButton = (parentElement) => {
  return {
    render: () => {
      parentElement.innerHTML = `
        <button class="book-button">Prenota<i class="fa-solid fa-arrow-right"></i></button>
      `;
    }
  };
};

GetData().then(()=>{
  let specialtyTabs = createSpecialtyTabs(document.getElementById("specialty-tabs"),config.tipologie);
  const bookButton = createBookButton(document.getElementById("controls"));
  specialtyTabs.render();
  bookButton.render();
  specialtyTabs.setActive(4)
  }
)

