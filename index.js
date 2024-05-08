import axios from "axios";

document.addEventListener('submit', (e) => {
    e.preventDefault()
    getAnswer()
})

async function chatbotGetAnswer(question) {
    const data = { prompt: question };
    const url = "http://cnms-ai-service.net.uztec.com.br/get-answer";
    return await axios.post(url, data);
}



async function getAnswer() {
    const userInput = document.getElementById('user-input')
    const chatbotConversation = document.getElementById('chatbot-conversation-container')
    const question = userInput.value
    userInput.value = ''

    // loader
    chatbotConversation.textContent = "";
    var loader = document.createElement('div')
    loader.classList.add('loader')
    chatbotConversation.appendChild(loader)

    var result = await chatbotGetAnswer(question);

    chatbotConversation.textContent = "";
    var textElement = document.createElement('p')
    chatbotConversation.appendChild(textElement);
    textElement.textContent = result.data.answer;

    var rAnt = null;
    result.data.references.forEach(r => {

        if (!rAnt || rAnt.source != r.source || rAnt.page != r.page) {
            var referenceElement = document.createElement('p');
            chatbotConversation.appendChild(referenceElement);
            referenceElement.textContent = `Referência: ${r.source} - Pag.: ${r.page}`;
        }
        rAnt = r;
    })

}