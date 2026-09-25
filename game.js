<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Distance Between Us</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #f8eef4;
      color: #53465b;
      font-family: "Trebuchet MS", Arial, sans-serif;
    }
    #game-shell { width: min(100%, 1000px); }
    #game-container {
      width: 100%;
      overflow: hidden;
      border: 4px solid #fffafd;
      border-radius: 22px;
      box-shadow: 0 18px 50px #78617a2b;
    }
    #game-container canvas {
      display: block;
      width: 100%;
      height: auto;
    }
    .help {
      margin: 12px 4px 0;
      text-align: center;
      color: #786b7e;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <main id="game-shell">
    <div id="game-container"></div>
    <p class="help">← → di chuyển · Space để nhảy · Né chướng ngại vật để ghi điểm</p>
  </main>

<script>
const WIDTH = 1000;
const HEIGHT = 600;

const COLORS = {
  sky: 0xF8EEF4,
  ground: 0xB8D8C0,
  groundTop: 0x8FBEA0,
  player: 0xF4AFC0,
  playerOutline: 0xD982A0,
  obstacle: 0xF2A979,
  obstacleTwo: 0xF5CB75,
  platform: 0xB8A1D9,
  platformHighlight: 0xD8C9EC,
  ink: 0x594C65,
  muted: 0x806F89,
  panel: 0xFFFAFD,
  accent: 0xA78BC8
};

let gameOver = false;

function getObstacleSpeed(level) {
  if (level === 1) return 300;
  if (level === 2) return 320;
  if (level <= 7) return 350;
  if (level === 8) return 360;
  if (level === 9) return 375;
  return 400;
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: "game-container",
  backgroundColor: COLORS.sky,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1300 },
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

new Phaser.Game(config);

function create() {
  gameOver = false;
  this.physics.world.resume();

  // Trang trí nền
  this.add.circle(850, 95, 52, 0xF7DCE6, 0.78);
  this.add.circle(850, 95, 37, 0xFFF4D6, 0.95);
  this.add.ellipse(165, 115, 170, 44, 0xFFFFFF, 0.58);
  this.add.ellipse(205, 105, 90, 38, 0xFFFFFF, 0.58);
  this.add.ellipse(690, 185, 135, 34, 0xFFFFFF, 0.38);

  // Tiêu đề game
  this.add.text(WIDTH / 2, 24, "DISTANCE BETWEEN US", {
    fontFamily: "Trebuchet MS, Arial, sans-serif",
    fontSize: "27px",
    fontStyle: "bold",
    color: "#594C65",
    letterSpacing: 2
  }).setOrigin(0.5, 0);

  this.add.text(WIDTH / 2, 58, "A little journey, one step at a time", {
    fontFamily: "Trebuchet MS, Arial, sans-serif",
    fontSize: "14px",
    color: "#806F89",
    letterSpacing: 1
  }).setOrigin(0.5, 0);

  // Mặt đất
  const ground = this.add.rectangle(500, 550, 1000, 100, COLORS.ground);
  this.physics.add.existing(ground, true);
  this.add.rectangle(500, 501, 1000, 5, COLORS.groundTop).setDepth(1);

  // Nhân vật
  this.player = this.add.rectangle(200, 450, 50, 50, COLORS.player);
  this.player.setStrokeStyle(3, COLORS.playerOutline);
  this.physics.add.existing(this.player);
  this.player.body.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, ground);

  // Bục di chuyển, bắt đầu ẩn và xuất hiện từ level 3
  this.platform = this.add.rectangle(700, 400, 180, 30, COLORS.platform);
  this.platform.setStrokeStyle(3, COLORS.platformHighlight);
  this.physics.add.existing(this.platform);
  this.platform.body.setAllowGravity(false);
  this.platform.setVisible(false);
  this.platform.body.enable = false;
  this.physics.add.collider(this.player, this.platform);
  this.platformActive = false;

  // Chướng ngại vật 1
  this.obstacle = this.add.rectangle(800, 460, 50, 80, COLORS.obstacle);
  this.obstacle.setStrokeStyle(3, 0xD88E6D);
  this.physics.add.existing(this.obstacle);
  this.obstacle.body.setAllowGravity(false);

  // Chướng ngại vật 2
  this.obstacle2 = this.add.rectangle(1500, 460, 50, 80, COLORS.obstacleTwo);
  this.obstacle2.setStrokeStyle(3, 0xD9B65F);
  this.physics.add.existing(this.obstacle2);
  this.obstacle2.body.setAllowGravity(false);

  // Điểm, level và tốc độ
  this.score = 0;
  this.level = 1;
  this.obstacleSpeed = getObstacleSpeed(this.level);
  this.obstaclePassed = false;
  this.obstacle2Passed = false;

  this.obstacle.body.setVelocityX(-this.obstacleSpeed);
  this.obstacle2.body.setVelocityX(-this.obstacleSpeed);

  // Va chạm với chướng ngại vật
  this.physics.add.overlap(
    this.player,
    this.obstacle,
    hitObstacle,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.obstacle2,
    hitObstacle,
    null,
    this
  );

  // Bảng điểm pastel
  this.add.rectangle(117, 119, 194, 96, COLORS.panel, 0.94)
    .setStrokeStyle(2, 0xE6D6E8)
    .setDepth(2);

  this.add.text(38, 82, "SCORE", {
    fontSize: "14px",
    fontStyle: "bold",
    color: "#806F89",
    letterSpacing: 1
  }).setDepth(3);

  this.scoreText = this.add.text(38, 99, "0", {
    fontSize: "27px",
    fontStyle: "bold",
    color: "#594C65"
  }).setDepth(3);

  this.add.text(138, 82, "LEVEL", {
    fontSize: "14px",
    fontStyle: "bold",
    color: "#806F89",
    letterSpacing: 1
  }).setDepth(3);

  this.levelText = this.add.text(138, 99, "1", {
    fontSize: "27px",
    fontStyle: "bold",
    color: "#594C65"
  }).setDepth(3);

  // Điều khiển
  this.cursors = this.input.keyboard.createCursorKeys();
  this.spaceKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
}

