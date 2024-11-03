let specialtyTabs;
let chiave;
const createSpecialtyTabs = (parentElement,reparti) => {
  let activeIndex = 0; 
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
          const index = parseInt(button.getAttribute("data-index")); 
          this.setActive(index); 
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
        <button class="book-button" id="openModalButton">Prenota<i class="fa-solid fa-arrow-right"></i></button>
      `;
      document.getElementById("openModalButton").onclick = () => {
        form.render();
      };
    }
  };
};

GetData().then(()=>{
  let specialtyTabs = createSpecialtyTabs(document.getElementById("specialty-tabs"),config.tipologie);
  chiave = config.cacheToken
  const bookButton = createBookButton(document.getElementById("controls"));
  specialtyTabs.render();
  bookButton.render();
  }
)
