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
    
    const questions = [
        { question: "Qual é o primeiro livro do Pentateuco?", answers: ["Deuteronômio", "Gênesis", "Êxodo", "Números"], correct: "Gênesis" },
        { question: "Quem foi o autor tradicionalmente aceito do Pentateuco?", answers: ["Josué", "Moisés", "Abraão", "Isaías"], correct: "Moisés" },
        { question: "Em qual livro do Pentateuco encontramos as Dez Pragas do Egito?", answers: ["Levítico", "Êxodo", "Deuteronômio", "Números"], correct: "Êxodo" },
        { question: "Qual dos seguintes livros contém as leis sobre sacrifícios e pureza?", answers: ["Gênesis", "Levítico", "Números", "Deuteronômio"], correct: "Levítico" },
        { question: "Em qual livro é narrada a história da serpente no Jardim do Éden?", answers: ["Êxodo", "Gênesis", "Números", "Levítico"], correct: "Gênesis" },
        // { question: "Qual é o tema central do livro de Deuteronômio?", answers: ["Criação do mundo", "Lei e renovação da aliança", "Histórias dos patriarcas", "Peregrinação no deserto"], correct: "Lei e renovação da aliança" },
        // { question: "Qual tribo de Israel foi designada para ser sacerdotal no Pentateuco?", answers: ["Judá", "Benjamim", "Levi", "Efraim"], correct: "Levi" },
        // { question: "Quem foi o líder que guiou os israelitas na saída do Egito?", answers: ["José", "Arão", "Moisés", "Josué"], correct: "Moisés" },
        // { question: "Em qual livro do Pentateuco se encontra o Shemá ('Ouve, Israel')?", answers: ["Levítico", "Gênesis", "Deuteronômio", "Êxodo"], correct: "Deuteronômio" },
        // { question: "Quantos anos os israelitas vagaram pelo deserto, segundo o Pentateuco?", answers: ["20 anos", "30 anos", "40 anos", "50 anos"], correct: "40 anos" },
        // { question: "Qual é o maior profeta que escreveu o livro com o maior número de capítulos na Bíblia?", answers: ["Jeremias", "Ezequiel", "Isaías", "Daniel"], correct: "Isaías" },
        // { question: "Qual profeta teve a visão do vale de ossos secos?", answers: ["Amós", "Jeremias", "Ezequiel", "Joel"], correct: "Ezequiel" },
        // { question: "Quem foi o profeta que anunciou o nascimento de Jesus em Belém?", answers: ["Isaías", "Miqueias", "Zacarias", "Malaquias"], correct: "Miqueias" },
        // { question: "Qual dos seguintes profetas foi engolido por um grande peixe?", answers: ["Jonas", "Amós", "Joel", "Naum"], correct: "Jonas" },
        // { question: "Quem profetizou sobre a Nova Aliança em Jeremias 31?", answers: ["Isaías", "Jeremias", "Ezequiel", "Daniel"], correct: "Jeremias" },
        // { question: "Qual profeta é conhecido por sua lamentação pela destruição de Jerusalém?", answers: ["Joel", "Habacuque", "Jeremias", "Zacarias"], correct: "Jeremias" },
        // { question: "Qual profeta enfrentou os profetas de Baal no Monte Carmelo?", answers: ["Isaías", "Ezequiel", "Elias", "Oseias"], correct: "Elias" },
        // { question: "Quem profetizou a queda de Nínive?", answers: ["Jonas", "Sofonias", "Naum", "Habacuque"], correct: "Naum" },
        // { question: "Qual profeta casou-se com uma mulher infiel como símbolo da relação de Deus com Israel?", answers: ["Oseias", "Joel", "Amós", "Malaquias"], correct: "Oseias" },
        // { question: "Quem profetizou sobre o 'Dia do Senhor', um dia de juízo e restauração?", answers: ["Amós", "Joel", "Obadias", "Sofonias"], correct: "Joel" },
        // { question: "Qual é o livro mais longo da Bíblia, com 150 capítulos?", answers: ["Provérbios", "Cânticos", "Salmos", "Jó"], correct: "Salmos" },
        // { question: "Qual dos seguintes livros é considerado o mais antigo, possivelmente escrito antes do Pentateuco?", answers: ["Salmos", "Provérbios", "Eclesiastes", "Jó"], correct: "Jó" },
        // { question: "Quem é o autor tradicionalmente atribuído à maior parte dos Salmos?", answers: ["Moisés", "Davi", "Salomão", "Jeremias"], correct: "Davi" },
        // { question: "Qual livro poético é uma coleção de cânticos de amor?", answers: ["Jó", "Salmos", "Provérbios", "Cânticos"], correct: "Cânticos" },
        // { question: "Qual dos livros poéticos aborda o tema da futilidade da vida sem Deus?", answers: ["Eclesiastes", "Jó", "Provérbios", "Salmos"], correct: "Eclesiastes" },
        // { question: "Qual personagem bíblico perdeu tudo, mas permaneceu fiel a Deus, segundo o livro que leva seu nome?", answers: ["Jó", "Salomão", "Davi", "Elias"], correct: "Jó" },
        // { question: "Em qual livro encontramos o famoso verso 'Há tempo para todo propósito debaixo do céu'?", answers: ["Salmos", "Provérbios", "Eclesiastes", "Jó"], correct: "Eclesiastes" },
        // { question: "Qual livro é conhecido por suas instruções práticas de sabedoria?", answers: ["Cânticos", "Eclesiastes", "Provérbios", "Salmos"], correct: "Provérbios" },
        // { question: "Em qual livro poético Davi clama a Deus em meio a perseguições?", answers: ["Salmos", "Jó", "Provérbios", "Eclesiastes"], correct: "Salmos" },
        // { question: "Quem é o autor tradicionalmente reconhecido do livro de Eclesiastes?", answers: ["Davi", "Salomão", "Isaías", "Moisés"], correct: "Salomão" },
        // { question: "Qual livro narra a conquista de Canaã sob a liderança de Josué?", answers: ["Juízes", "Josué", "Rute", "1 Samuel"], correct: "Josué" },
        // { question: "Qual juíza e profetisa liderou Israel à vitória contra Sísera?", answers: ["Débora", "Rute", "Ester", "Ana"], correct: "Débora" },
        // { question: "Qual rei foi o primeiro a unificar as tribos de Israel?", answers: ["Davi", "Salomão", "Saul", "Ezequias"], correct: "Saul" },
        // { question: "Em qual livro está registrada a história de uma moabita que se torna bisavó do rei Davi?", answers: ["Ester", "Rute", "1 Samuel", "2 Samuel"], correct: "Rute" },
        // { question: "Quem construiu o primeiro templo em Jerusalém?", answers: ["Davi", "Salomão", "Saul", "Neemias"], correct: "Salomão" },
        // { question: "Qual rainha arriscou sua vida para salvar seu povo de um genocídio?", answers: ["Ester", "Rute", "Ana", "Mical"], correct: "Ester" },
        // { question: "Qual livro narra o cativeiro babilônico e o retorno dos judeus a Jerusalém?", answers: ["Esdras", "Neemias", "2 Reis", "2 Crônicas"], correct: "Esdras" },
        // { question: "Quem liderou a reconstrução dos muros de Jerusalém após o exílio?", answers: ["Zorobabel", "Esdras", "Neemias", "Josué"], correct: "Neemias" },
        // { question: "Qual livro histórico narra a transição de governo de juízes para reis em Israel?", answers: ["Rute", "1 Samuel", "1 Reis", "2 Reis"], correct: "1 Samuel" },
        // { question: "Em qual livro encontramos a história de Sansão, o juiz com força sobre-humana?", answers: ["1 Samuel", "2 Samuel", "Juízes", "1 Reis"], correct: "Juízes" },
        // { question: "Qual dos evangelhos foi escrito para um público predominantemente judeu?", answers: ["Marcos", "Lucas", "Mateus", "João"], correct: "Mateus" },
        // { question: "Qual dos evangelhos enfatiza mais os milagres de Jesus?", answers: ["Mateus", "Lucas", "João", "Marcos"], correct: "Marcos" },
        // { question: "Qual evangelista era médico e escreveu também o livro de Atos?", answers: ["Mateus", "Lucas", "João", "Marcos"], correct: "Lucas" },
        // { question: "Qual dos evangelhos é conhecido por seu profundo conteúdo teológico e ênfase na divindade de Cristo?", answers: ["Mateus", "Lucas", "João", "Marcos"], correct: "João" },
        // { question: "Quem escreveu a maioria das cartas no Novo Testamento?", answers: ["Pedro", "Paulo", "João", "Tiago"], correct: "Paulo" },
        // { question: "Qual livro do Novo Testamento narra a história da igreja primitiva?", answers: ["Romanos", "1 Coríntios", "Atos", "Hebreus"], correct: "Atos" },
        // { question: "Qual apóstolo escreveu o livro do Apocalipse?", answers: ["Paulo", "Pedro", "João", "Tiago"], correct: "João" },
        // { question: "Quem foi o apóstolo que negou Jesus três vezes?", answers: ["Paulo", "Pedro", "João", "André"], correct: "Pedro" },
        // { question: "Qual livro do Novo Testamento é conhecido por seu tema de 'fé sem obras é morta'?", answers: ["Tiago", "Hebreus", "1 Pedro", "Filipenses"], correct: "Tiago" },
        // { question: "Qual apóstolo é conhecido por suas visões e cartas às igrejas da Ásia?", answers: ["Paulo", "Pedro", "João", "Tiago"], correct: "João" },
        // { question: "Em qual livro encontramos a descrição do 'fruto do Espírito'?", answers: ["Romanos", "Efésios", "Gálatas", "Colossenses"], correct: "Gálatas" }
    ];
    

    let players = [];
    let playerScores = {};
    let currentQuestionIndex = 0;
    let currentRound = 0;

    // Função para adicionar campos de entrada de nomes
    document.getElementById('addPlayers').addEventListener('click', function () {
        playerNamesDiv.innerHTML = '';
        const numPlayers = parseInt(numPlayersInput.value, 10);
        
        for (let i = 0; i < numPlayers; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Nome do jogador ${i + 1}`;
            input.className = 'player-name';
            playerNamesDiv.appendChild(input);
        }
        
        startGameBtn.disabled = numPlayers === 0;
    });

    // Função para iniciar o jogo
    startGameBtn.addEventListener('click', function () {
        const playerInputs = document.querySelectorAll('.player-name');
        players = Array.from(playerInputs).map(input => input.value.trim());
        
        players.forEach(player => {
            playerScores[player] = 0;
        });

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
        startGame();
    }
});
