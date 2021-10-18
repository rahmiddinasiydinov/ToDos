//Bismillah
let elForm = document.querySelector('.header__form');
let elInput = elForm.querySelector('.form__input');
let elList =  document.querySelector('.todo__list')
let elSubmit = elForm.querySelector('.form__submit');
let elTemple = document.querySelector('#template').content;
let elTrush = document.querySelector('.header__trash');
let elChosen = document.querySelector('.header__done-box');
let count = 0;
let localArr = JSON.parse(window.localStorage.getItem('todos'))
let toDos = localArr || [];
renderList(toDos, elList)

///     FUNCTIONS
    function renderList (arr, parent){
        parent.innerHTML=null ;
    arr.forEach(element => {
        const cloneTempl = elTemple.cloneNode(true);
       let content = cloneTempl.querySelector('.todo__text')
       content.textContent = element.content;
        let deleteBtn = cloneTempl.querySelector('.todo__trash');
        deleteBtn.dataset.id = element.id;
        
        let checkbox = cloneTempl.querySelector('#check');
            checkbox.dataset.id = element.id;

        let completed = [];
        
        checkbox.addEventListener('click', (e =>{
            let currentId = e.target.dataset.id;
            let checkedItem = arr.find(el =>{
               return currentId == el.id;
            })

            checkedItem.isCompleted = !checkedItem.isCompleted;
            if(checkedItem.isCompleted){
                content.classList.add('completed');
                let chosen;
                chosen = arr.find((e)=>{
                   return currentId == e.id
                })
                completed.push(chosen);
                console.log(completed);
            }
            else{
                content.classList.remove('completed')
            }
            window.localStorage.setItem('todos', JSON.stringify(toDos));
            
        }))

        deleteBtn.addEventListener('click', (e)=>{
           let currentId = e.target.dataset.id;
           let deleteIndex = arr.findIndex(e=>{
               return e.id ==currentId;
           })  
           arr.splice(deleteIndex, 1);
             renderList(toDos, elList);
           window.localStorage.setItem('todos', JSON.stringify(toDos));
         

        })






        parent.appendChild(cloneTempl);
        
    });

}


elForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    count++;
    let submitValue = elInput.value;
    let newObj = {
        id:count,
        content: submitValue,
        isCompleted: false
    }
    toDos.push(newObj)

    window.localStorage.setItem('todos', JSON.stringify(toDos));
     renderList(toDos, elList);
    elInput.value= null;
})