function addScore(scene) {
  scene.score += 10;
  scene.scoreText.setText(String(scene.score));

  const newLevel = Math.min(10, Math.floor(scene.score / 100) + 1);

  if (newLevel !== scene.level) {
    scene.level = newLevel;
    scene.levelText.setText(String(scene.level));

    scene.obstacleSpeed = getObstacleSpeed(scene.level);
    scene.obstacle.body.setVelocityX(-scene.obstacleSpeed);
    scene.obstacle2.body.setVelocityX(-scene.obstacleSpeed);
  }
}

function update() {
  if (gameOver) return;

  // Di chuyển trái, phải
  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-300);
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(300);
  } else {
    this.player.body.setVelocityX(0);
  }

  // Nhảy
  if (
    Phaser.Input.Keyboard.JustDown(this.spaceKey) &&
    this.player.body.blocked.down
  ) {
    this.player.body.setVelocityY(-650);
  }

  // Mỗi chướng ngại vật chỉ cộng điểm một lần khi vượt qua
  if (this.obstacle.x < this.player.x - 25 && !this.obstaclePassed) {
    this.obstaclePassed = true;
    addScore(this);
  }

  if (this.obstacle2.x < this.player.x - 25 && !this.obstacle2Passed) {
    this.obstacle2Passed = true;
    addScore(this);
  }

  // Bục xuất hiện từ level 3
  if (this.level >= 3) {
    if (
      !this.platformActive &&
      this.obstacle2.x < 1000 &&
      this.obstacle2.x > 700
    ) {
      this.platform.x = this.obstacle2.x + 250;
      this.platform.y = 400;
      this.platform.setVisible(true);
      this.platform.body.enable = true;
      this.platform.body.setVelocityX(-this.obstacleSpeed);
      this.platformActive = true;
    }

    if (this.platformActive && this.platform.x < -100) {
      this.platform.setVisible(false);
      this.platform.body.enable = false;
      this.platformActive = false;
    }
  }

  // Đưa chướng ngại vật 1 trở lại màn hình
  if (this.obstacle.x < -50) {
    const newHeight = Phaser.Math.Between(50, 120);

    this.obstacle.setSize(50, newHeight);
    this.obstacle.body.setSize(50, newHeight);
    this.obstacle.y = 500 - newHeight / 2;
    this.obstacle.x = 1050;
    this.obstaclePassed = false;
    this.obstacle.body.setVelocityX(-this.obstacleSpeed);
  }

  // Đưa chướng ngại vật 2 trở lại màn hình
  if (this.obstacle2.x < -50) {
    const newHeight = Phaser.Math.Between(50, 120);

    this.obstacle2.setSize(50, newHeight);
    this.obstacle2.body.setSize(50, newHeight);
    this.obstacle2.y = 500 - newHeight / 2;
    this.obstacle2.x = Phaser.Math.Between(1400, 1800);
    this.obstacle2Passed = false;
    this.obstacle2.body.setVelocityX(-this.obstacleSpeed);
  }
}

function hitObstacle() {
  if (gameOver) return;

  gameOver = true;
  this.physics.pause();
  this.player.setAlpha(0.55);

  this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x594C65, 0.3)
    .setDepth(10);

  this.add.rectangle(WIDTH / 2, 300, 440, 250, COLORS.panel, 0.98)
    .setStrokeStyle(3, 0xE6D6E8)
    .setDepth(11);

  this.add.text(WIDTH / 2, 235, "GAME OVER", {
    fontFamily: "Trebuchet MS, Arial, sans-serif",
    fontSize: "44px",
    fontStyle: "bold",
    color: "#D87E9A",
    letterSpacing: 2
  }).setOrigin(0.5).setDepth(12);

  this.add.text(
    WIDTH / 2,
    288,
    `SCORE: ${this.score}   ·   LEVEL: ${this.level}`,
    {
      fontSize: "20px",
      fontStyle: "bold",
      color: "#594C65"
    }
  ).setOrigin(0.5).setDepth(12);

  const restart = this.add.text(WIDTH / 2, 355, "CHƠI LẠI", {
    fontFamily: "Trebuchet MS, Arial, sans-serif",
    fontSize: "22px",
    fontStyle: "bold",
    color: "#FFFFFF",
    backgroundColor: "#A78BC8",
    padding: { left: 25, right: 25, top: 13, bottom: 13 }
  }).setOrigin(0.5).setDepth(12).setInteractive({ useHandCursor: true });

  restart.on("pointerover", () => {
    restart.setStyle({ backgroundColor: "#9275B6" });
  });

  restart.on("pointerout", () => {
    restart.setStyle({ backgroundColor: "#A78BC8" });
  });

  restart.on("pointerdown", () => {
    gameOver = false;
    this.scene.restart();
  });
}
</script>
</body>
</html>