// Maze Game using React
// Game labirin 2D dengan fitur koin, bom, dan pintu keluar

// Define maze layout
// 0: path (jalan), 1: wall (dinding), 2: player (pemain), 
// 3: coin (koin), 4: bomb (bom), 5: exit (pintu keluar)

// Layout untuk setiap level
const mazeLevels = [
    // Level 1 - Pengenalan dasar
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 1, 3, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 3, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 0, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 3, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 2 - Dengan jalan pintas untuk menghindari bom
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 3, 0, 0, 0, 3, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 4, 1, 1, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 4, 3, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 3 - Level yang lebih kompleks
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 1, 3, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 3, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 4, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 3, 0, 0, 3, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 4 - Labirin dengan banyak jalan alternatif
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 1, 3, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 4, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 3, 1, 0, 0, 3, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 4, 1, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 5 - Maze dengan bom yang bisa dilewati dengan hati-hati
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 3, 0, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 4, 0, 0, 1],
        [1, 3, 0, 0, 3, 0, 0, 4, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 6 - Maze kompleks dengan banyak bom dan jalan alternatif
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 4, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 3, 1, 0, 1, 1],
        [1, 3, 0, 4, 0, 0, 0, 0, 3, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 7 - Maze dengan jalur sempit dan banyak koin
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 3, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 3, 1],
        [1, 3, 0, 4, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 3, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 4, 3, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 8 - Maze dengan pola zigzag dan bom tersembunyi
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 3, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 4, 0, 4, 3, 0, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 9 - Maze dengan jebakan bom dan jalur memutar
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 3, 0, 0, 3, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 3, 0, 0, 0, 4, 0, 1, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 3, 0, 4, 0, 0, 1, 3, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 10 - Maze final dengan banyak rintangan
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 3, 1, 0, 4, 0, 1],
        [1, 1, 1, 1, 4, 0, 0, 3, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
];

