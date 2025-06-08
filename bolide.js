const bolideBaseUrl = 'https://bolide.digicre.net/api/v1/comment/';
const bolideFrontBaseUrl = 'https://bolide.digicre.net/?roomname=';
const roomIdElement = document.getElementById('room-id');
const bolideFrameElement = document.getElementById('bolide-frame');

let isConnected = false;
let bolideUrl = '';

function connectToBolide() {
    let roomId = roomIdElement.value.trim();
    if (!roomId) {
        roomId = 'testroom';
    }
    roomIdElement.disabled = true; // Disable the input field to prevent changes during connection
    roomIdElement.value = roomId; // Update the input field with the trimmed value

    isConnected = true;
    bolideUrl = bolideBaseUrl + roomId;

    const bolideFrame = document.createElement('iframe');
    bolideFrame.src = bolideFrontBaseUrl + roomId;

    bolideFrameElement.appendChild(bolideFrame);
}

function disconnectFromBolide() {
    isConnected = false;
    bolideUrl = '';
    roomIdElement.disabled = false; // Re-enable the input field

    bolideFrameElement.innerHTML = ''; // Clear the iframe
}

async function sendComment(text) {
    let data = {
        'comment': text,
        'is_question': false,
    }

    await fetch(bolideUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}
