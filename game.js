const config = {
    type: Phaser.AUTO,

    width: 1000,
    height: 600,

    parent: "game-container",

    backgroundColor: "#222222",

    physics: {
        default: "arcade",

        arcade: {
            gravity: {
                y: 1300
            },

            debug: false
        }
    },

    scene: {
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let gameOver = false;


// =========================
// CREATE
// =========================

function create() {

    // MẶT ĐẤT
    const ground = this.add.rectangle(
        500,
        550,
        1000,
        100,
        0x444444
    );

    this.physics.add.existing(
        ground,
        true
    );


    // NHÂN VẬT
    this.player = this.add.rectangle(
        200,
        450,
        50,
        50,
        0x00ff00
    );

    this.physics.add.existing(
        this.player
    );


    // VA CHẠM NHÂN VẬT - MẶT ĐẤT
    this.physics.add.collider(
        this.player,
        ground
    );

// =========================
// BỤC GỖ - LEVEL 3
// =========================

this.platform = this.add.rectangle(
    700,
    400,
    180,
    30,
    0x8B4513
);

this.physics.add.existing(this.platform);

// Bục không bị trọng lực kéo xuống
this.platform.body.setAllowGravity(false);

// Ban đầu ẩn
this.platform.setVisible(false);
this.platform.body.enable = false;

// Va chạm với nhân vật
this.physics.add.collider(
    this.player,
    this.platform
);

this.platformActive = false;

this.platformSpeed = 350;
this.platformActive = false;


    // BÀN PHÍM
    this.cursors =
        this.input.keyboard.createCursorKeys();

    this.spaceKey =
        this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );


    // =========================
    // CHƯỚNG NGẠI VẬT
    // =========================

    this.obstacle = this.add.rectangle(
    800,
    460,
    50,
    80,
    0xff0000
);

this.physics.add.existing(
    this.obstacle
);

this.obstacle.body.setAllowGravity(false);

// Tốc độ ban đầu
this.obstacleSpeed = 300;

this.obstaclePassed = false;

this.obstacle2Passed = false;

this.obstacle.body.setVelocityX(-this.obstacleSpeed);

this.obstacle2 = this.add.rectangle(
    1500,
    460,
    50,
    80,
    0xff9900
);

this.physics.add.existing(
    this.obstacle2
);

this.obstacle2.body.setAllowGravity(false);

this.obstacle2.body.setVelocityX(-this.obstacleSpeed);

    // VA CHẠM VỚI CHƯỚNG NGẠI
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

    // =========================
// ĐIỂM
// =========================

this.score = 0;
this.level = 1;

this.scoreText = this.add.text(
    20,
    20,
    "SCORE: 0",
    {
        fontSize: "28px",
        color: "#ffffff",
        fontStyle: "bold"
    }
);
this.levelText = this.add.text(
    20,
    55,
    "LEVEL: 1",
    {
        fontSize: "24px",
        color: "#ffffff",
        fontStyle: "bold"
    }
);
}


// =========================
// UPDATE
// =========================
function getObstacleSpeed(level) {

    if (level === 1) {
        return 300;
    }

    if (level === 2) {
        return 320;
    }

    if (level >= 3 && level <= 7) {
        return 350;
    }

    if (level === 8) {
        return 360;
    }

    if (level === 9) {
        return 375;
    }

    if (level === 10) {
        return 400;
    }

    return 300;
}

function update() {

    if (gameOver) {
    return;
}

    // DI CHUYỂN TRÁI
    if (this.cursors.left.isDown) {

        this.player.body.setVelocityX(-300);

    }

    // DI CHUYỂN PHẢI
    else if (this.cursors.right.isDown) {

        this.player.body.setVelocityX(300);

    }

    // DỪNG
    else {

        this.player.body.setVelocityX(0);

    }


    // NHẢY
    if (
        Phaser.Input.Keyboard.JustDown(
            this.spaceKey
        )
        &&
        this.player.body.blocked.down
    ) {

        this.player.body.setVelocityY(-650);

    }


    // CHƯỚNG NGẠI ĐI RA KHỎI MÀN HÌNH
  if (
    this.obstacle.x < this.player.x - 25 &&
    !this.obstaclePassed
) {

    this.obstaclePassed = true;

    this.score += 10;

    this.scoreText.setText(
        "SCORE: " + this.score
    );

    const newLevel = Math.min(
    10,
    Math.floor(this.score / 100) + 1
);

if (newLevel !== this.level) {

    this.level = newLevel;

    this.levelText.setText(
        "LEVEL: " + this.level
    );

    this.obstacleSpeed =
        getObstacleSpeed(this.level);

    this.obstacle.body.setVelocityX(
        -this.obstacleSpeed
    );

    this.obstacle2.body.setVelocityX(
        -this.obstacleSpeed
    );
}
    // HIỆN BỤC TỪ LEVEL 3
// BỤC GỖ CHỈ HOẠT ĐỘNG TỪ LEVEL 3

if (this.level >= 3) {

    // Chưa có bục
    if (!this.platformActive) {

        // Khi cột 2 đi đến khu vực này
        if (
            this.obstacle2.x < 1000 &&
            this.obstacle2.x > 700
        ) {

            // Bục xuất hiện phía trước cột
            this.platform.x =
                this.obstacle2.x + 250;

            this.platform.y = 400;

            this.platform.setVisible(true);
            this.platform.body.enable = true;

            // Bục chạy từ phải sang trái
            this.platform.body.setVelocityX(
                -this.obstacleSpeed
            );

            this.platformActive = true;
        }
    }

    // Bục ra khỏi màn hình
    if (
        this.platformActive &&
        this.platform.x < -100
    ) {

        this.platform.setVisible(false);
        this.platform.body.enable = false;

        this.platformActive = false;
    }
}
}

if (this.obstacle.x < -50) {

    // Vị trí xuất hiện
    this.obstacle.x = 1050;

    // Random chiều cao
    const newHeight =
        Phaser.Math.Between(50, 120);

    // Thay đổi kích thước
    this.obstacle.setSize(
        50,
        newHeight
    );

    // Đặt obstacle chạm mặt đất
    this.obstacle.y =
        500 - newHeight / 2;

    this.obstaclePassed = false;

    // Giữ tốc độ hiện tại
    this.obstacle.body.setVelocityX(
        -this.obstacleSpeed
    );
}
// OBSTACLE 2 VƯỢT QUA NHÂN VẬT
if (
    this.obstacle2.x < this.player.x - 25 &&
    !this.obstacle2Passed
) {

    this.obstacle2Passed = true;

    this.score += 10;

    this.scoreText.setText(
        "SCORE: " + this.score
    );

    this.obstacleSpeed += 30;

    this.obstacle2.body.setVelocityX(
        -this.obstacleSpeed
    );
}


// OBSTACLE 2 RA KHỎI MÀN HÌNH
//OBSTACLE 2 VƯỢT QUA NHÂN VẬT
if (
    this.obstacle2.x < this.player.x - 25 &&
    !this.obstacle2Passed
) {

    this.obstacle2Passed = true;

    this.score += 10;

    this.scoreText.setText(
        "SCORE: " + this.score
    );

    this.obstacleSpeed += 30;

    this.obstacle2.body.setVelocityX(
        -this.obstacleSpeed
    );
}


// OBSTACLE 2 RA KHỎI MÀN HÌNH
if (this.obstacle2.x < -50) {

    this.obstacle2.x =
    Phaser.Math.Between(1400, 1800);

    const newHeight =
    Phaser.Math.Between(50, 120);

this.obstacle2.setSize(
    50,
    newHeight
);

this.obstacle2.y =
    500 - newHeight / 2;

    this.obstacle2Passed = false;

    this.obstacle2.body.setVelocityX(
        -this.obstacleSpeed
    );
}
}


// =========================
// KHI ĐỤNG CHƯỚNG NGẠI
// =========================

function hitObstacle() {

    if (gameOver) {
        return;
    }

    gameOver = true;

    this.add.text(
        500,
        250,
        "GAME OVER",
        {
            fontSize: "64px",
            color: "#ff0000",
            fontStyle: "bold"
        }
    ).setOrigin(0.5);

    // Nút CHƠI LẠI
    const restartText = this.add.text(
        500,
        350,
        "CHƠI LẠI",
        {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#333333",
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        }
    ).setOrigin(0.5);

    restartText.setInteractive();

    restartText.on("pointerdown", () => {
        gameOver = false;
        this.scene.restart();
    });

    // Dừng vật lý
    this.physics.pause();

    this.player.setAlpha(0.5);
}

