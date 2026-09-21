import {
    HandLandmarker,
    FilesetResolver,
    DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";


// ==========================================
// LẤY CÁC PHẦN TỬ HTML
// ==========================================
const loadDatasetInput =
    document.getElementById("loadDataset");

const trainModelButton =
    document.getElementById("trainModel");

const trainStatus =
    document.getElementById("trainStatus");

let model = null;

let smoothPredictions = {
    Left: null,
    Right: null
};

const SMOOTHING = 0.65;

let lastPredictionTime = 0;

loadDatasetInput.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function (e) {

                try {

                    const loadedData =
                        JSON.parse(
                            e.target.result
                        );

                    trainingData = {
                        A: loadedData.A || [],
                        B: loadedData.B || [],
                        C: loadedData.C || [],
                        D: loadedData.D || [],
                        E: loadedData.E || [],
                        F: loadedData.F || []
                        };

updateDataInfo();

trainStatus.innerText =
    "Đã tải dataset thành công!";

                } catch (error) {

                    console.error(error);

                    trainStatus.innerText =
                        "File dataset không hợp lệ!";
                }
            };

        reader.readAsText(file);
    }
);

const video =
    document.getElementById("webcam");

const canvas =
    document.getElementById("output");

const ctx =
    canvas.getContext("2d");

const statusText =
    document.getElementById("status");

const handInfo =
    document.getElementById("handInfo");

const gestureText =
    document.getElementById("gesture");

const confidenceText =
    document.getElementById("confidence");

const collectAButton =
    document.getElementById("collectA");

const collectBButton =
    document.getElementById("collectB");

const collectCButton =
    document.getElementById("collectC");

const collectDButton =
    document.getElementById("collectD");

const collectEButton =
    document.getElementById("collectE");

const collectFButton =
    document.getElementById("collectF");

const dataInfo =
    document.getElementById("dataInfo");

const saveDataButton =
    document.getElementById("saveData");


// ==========================================
// BIẾN CHÍNH
// ==========================================

let handLandmarker = null;

let currentLandmarks = null;

let isCollecting = false;

const LABELS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
];

// Dữ liệu huấn luyện
let trainingData = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    //G: [],
    //H: [],
    //I: [],
    //K: [],
    //L: [],
    //M: [],
    //N: [],
    //O: [],
    //P: [],
    //Q: [],
    //R: [],
    //S: [],
    //T: [],
    //U: [],
    //V: [],
    //X: []
};


// ==========================================
// KHỞI TẠO MEDIAPIPE
// ==========================================

async function createHandLandmarker() {

    statusText.innerText =
        "Đang tải hệ thống nhận diện tay...";

    const vision =
        await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

    handLandmarker =
        await HandLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
                },

                runningMode: "VIDEO",

                numHands: 2
            }
        );

    statusText.innerText =
        "Hand Tracking đã sẵn sàng!";

    startCamera();
}


// ==========================================
// MỞ CAMERA
// ==========================================

async function startCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

        video.srcObject = stream;

        video.addEventListener(
            "loadeddata",
            predictWebcam
        );

    } catch (error) {

        console.error(error);

        statusText.innerText =
            "Không mở được camera!";
    }
}

// ==========================================
// NHẬN DIỆN A / B / C
// ==========================================

function predictGesture(
    landmarks,
    handName
) {

    if (!model) {
        return null;
    }


    // Chuẩn hóa landmark
    const normalized =
        normalizeLandmarks(landmarks);


    // Chuyển 21 điểm thành 63 số
    const sample = [];

    for (const point of normalized) {

        sample.push(
            point.x,
            point.y,
            point.z
        );
    }


    const input =
        tf.tensor2d(
            [sample],
            [1, 63]
        );


    const prediction =
        model.predict(input);


    const probabilities =
        prediction.dataSync();

        const smoothed =
    smoothPrediction(
        handName,
        probabilities
    );

    input.dispose();
    prediction.dispose();


    // Tìm kết quả cao nhất
    let bestIndex = 0;

    for (
        let i = 1;
        i < smoothed.length;
        i++
    ) {

        if (
            smoothed[i] >
            smoothed[bestIndex]
        ) {

            bestIndex = i;
        }
    }


    const confidence =
        smoothed[bestIndex];


    return {

        letter:
            LABELS[bestIndex],

        confidence:
            confidence
    };
}
function smoothPrediction(
    handName,
    probabilities
) {

    if (!smoothPredictions[handName]) {

        smoothPredictions[handName] =
            Array.from(probabilities);

    } else {

        for (
            let i = 0;
            i < probabilities.length;
            i++
        ) {

            smoothPredictions[handName][i] =
                SMOOTHING *
                smoothPredictions[handName][i]
                +
                (1 - SMOOTHING) *
                probabilities[i];
        }
    }


    return smoothPredictions[handName];
}
// ==========================================
// XỬ LÝ CAMERA
// ==========================================