// Komponen utama Game
const Game = () => {
    // State untuk game
    const [currentLevel, setCurrentLevel] = React.useState(0);
    const [maze, setMaze] = React.useState(mazeLevels[0]);
    const [playerPos, setPlayerPos] = React.useState({ x: 1, y: 1 });
    const [score, setScore] = React.useState(0);
    const [totalCoins, setTotalCoins] = React.useState(0);
    const [collectedCoins, setCollectedCoins] = React.useState(0);
    const [gameStatus, setGameStatus] = React.useState('playing'); // playing, levelComplete, completed, lost
    
    // Hitung total koin saat level berubah
    React.useEffect(() => {
        let coins = 0;
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                if (maze[y][x] === 3) coins++;
            }
        }
        setTotalCoins(coins);
        setCollectedCoins(0);
    }, [currentLevel, maze]);
    
    // Handle input keyboard
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameStatus !== 'playing') return;
            
            switch (e.key) {
                case 'ArrowUp':
                    movePlayer(0, -1);
                    break;
                case 'ArrowDown':
                    movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowRight':
                    movePlayer(1, 0);
                    break;
                default:
                    break;
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playerPos, gameStatus, collectedCoins, totalCoins]);
    
    // Fungsi untuk menggerakkan pemain
    const movePlayer = (dx, dy) => {
        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;
        
        // Cek apakah gerakan valid
        if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length) return;
        if (maze[newY][newX] === 1) return; // Dinding
        
        // Handle berbagai tipe sel
        switch (maze[newY][newX]) {
            case 3: // Koin
                setScore(score + 10);
                setCollectedCoins(collectedCoins + 1);
                break;
            case 4: // Bom
                setGameStatus('lost');
                return;
            case 5: // Pintu keluar
                if (collectedCoins === totalCoins) {
                    if (currentLevel === mazeLevels.length - 1) {
                        setGameStatus('completed');
                    } else {
                        setGameStatus('levelComplete');
                    }
                    return;
                } else {
                    // Pemain harus mengumpulkan semua koin dulu
                    return;
                }
            default:
                break;
        }
        
        // Update maze
        const newMaze = maze.map(row => [...row]);
        newMaze[playerPos.y][playerPos.x] = 0; // Bersihkan posisi lama
        newMaze[newY][newX] = 2; // Set posisi baru
        
        setMaze(newMaze);
        setPlayerPos({ x: newX, y: newY });
    };
    
    // Muat level berikutnya
    const loadNextLevel = () => {
        const nextLevel = currentLevel + 1;
        if (nextLevel < mazeLevels.length) {
            setCurrentLevel(nextLevel);
            setMaze(mazeLevels[nextLevel]);
            setPlayerPos({ x: 1, y: 1 }); // Reset posisi pemain
            setGameStatus('playing');
        }
    };
    
    // Reset level saat ini
    const resetLevel = () => {
        setMaze(mazeLevels[currentLevel]);
        setPlayerPos({ x: 1, y: 1 });
        setCollectedCoins(0);
        setGameStatus('playing');
    };
    
    // Reset seluruh game
    const resetGame = () => {
        setCurrentLevel(0);
        setMaze(mazeLevels[0]);
        setPlayerPos({ x: 1, y: 1 });
        setScore(0);
        setCollectedCoins(0);
        setGameStatus('playing');
    };
    
    // Render sel maze
    const renderCell = (cellValue, x, y) => {
        switch (cellValue) {
            case 0: // Path
                return <div key={`${x}-${y}`} className="cell path"></div>;
            case 1: // Wall
                return <div key={`${x}-${y}`} className="cell wall"></div>;
            case 2: // Player
                return (
                    <div key={`${x}-${y}`} className="cell path player">
                        <div className="player-character">
                            <div className="mouth"></div>
                        </div>
                    </div>
                );
            case 3: // Coin
                return (
                    <div key={`${x}-${y}`} className="cell path">
                        <div className="coin-item"></div>
                    </div>
                );
            case 4: // Bomb
                return (
                    <div key={`${x}-${y}`} className="cell path">
                        <div className="bomb-item"></div>
                    </div>
                );
            case 5: // Exit
                return (
                    <div key={`${x}-${y}`} className="cell path">
                        <div className="exit-item"></div>
                    </div>
                );
            default:
                return <div key={`${x}-${y}`} className="cell"></div>;
        }
    };
    
    // Render tombol kontrol untuk perangkat mobile
    const renderControls = () => {
        return (
            <div className="controls">
                <button className="control-btn up-btn" onClick={() => movePlayer(0, -1)}>
                    <i className="fas fa-chevron-up"></i>
                </button>
                <button className="control-btn left-btn" onClick={() => movePlayer(-1, 0)}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button className="control-btn right-btn" onClick={() => movePlayer(1, 0)}>
                    <i className="fas fa-chevron-right"></i>
                </button>
                <button className="control-btn down-btn" onClick={() => movePlayer(0, 1)}>
                    <i className="fas fa-chevron-down"></i>
                </button>
            </div>
        );
    };
    
    // Render modal berdasarkan status game
    const renderModal = () => {
        if (gameStatus === 'playing') return null;
        
        let title, message, buttonText, buttonAction;
        
        switch (gameStatus) {
            case 'levelComplete':
                title = `Level ${currentLevel + 1} Selesai!`;
                message = `Kamu berhasil menyelesaikan level ${currentLevel + 1}. Siap untuk level berikutnya?`;
                buttonText = 'Level Berikutnya';
                buttonAction = loadNextLevel;
                break;
            case 'completed':
                title = 'Selamat!';
                message = `Kamu telah menyelesaikan semua level dengan skor ${score}! Kamu adalah master labirin!`;
                buttonText = 'Main Lagi';
                buttonAction = resetGame;
                break;
            case 'lost':
                title = 'Game Over!';
                message = 'Kamu terkena bom! Coba lagi dan hati-hati dengan bom.';
                buttonText = 'Coba Lagi';
                buttonAction = resetLevel;
                break;
            default:
                return null;
        }
        
        return (
            <div className="modal">
                <div className="modal-content">
                    <h2 className="modal-title">{title}</h2>
                    <p>{message}</p>
                    <button className="modal-btn" onClick={buttonAction}>{buttonText}</button>
                </div>
            </div>
        );
    };
    
    // Render komponen utama
    return (
        <div className="game-container">
            <div className="game-header">
                <div className="level-indicator">Level {currentLevel + 1}</div>
                <h1 className="game-title">Maze Adventure</h1>
                <div className="game-stats">
                    <div className="stat">
                        <i className="fas fa-coins"></i>
                        <span className="stat-value">{collectedCoins}/{totalCoins}</span>
                    </div>
                    <div className="stat">
                        <i className="fas fa-star"></i>
                        <span className="stat-value">{score}</span>
                    </div>
                </div>
            </div>
            
            <div className="maze-grid">
                {maze.map((row, y) => 
                    row.map((cell, x) => renderCell(cell, x, y))
                )}
            </div>
            
            {renderControls()}
            {renderModal()}
        </div>
    );
};

// Render aplikasi ke DOM
ReactDOM.render(<Game />, document.getElementById('root'));