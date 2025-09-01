
        // Sound
        const clickSound = document.getElementById('click-sound');

        // Game state variables
        let score = 0;
        let currentQuestionIndex = 0;
        let timer = 10;
        let timerInterval;
        let selectedLanguage = '';
        let questions = [];

        // HTML element references
        const languageScreen = document.getElementById('language-screen');
        const startScreen = document.getElementById('start-screen');
        const gameScreen = document.getElementById('game-screen');
        const endScreen = document.getElementById('end-screen');
        const startButton = document.getElementById('start-button');
        const restartButton = document.getElementById('restart-button');
        const scoreDisplay = document.getElementById('score-display');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const progressBar = document.getElementById('progress-bar');
        const feedbackMessage = document.getElementById('feedback-message');
        const finalScoreDisplay = document.getElementById('final-score');
        const finalMessage = document.getElementById('final-message');
        const quizTitle = document.getElementById('quiz-title');
        const quizDesc = document.getElementById('quiz-desc');

        // Question banks
        const questionBanks = {
            "HTML": [
                { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyper Text Multi Language"], answer: "Hyper Text Markup Language" },
                { question: "Which HTML tag is used to define an internal stylesheet?", options: ["<script>", "<style>", "<css>", "<link>"], answer: "<style>" },
                { question: "Which of the following HTML elements is used for a heading?", options: ["<p>", "<h1>", "<br>", "<a>"], answer: "<h1>" },
                { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<line>"], answer: "<br>" },
                { question: "What is the HTML attribute used to specify the source of an image?", options: ["src", "href", "source", "link"], answer: "src" },
                { question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<hlink>", "<href>"], answer: "<a>" },
                { question: "How do you create an unordered list in HTML?", options: ["<ol>", "<li>", "<ul>", "<dl>"], answer: "<ul>" },
                { question: "Which HTML tag is used to define a table row?", options: ["<tr>", "<td>", "<th>", "<table>"], answer: "<tr>" },
                { question: "What is the purpose of the `alt` attribute in an `<img>` tag?", options: ["To provide a title for the image", "To define the image's alignment", "To provide alternative text for screen readers", "To specify the image's dimension"], answer: "To provide alternative text for screen readers" },
                { question: "Which HTML tag is used to define a paragraph?", options: ["<p>", "<span>", "<para>", "<section>"], answer: "<p>" }
            ],
            "CSS": [
                { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
                { question: "Which property is used to change the text color in CSS?", options: ["font-color", "color", "text-color", "background-color"], answer: "color" },
                { question: "How do you select all elements with class 'demo'?", options: [".demo", "#demo", "demo", "*demo"], answer: ".demo" },
                { question: "Which CSS property controls the size of text?", options: ["font-size", "text-style", "text-size", "font-style"], answer: "font-size" },
                { question: "How do you make a list not display bullets?", options: ["list-style-type: none;", "bullet: none;", "no-bullets: true;", "list-type: none;"], answer: "list-style-type: none;" },
                { question: "Which property is used for spacing inside an element?", options: ["margin", "padding", "border", "spacing"], answer: "padding" },
                { question: "How do you make an element float to the right?", options: ["float: right;", "align: right;", "position: right;", "display: right;"], answer: "float: right;" },
                { question: "Which selector targets all <p> elements?", options: ["p", ".p", "#p", "*p"], answer: "p" },
                { question: "How do you set a background image in CSS?", options: ["background-image: url('img.jpg');", "bg-image: 'img.jpg';", "background: image('img.jpg');", "image: url('img.jpg');"], answer: "background-image: url('img.jpg');" },
                { question: "Which property is used to make text bold?", options: ["font-weight", "font-bold", "bold", "weight"], answer: "font-weight" }
            ],
            "JavaScript": [
                { question: "Which keyword declares a variable in JavaScript?", options: ["var", "let", "const", "All of the above"], answer: "All of the above" },
                { question: "What is the output of '2' + 2 in JavaScript?", options: ["4", "22", "NaN", "Error"], answer: "22" },
                { question: "Which method is used to print to the console?", options: ["console.log()", "print()", "log()", "output()"], answer: "console.log()" },
                { question: "How do you write a comment in JavaScript?", options: ["// comment", "<!-- comment -->", "# comment", "/* comment */"], answer: "// comment" },
                { question: "Which operator is used for strict equality?", options: ["==", "===", "!=", "="], answer: "===" },
                { question: "How do you define a function in JavaScript?", options: ["function myFunc() {}", "def myFunc() {}", "func myFunc() {}", "function:myFunc() {}"], answer: "function myFunc() {}" },
                { question: "Which array method adds an item to the end?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
                { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Display Object Model", "Document Oriented Model"], answer: "Document Object Model" },
                { question: "How do you access the first element of an array?", options: ["array[0]", "array(0)", "array.first()", "array{0}"], answer: "array[0]" },
                { question: "Which event runs when a user clicks an element?", options: ["onclick", "onhover", "onpress", "onchange"], answer: "onclick" }
            ],
            "Node.js": [
                { question: "Node.js is built on which JavaScript engine?", options: ["V8", "SpiderMonkey", "Chakra", "Rhino"], answer: "V8" },
                { question: "Which module is used to create a server in Node.js?", options: ["http", "fs", "url", "path"], answer: "http" },
                { question: "How do you import a module in Node.js?", options: ["require()", "import()", "include()", "use()"], answer: "require()" },
                { question: "Which method reads a file asynchronously?", options: ["fs.readFile()", "fs.read()", "fs.open()", "fs.getFile()"], answer: "fs.readFile()" },
                { question: "What is npm?", options: ["Node Package Manager", "New Programming Method", "Network Protocol Module", "Node Programming Model"], answer: "Node Package Manager" },
                { question: "Which statement exports a function?", options: ["module.exports = myFunc;", "export myFunc;", "exports: myFunc;", "send myFunc;"], answer: "module.exports = myFunc;" },
                { question: "Which method parses a JSON string?", options: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "toJSON()"], answer: "JSON.parse()" },
                { question: "Which object represents the current process?", options: ["process", "global", "main", "node"], answer: "process" },
                { question: "How do you install a package globally?", options: ["npm install -g package", "npm install package", "npm global package", "npm add package"], answer: "npm install -g package" },
                { question: "Which module handles file paths?", options: ["path", "fs", "http", "url"], answer: "path" }
            ],
            "React": [
                { question: "React is a library for building ____?", options: ["User interfaces", "Databases", "Servers", "APIs"], answer: "User interfaces" },
                { question: "What is a component in React?", options: ["Reusable piece of UI", "Database table", "Server endpoint", "CSS file"], answer: "Reusable piece of UI" },
                { question: "Which hook is used for state in React?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: "useState" },
                { question: "JSX stands for?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JavaScript Xtra"], answer: "JavaScript XML" },
                { question: "How do you pass data to a child component?", options: ["Props", "State", "Context", "Variables"], answer: "Props" },
                { question: "Which method is called after a component is rendered?", options: ["componentDidMount", "componentWillMount", "componentDidUpdate", "componentWillUnmount"], answer: "componentDidMount" },
                { question: "How do you handle side effects in React?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useEffect" },
                { question: "Which prop is used for unique identification in lists?", options: ["key", "id", "ref", "name"], answer: "key" },
                { question: "How do you create a functional component?", options: ["function MyComponent() {}", "class MyComponent extends React.Component {}", "component MyComponent {}", "func MyComponent() {}"], answer: "function MyComponent() {}" },
                { question: "Which package is used for routing in React?", options: ["react-router-dom", "react-route", "react-navigation", "react-router"], answer: "react-router-dom" }
            ],
            "Full Stack": [
                { question: "Which of the following is a NoSQL database?", options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"], answer: "MongoDB" },
                { question: "Which protocol is used for web communication?", options: ["HTTP", "FTP", "SMTP", "SSH"], answer: "HTTP" },
                { question: "Which language is commonly used for backend development?", options: ["Node.js", "Java", "Python", "All of the above"], answer: "All of the above" },
                { question: "What does REST stand for?", options: ["Representational State Transfer", "Remote Server Transfer", "Rapid State Transition", "Resource State Transfer"], answer: "Representational State Transfer" },
                { question: "Which tool is used for version control?", options: ["Git", "Docker", "NPM", "Webpack"], answer: "Git" },
                { question: "Which HTTP method is used to update data?", options: ["PUT", "GET", "POST", "DELETE"], answer: "PUT" },
                { question: "Which frontend framework uses components?", options: ["React", "Angular", "Vue", "All of the above"], answer: "All of the above" },
                { question: "What is the default port for HTTP?", options: ["80", "443", "22", "21"], answer: "80" },
                { question: "Which tool is used for containerization?", options: ["Docker", "Kubernetes", "Git", "Nginx"], answer: "Docker" },
                { question: "Which database is relational?", options: ["MySQL", "MongoDB", "Redis", "Cassandra"], answer: "MySQL" }
            ]
        };

        // Quiz descriptions
        const quizDescriptions = {
            "HTML": "Test your knowledge of HTML fundamentals and become a coding champion!",
            "CSS": "Show off your CSS skills and style your way to victory!",
            "JavaScript": "Prove your JavaScript expertise and master the web!",
            "Node.js": "Demonstrate your backend Node.js skills!",
            "React": "Challenge your React knowledge and build dynamic UIs!",
            "Full Stack": "Take on the ultimate Full Stack Web Development challenge!"
        };

        // Language selection
        document.querySelectorAll('#language-screen button[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                clickSound.currentTime = 0; clickSound.play();
                selectedLanguage = btn.getAttribute('data-lang');
                questions = questionBanks[selectedLanguage];
                quizTitle.textContent = selectedLanguage + " Quest";
                quizDesc.textContent = quizDescriptions[selectedLanguage];
                languageScreen.classList.add('hidden');
                startScreen.classList.remove('hidden');
            });
        });

        function startGame() {
            score = 0;
            currentQuestionIndex = 0;
            startScreen.classList.add('hidden');
            endScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            loadQuestion();
        }

        function loadQuestion() {
            if (currentQuestionIndex >= questions.length) {
                endGame();
                return;
            }
            feedbackMessage.textContent = '';
            optionsContainer.innerHTML = '';
            const currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;
            gameScreen.classList.add('fade-in');
            setTimeout(() => gameScreen.classList.remove('fade-in'), 700);

            timer = 10;
            updateProgressBar();
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                timer--;
                updateProgressBar();
                if (timer <= 0) {
                    clearInterval(timerInterval);
                    feedbackMessage.textContent = "⏰ Time's up! The correct answer was: " + currentQuestion.answer;
                    Array.from(optionsContainer.children).forEach(btn => {
                        if (btn.textContent === currentQuestion.answer) {
                            btn.classList.add('correct-btn');
                        }
                        btn.disabled = true;
                    });
                    setTimeout(nextQuestion, 1500);
                }
            }, 1000);

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('btn', 'bg-gray-700', 'text-white', 'font-bold', 'py-4', 'px-6', 'rounded-xl', 'shadow-md', 'hover:bg-gray-600', 'text-left');
                button.addEventListener('click', () => checkAnswer(button, option));
                button.addEventListener('click', () => { clickSound.currentTime = 0; clickSound.play(); });
                optionsContainer.appendChild(button);
            });
        }

        function updateProgressBar() {
            const percentage = (timer / 10) * 100;
            progressBar.style.width = percentage + '%';
        }

        function checkAnswer(selectedButton, selectedAnswer) {
            clearInterval(timerInterval);
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = (selectedAnswer === currentQuestion.answer);

            Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

            if (isCorrect) {
                score++;
                scoreDisplay.textContent = "Score: " + score;
                feedbackMessage.textContent = "✅ Correct!";
                selectedButton.classList.add('correct-btn');
            } else {
                feedbackMessage.textContent = "❌ Incorrect. The correct answer was: " + currentQuestion.answer;
                selectedButton.classList.add('incorrect-btn');
                Array.from(optionsContainer.children).forEach(btn => {
                    if (btn.textContent === currentQuestion.answer) {
                        btn.classList.add('correct-btn');
                    }
                });
            }
            setTimeout(nextQuestion, 2000);
        }

        function nextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
        }

        function endGame() {
            gameScreen.classList.add('hidden');
            endScreen.classList.remove('hidden');
            finalScoreDisplay.textContent = "Your final score is: " + score + " / " + questions.length;
            if (score === questions.length) {
                finalMessage.textContent = "🏆 You are a master! Perfect score!";
            } else if (score >= questions.length / 2) {
                finalMessage.textContent = "👏 Nice job! You've got a solid grasp.";
            } else {
                finalMessage.textContent = "💡 Keep practicing to improve!";
            }
        }

        startButton.addEventListener('click', () => { clickSound.currentTime = 0; clickSound.play(); startGame(); });
        restartButton.addEventListener('click', () => {
            clickSound.currentTime = 0; clickSound.play();
            endScreen.classList.add('hidden');
            languageScreen.classList.remove('hidden');
        });
         // ...existing code...
    // Add references for new back buttons
    const backToLanguage1 = document.getElementById('back-to-language-1');
    const backToLanguage2 = document.getElementById('back-to-language-2');
    const backToLanguage3 = document.getElementById('back-to-language-3');

    // Back button logic
    function goToLanguageScreen() {
        clickSound.currentTime = 0; clickSound.play();
        startScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        languageScreen.classList.remove('hidden');
    }
    backToLanguage1.addEventListener('click', goToLanguageScreen);
    backToLanguage2.addEventListener('click', goToLanguageScreen);
    backToLanguage3.addEventListener('click', goToLanguageScreen);

    // ...existing code...
    // Sound fix: play sound on every button click
    function playClickSound() {
        clickSound.pause();
        clickSound.currentTime = 0;
        clickSound.play();
    }

    // Update all button click handlers to use playClickSound
    document.querySelectorAll('#language-screen button[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound();
            selectedLanguage = btn.getAttribute('data-lang');
            questions = questionBanks[selectedLanguage];
            quizTitle.textContent = selectedLanguage + " Quest";
            quizDesc.textContent = quizDescriptions[selectedLanguage];
            languageScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
        });
    });

    startButton.addEventListener('click', () => { playClickSound(); startGame(); });
    restartButton.addEventListener('click', () => {
        playClickSound();
        endScreen.classList.add('hidden');
        languageScreen.classList.remove('hidden');
    });

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }
        feedbackMessage.textContent = '';
        optionsContainer.innerHTML = '';
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        gameScreen.classList.add('fade-in');
        setTimeout(() => gameScreen.classList.remove('fade-in'), 700);

        timer = 10;
        updateProgressBar();
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer--;
            updateProgressBar();
            if (timer <= 0) {
                clearInterval(timerInterval);
                feedbackMessage.textContent = "⏰ Time's up! The correct answer was: " + currentQuestion.answer;
                Array.from(optionsContainer.children).forEach(btn => {
                    if (btn.textContent === currentQuestion.answer) {
                        btn.classList.add('correct-btn');
                    }
                    btn.disabled = true;
                });
                setTimeout(nextQuestion, 1500);
            }
        }, 1000);

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn', 'bg-gray-700', 'text-white', 'font-bold', 'py-5', 'px-8', 'rounded-xl', 'shadow-md', 'hover:bg-gray-600', 'text-left', 'transition-all', 'duration-200');
            button.addEventListener('click', () => { playClickSound(); checkAnswer(button, option); });
            optionsContainer.appendChild(button);
        });
    }


              // ...existing code...
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');

    backBtn.addEventListener('click', () => {
        playClickSound();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    forwardBtn.addEventListener('click', () => {
        playClickSound();
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });
