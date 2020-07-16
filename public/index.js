(function () {
    // //使用 WebSocket 的網址向 Server 開啟連結
    // let ws = new WebSocket('wss://chris-chat-room1.herokuapp.com/');

    // //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
    // ws.onopen = () => {
    //     console.log('open connection');
    // }

    // //關閉後執行的動作，指定一個 function 會在連結中斷後執行
    // ws.onclose = () => {
    //     console.log('close connection');
    // }

    function handleOnload() {
        const submitButton = document.getElementById('submit-button');
        const message = document.getElementById('message');

        const onLoadObject = {
            fire: function () {
                this.handleUserName();
                this.handleSubmitButton();
                this.handleReceiveMessage();
            },
            handleUserName: function () {
                const person = prompt('請輸入你的暱稱');
                const nameText = document.getElementById('name-text');

                if (person !== '') {
                    nameText.innerHTML = person;
                }
            },
            handleReceiveMessage: function () {
                //接收 Server 發送的訊息
                const messageList = document.getElementById('message-list');

                ws.onmessage = event => {
                    const userName = JSON.parse(event.data).name;
                    const userText = JSON.parse(event.data).text;
                    const node = document.createElement('P');
                    const textnode = document.createTextNode(`${userName}：${userText}`);

                    node.appendChild(textnode);
                    messageList.appendChild(node);
                }
            },
            handleSubmitButton: function () {
                //發送訊息
                const nameText = document.getElementById('name-text');

                submitButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    ws.send(JSON.stringify({
                        name: nameText.innerHTML,
                        text: message.value,
                    }));

                    message.value = '';
                });
            }
        }
        return onLoadObject;
    }

    const excute = handleOnload();

    excute.fire();
})();