function predictWebcam() {

    // ======================================
    // MEDIAPIPE NHẬN DIỆN FRAME HIỆN TẠI
    // ======================================

    const results =
        handLandmarker.detectForVideo(
            video,
            performance.now()
        );


    // Xóa hình vẽ frame trước
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ======================================
    // CÓ BÀN TAY
    // ======================================

    if (
        results.landmarks &&
        results.landmarks.length > 0
    ) {

        const drawingUtils =
            new DrawingUtils(ctx);


        let info =
            "Số bàn tay: " +
            results.landmarks.length +
            "<br>";


        // Kết quả nhận diện của từng tay
        const handPredictions = [];


        // ==================================
        // DUYỆT TỪNG BÀN TAY
        // ==================================

        for (
            let i = 0;
            i < results.landmarks.length;
            i++
        ) {

            const landmarks =
                results.landmarks[i];

                let handName =
            "Left";

if (
    results.handedness &&
    results.handedness[i]
) {

    handName =
        results.handedness[i][0]
            .categoryName;
}


            // ==================================
            // TAY ĐẦU TIÊN DÙNG THU DATASET
            // ==================================

            if (i === 0) {

                currentLandmarks =
                    landmarks;
            }


            // ==================================
            // MODEL NHẬN DIỆN TỪNG TAY
            // ==================================

            if (model) {

                const result =
                    predictGesture(
                        landmarks,
                        handName
                    );


                if (result) {

                    handPredictions.push(
                        result
                    );
                }
            }


            // ==================================
            // VẼ KHUNG XƯƠNG
            // ==================================

            drawingUtils.drawConnectors(
    landmarks,
    HandLandmarker.HAND_CONNECTIONS,
    {
        color: "#ffffff",
        lineWidth: 1
    }
);

drawingUtils.drawLandmarks(
    landmarks,
    {
        color: "#ffffff",
        fillColor: "#fb0000",
        lineWidth: 0.5,
        radius: 2
    }
);


            // ==================================
            // HIỂN THỊ SỐ LANDMARK
            // ==================================

            for (
                let j = 0;
                j < landmarks.length;
                j++
            ) {

                const point =
                    landmarks[j];


                ctx.fillStyle =
                    "white";

                ctx.font =
                    "10px Arial";


                ctx.fillText(
                    j,
                    point.x * canvas.width,
                    point.y * canvas.height
                );
            }


            // ==================================
            // LEFT / RIGHT
            // ==================================

            if (
                results.handedness &&
                results.handedness[i]
            ) {

                const hand =
                    results.handedness[i][0];


                info +=
                    "Tay " +
                    (i + 1) +
                    ": " +
                    hand.categoryName +
                    "<br>";
            }
        }


        // ======================================
        // HIỂN THỊ A / B / C
        // ======================================

        if (
            model &&
            handPredictions.length > 0
        ) {

            const letters =
                handPredictions.map(
                    result =>
                        result.letter
                );


            gestureText.innerText =
                letters.join(" | ");


            const confidences =
                handPredictions.map(
                    result =>
                        (
                            result.confidence *
                            100
                        ).toFixed(1) +
                        "%"
                );


            confidenceText.innerText =
                confidences.join(" | ");
        }


        handInfo.innerHTML =
            info;

    } else {

        // ======================================
        // KHÔNG CÓ BÀN TAY
        // ======================================

        currentLandmarks =
            null;


        // Reset smoothing
        smoothPredictions = {
        Left: null,
        Right: null
        };


        handInfo.innerHTML =
            "Chưa phát hiện bàn tay";


        gestureText.innerText =
            "?";


        confidenceText.innerText =
            "0%";
    }


    // ======================================
    // FRAME TIẾP THEO
    // ======================================

    requestAnimationFrame(
        predictWebcam
    );
}


// ==========================================
// CHUẨN HÓA LANDMARK
// ==========================================

