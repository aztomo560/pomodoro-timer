class PomodoroTimer {
    constructor() {
        this.timer = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workBtn = document.getElementById('workBtn');
        this.shortBreakBtn = document.getElementById('shortBreakBtn');
        this.longBreakBtn = document.getElementById('longBreakBtn');
        
        this.isRunning = false;
        this.timeLeft = 1500; // 25分 * 60秒
        this.interval = null;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        
        this.workBtn.addEventListener('click', () => this.setMode(1500, this.workBtn));
        this.shortBreakBtn.addEventListener('click', () => this.setMode(300, this.shortBreakBtn));
        this.longBreakBtn.addEventListener('click', () => this.setMode(900, this.longBreakBtn));
    }

    toggleTimer() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
            this.startBtn.textContent = '開始';
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startBtn.textContent = '停止';
        
        this.interval = setInterval(() => {
            if (this.timeLeft <= 0) {
                this.resetTimer();
                this.playSound();
            } else {
                this.timeLeft--;
                this.updateDisplay();
            }
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.startBtn.textContent = '開始';
        this.updateDisplay();
    }

    setMode(duration, button) {
        this.resetTimer();
        this.timeLeft = duration;
        this.updateDisplay();
        
        // モードボタンのアクティブ状態を更新
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playSound() {
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.play();
    }
}

// タイマーの初期化
const timer = new PomodoroTimer();
