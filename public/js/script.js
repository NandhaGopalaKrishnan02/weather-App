console.log("client side working")



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messgae1 = document.querySelector('#message1')
const messgae2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (event)=>{
    

    event.preventDefault();
    messgae1.textContent = 'Loading...'
    messgae2.textContent = ''
    const location = search.value;
    fetch(`/weather?address=${location}`)
    .then(response => {
        response.json()
            .then(data=>{
                if(data.error) {
                    messgae1.textContent = data.error;
                } else {
                    messgae1.textContent = data.location;
                    messgae2.textContent = data.forecast;
                }
            })
    })
   
})