function normalizeLandmarks(landmarks) {

    // Landmark 0 = cổ tay
    const wrist =
        landmarks[0];


    // --------------------------------------
    // BƯỚC 1
    // Đưa cổ tay về tọa độ (0, 0, 0)
    // --------------------------------------

    const centered =
        landmarks.map(point => {

            return {
                x: point.x - wrist.x,
                y: point.y - wrist.y,
                z: point.z - wrist.z
            };

        });


    // --------------------------------------
    // BƯỚC 2
    // Tìm khoảng cách lớn nhất
    // để chuẩn hóa kích thước bàn tay
    // --------------------------------------

    let maxDistance = 0;

    for (const point of centered) {

        const distance =
            Math.sqrt(
                point.x * point.x +
                point.y * point.y +
                point.z * point.z
            );

        if (distance > maxDistance) {

            maxDistance =
                distance;
        }
    }


    if (maxDistance === 0) {

        maxDistance = 1;
    }


    // --------------------------------------
    // BƯỚC 3
    // Chuẩn hóa kích thước
    // --------------------------------------

    const normalized =
        centered.map(point => {

            return {
                x: point.x / maxDistance,
                y: point.y / maxDistance,
                z: point.z / maxDistance
            };

        });


    return normalized;
}


// ==========================================
// THU MỘT MẪU
// ==========================================

function collectSample(letter) {

    if (!currentLandmarks) {
        return false;
    }


    // Chuẩn hóa trước khi lưu
    const normalized =
        normalizeLandmarks(
            currentLandmarks
        );


    // Chuyển thành mảng số
    // 21 điểm × 3 tọa độ = 63 giá trị

    const sample = [];

    for (const point of normalized) {

        sample.push(
            point.x,
            point.y,
            point.z
        );
    }


    trainingData[letter].push(
        sample
    );


    updateDataInfo();

    return true;
}


// ==========================================
// THU 50 MẪU
// ==========================================

async function collectMultipleSamples(letter) {

    if (isCollecting) {

        alert(
            "Đang thu dữ liệu, hãy chờ một chút!"
        );

        return;
    }


    if (!currentLandmarks) {

        alert(
            "Hãy đưa bàn tay vào camera trước!"
        );

        return;
    }


    isCollecting = true;


    statusText.innerText =
        "Đang thu chữ " +
        letter +
        "...";


    let collected = 0;


    while (collected < 50) {

        if (currentLandmarks) {

            const success =
                collectSample(letter);

            if (success) {
                collected++;
            }
        }


        // Mỗi 60ms lấy một mẫu
        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    60
                )
        );
    }


    statusText.innerText =
        "Đã thu xong 50 mẫu chữ " +
        letter;


    isCollecting = false;
}


// ==========================================
// CẬP NHẬT SỐ MẪU
// ==========================================

function updateDataInfo() {

    const text =
        LABELS.map(
            letter =>
                letter +
                ": " +
                trainingData[letter].length
        ).join(" | ");

    dataInfo.innerText =
        text;
}

// ==========================================
// LƯU DATASET RA FILE JSON
// ==========================================

function saveTrainingData() {

    const totalSamples =
        trainingData.A.length +
        trainingData.B.length +
        trainingData.C.length;


    if (totalSamples === 0) {

        alert(
            "Chưa có dữ liệu để lưu!"
        );

        return;
    }


    // Chuyển dữ liệu thành JSON
    const jsonData =
        JSON.stringify(
            trainingData,
            null,
            2
        );


    // Tạo file
    const blob =
        new Blob(
            [jsonData],
            {
                type: "application/json"
            }
        );


    // Tạo đường dẫn tải file
    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "hand-dataset.json";


    link.click();


    URL.revokeObjectURL(url);


    statusText.innerText =
        "Đã lưu dataset!";
}
// ==========================================
// TẠO MODEL MACHINE LEARNING
// ==========================================

function createModel() {

    const newModel = tf.sequential();


    // INPUT: 63 giá trị
    newModel.add(
        tf.layers.dense({
            inputShape: [63],
            units: 64,
            activation: "relu"
        })
    );


    newModel.add(
        tf.layers.dense({
            units: 32,
            activation: "relu"
        })
    );


    // OUTPUT:
    // 0 = A
    // 1 = B
    // 2 = C
    newModel.add(
        tf.layers.dense({
            units: 6,
            activation: "softmax"
        })
    );


    newModel.compile({

        optimizer:
            tf.train.adam(0.001),

        loss:
            "categoricalCrossentropy",

        metrics:
            ["accuracy"]
    });


    return newModel;
}

