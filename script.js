document.addEventListener('DOMContentLoaded', function () {
    const numPlayersInput = document.getElementById('numPlayers');
    const playerNamesDiv = document.getElementById('playerNames');
    const startGameBtn = document.getElementById('startGame');
    const clearPlayersBtn = document.getElementById('clearPlayers');
    const gameScreen = document.getElementById('game-screen');
    const playerSetupScreen = document.getElementById('player-setup');
    const currentPlayerHeading = document.getElementById('currentPlayer');
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.querySelector('.options');
    const resultDiv = document.getElementById('result');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const restartGameBtn = document.getElementById('restartGame');
    const Rodadas = document.getElementById('Rodadas');

    const questions = [
        { question: "Qual é o primeiro livro do Pentateuco?", answers: ["Deuteronômio", "Êxodo", "Gênesis", "Números"], correct: "Gênesis" },
        { question: "Quem foi o autor tradicionalmente aceito do Pentateuco?", answers: ["Moisés", "Josué", "Isaías" , "Abraão"], correct: "Moisés" },
        { question: "Em qual livro do Pentateuco encontramos as Dez Pragas do Egito?", answers: ["Levítico", "Números", "Deuteronômio", "Êxodo"], correct: "Êxodo" },
        { question: "Qual dos seguintes livros contém as leis sobre sacrifícios e pureza?", answers: ["Gênesis", "Levítico", "Números", "Deuteronômio"], correct: "Levítico" },
        { question: "Em qual livro é narrada a história da serpente no Jardim do Éden?", answers: ["Gênesis", "Números", "Êxodo", "Levítico"], correct: "Gênesis" },
        { question: "Qual é o tema central do livro de Deuteronômio?", answers: ["Criação do mundo", "Lei e renovação da aliança", "Histórias dos patriarcas", "Peregrinação no deserto"], correct: "Lei e renovação da aliança" },
        { question: "Qual tribo de Israel foi designada para ser sacerdotal no Pentateuco?", answers: ["Judá", "Benjamim", "Levi", "Efraim"], correct: "Levi" },
        { question: "Quem foi o líder que guiou os israelitas na saída do Egito?", answers: ["José", "Arão", "Moisés", "Josué"], correct: "Moisés" },
        { question: "Em qual livro do Pentateuco se encontra o Shemá ('Ouve, Israel')?", answers: ["Levítico", "Gênesis", "Deuteronômio", "Êxodo"], correct: "Deuteronômio" },
        { question: "Quantos anos os israelitas vagaram pelo deserto, segundo o Pentateuco?", answers: ["20 anos", "30 anos", "40 anos", "50 anos"], correct: "40 anos" },
        { question: "Qual é o maior profeta que escreveu o livro com o maior número de capítulos na Bíblia?", answers: ["Jeremias", "Ezequiel", "Isaías", "Daniel"], correct: "Isaías" },
        { question: "Qual profeta teve a visão do vale de ossos secos?", answers: ["Amós", "Jeremias", "Ezequiel", "Joel"], correct: "Ezequiel" },
    ];

    let players = [];
    let playerScores = {};
    let currentQuestionIndex = 0;
    let currentRound = 0;
    let rod = 1;  // Iniciar na primeira rodada

    // Função para embaralhar perguntas
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Função para adicionar campos de entrada de nomes
    document.getElementById('addPlayers').addEventListener('click', function () {
        playerNamesDiv.innerHTML = '';
        const numPlayers = parseInt(numPlayersInput.value, 10);
        console.log(numPlayers)
        
        if(numPlayers >= 2 && numPlayers <= 20){
            for (let i = 0; i < numPlayers; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Nome do jogador ${i + 1}`;
                input.className = 'player-name';
                playerNamesDiv.appendChild(input);
            }

            startGameBtn.disabled = numPlayers === 0;
        }
        else{
            alert(`Insira uma quantidade entre 2 e 20 jogadores!`);
        }
    });

    // Função para iniciar o jogo
    startGameBtn.addEventListener('click', function () {
        const playerInputs = document.querySelectorAll('.player-name');
        players = Array.from(playerInputs).map(input => input.value.trim());
        
        players.forEach(player => {
            playerScores[player] = 0;
        });

        shuffleArray(questions); // Embaralha as perguntas antes de iniciar o jogo

        localStorage.setItem('players', JSON.stringify(players));
        startGame();
    });

    // Função para limpar os jogadores
    clearPlayersBtn.addEventListener('click', function () {
        localStorage.removeItem('players');
        playerNamesDiv.innerHTML = '';
        startGameBtn.disabled = true;
    });

    // Função para iniciar o jogo
    function startGame() {
        playerSetupScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        loadNextQuestion();
    }

    // Função para carregar a próxima pergunta
    function loadNextQuestion() {
        Rodadas.innerHTML = `Rodada: ${rod}`;
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }
        
        const currentPlayer = players[currentRound % players.length];
        currentPlayerHeading.innerText = `É a vez de: ${currentPlayer}`;
        
        const currentQuestion = questions[currentQuestionIndex];
        questionDiv.innerText = currentQuestion.question;
        optionsDiv.innerHTML = '';

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.innerText = answer;
            button.addEventListener('click', () => handleAnswer(answer, currentPlayer));
            optionsDiv.appendChild(button);
        });
    }

    // Função para lidar com a resposta
    function handleAnswer(selectedAnswer, currentPlayer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correct) {
            playerScores[currentPlayer] += 5;
            resultDiv.innerText = "Correto!";
        } else {
            resultDiv.innerText = "Errado!";
        }

        currentQuestionIndex++;
        currentRound++;

        if (currentRound % players.length === 0) {
            rod++;  // Incrementa a rodada após todos os jogadores responderem
        }

        nextQuestionBtn.style.display = 'block';
    }

    // Função para avançar para a próxima pergunta
    nextQuestionBtn.addEventListener('click', function () {
        resultDiv.innerText = '';
        nextQuestionBtn.style.display = 'none';
        loadNextQuestion();
    });

    // Função para finalizar o jogo
    function endGame() {
        const winner = Object.keys(playerScores).reduce((a, b) => playerScores[a] > playerScores[b] ? a : b);
        alert(`Fim do jogo! O vencedor é ${winner} com ${playerScores[winner]} pontos!`);
    }

    // Função para reiniciar o jogo
    restartGameBtn.addEventListener('click', function () {
        currentQuestionIndex = 0;
        rod = 1;  // Reinicia a rodada
        Rodadas.innerHTML = `Rodada: ${rod}`;
        currentRound = 0;
        playerScores = {};
        playerSetupScreen.style.display = 'block';
        gameScreen.style.display = 'none';
        playerNamesDiv.innerHTML = '';
        numPlayersInput.value = '';
        startGameBtn.disabled = true;
        clearPlayersBtn.click(); // Limpa os jogadores armazenados
    });

    // Carregar jogadores armazenados
    if (localStorage.getItem('players')) {
        players = JSON.parse(localStorage.getItem('players'));
        players.forEach(player => playerScores[player] = 0);
        shuffleArray(questions); // Embaralha as perguntas ao carregar o jogo
        startGame();
    }
});
