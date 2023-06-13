const socket= io('http://localhost:8000');

const form =document.getElementById('send-containter')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('03_Whatsapp Notification Tone.mp3');

// data ko append kare k container k through print kara raha.... either left side or right side
function append(message, position){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
};

//jaise hi  submit button ko click karenge waise hi ye event listener useme likha hua message ko baki sabhi ko broadcast karega
form.addEventListener('submit', (e)=>{//(e) k help se page reload nhi hoga
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);//esme se message broadcast hoga 
    messageInput.value = ''; //message bhejne ke bad input field blank hoga 
})
//page load hone se pahle user ka nam le ename m dal de raha h
const ename=prompt("Enter your name to join :");
//ye message bhej raha h server ko
socket.emit('new-user-joined',ename);

socket.on('user-joined',ename=>{
    append(`${ename} joined the chat`,'right');
});

socket.on('receive', data =>{
    append(`${data.ename}: ${data.message}`,'left');
});

socket.on('left', ename =>{
    append(`${ename} left the chat`,'left');
});