// ==========================================
// CHUYỂN DATASET THÀNH TENSOR
// ==========================================

function prepareTrainingData() {

    const inputs = [];
    const labels = [];

    for (
        let labelIndex = 0;
        labelIndex < LABELS.length;
        labelIndex++
    ) {

        const letter =
            LABELS[labelIndex];

        for (
            const sample of trainingData[letter]
        ) {

            inputs.push(sample);

            // Tạo:
            // A = [1,0,0,0,0,0]
            // B = [0,1,0,0,0,0]
            // C = [0,0,1,0,0,0]
            // D = [0,0,0,1,0,0]
            // E = [0,0,0,0,1,0]
            // F = [0,0,0,0,0,1]

            const oneHot =
                new Array(
                    LABELS.length
                ).fill(0);

            oneHot[labelIndex] = 1;

            labels.push(
                oneHot
            );
        }
    }

    const xs =
        tf.tensor2d(inputs);

    const ys =
        tf.tensor2d(labels);

    return {
        xs,
        ys
    };
}

// ==========================================
// HUẤN LUYỆN MODEL
// ==========================================

async function trainHandModel() {

    const missingLetters =
    LABELS.filter(
        letter =>
            trainingData[letter].length === 0
    );

if (missingLetters.length > 0) {

    alert(
        "Chưa có dữ liệu cho: " +
        missingLetters.join(", ")
    );

    return;
}


    trainModelButton.disabled =
        true;


    trainStatus.innerText =
        "Đang chuẩn bị dữ liệu...";


    // Tạo model mới
    model =
        createModel();


    // Chuẩn bị dữ liệu
    const {
        xs,
        ys
    } = prepareTrainingData();


    trainStatus.innerText =
        "Đang huấn luyện...";


    try {

        await model.fit(
            xs,
            ys,
            {
                epochs: 50,

                batchSize: 16,

                shuffle: true,

                validationSplit: 0.2,

                callbacks: {

                    onEpochEnd:
                        async function (
                            epoch,
                            logs
                        ) {

                            const accuracy =
                                logs.acc !== undefined
                                    ? logs.acc
                                    : logs.accuracy;

                            const valAccuracy =
                                logs.val_acc !== undefined
                                    ? logs.val_acc
                                    : logs.val_accuracy;


                            let text =
                                "Epoch " +
                                (epoch + 1) +
                                "/50";


                            if (
                                accuracy !== undefined
                            ) {

                                text +=
                                    " | Accuracy: " +
                                    (
                                        accuracy * 100
                                    ).toFixed(1) +
                                    "%";
                            }


                            if (
                                valAccuracy !== undefined
                            ) {

                                text +=
                                    " | Validation: " +
                                    (
                                        valAccuracy * 100
                                    ).toFixed(1) +
                                    "%";
                            }


                            trainStatus.innerText =
                                text;


                            // Cho trình duyệt cập nhật giao diện
                            await tf.nextFrame();
                        }
                }
            }
        );


        trainStatus.innerText =
            "Huấn luyện hoàn tất!";


    } catch (error) {

        console.error(error);

        trainStatus.innerText =
            "Có lỗi khi huấn luyện model!";

    } finally {

        // Giải phóng tensor
        xs.dispose();
        ys.dispose();

        trainModelButton.disabled =
            false;
    }
}

trainModelButton.addEventListener(
    "click",
    function () {

        trainHandModel();
    }
);

// ==========================================
// CÁC NÚT THU DỮ LIỆU
// ==========================================

collectAButton.addEventListener(
    "click",
    function () {

        collectMultipleSamples("A");
    }
);


collectBButton.addEventListener(
    "click",
    function () {

        collectMultipleSamples("B");
    }
);


collectCButton.addEventListener(
    "click",
    function () {

        collectMultipleSamples("C");
    }
);

collectDButton.addEventListener(
    "click",
    function () {
        collectMultipleSamples("D");
    }
);

collectEButton.addEventListener(
    "click",
    function () {
        collectMultipleSamples("E");
    }
);

collectFButton.addEventListener(
    "click",
    function () {
        collectMultipleSamples("F");
    }
);
saveDataButton.addEventListener(
    "click",
    function () {

        saveTrainingData();
    }
);


// ==========================================
// HIỂN THỊ NHẬN DIỆN
// ==========================================


gestureText.innerText =
    "Chưa huấn luyện";


// ==========================================
// KHỞI ĐỘNG
// ==========================================

createHandLandmarker();