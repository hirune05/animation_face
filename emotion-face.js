let faceParams = {
  pupilSize: 0.7,
  eyelidAngle: 0,
  pupilShape: 1.0,
  mouthCurve: 0,
  mouthOpen: 0,
  eyeOpenness: 1,
};

const emotions = {
  happy: {
    pupilSize: 0.5,
    eyelidAngle: -25, // 目を細める
    pupilShape: 1.0,
    mouthCurve: 20,
    mouthOpen: 0.3,
    eyeOpenness: 0.2, // ほぼ閉じた目
  },
  sad: {
    pupilSize: 0.6,
    eyelidAngle: -15, // マイナスにして外側が下がるように
    pupilShape: 0.9,
    mouthCurve: -20,
    mouthOpen: 0.1,
    eyeOpenness: 0.8,
  },
  normal: {
    pupilSize: 0.7,
    eyelidAngle: 0,
    pupilShape: 1.0,
    mouthCurve: 0,
    mouthOpen: 0,
    eyeOpenness: 1,
  },
  motivated: {
    pupilSize: 1.0,
    eyelidAngle: 25,
    pupilShape: 1.2,
    mouthCurve: 15,
    mouthOpen: 0.4,
    eyeOpenness: 1,
  },
};

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvas-container");

  // スライダーのイベントリスナーを設定
  document.getElementById("pupilSize").addEventListener("input", updateParams);
  document
    .getElementById("eyelidAngle")
    .addEventListener("input", updateParams);
  document.getElementById("pupilShape").addEventListener("input", updateParams);
  document.getElementById("mouthCurve").addEventListener("input", updateParams);
  document.getElementById("mouthOpen").addEventListener("input", updateParams);
  document
    .getElementById("eyeOpenness")
    .addEventListener("input", updateParams);
}

function draw() {
  background(255, 235, 250); // 薄いピンク色の背景

  push();
  translate(width / 2, height / 2);

  // 顔の輪郭は描かない（添付画像に合わせて）

  // 目を描画
  drawEyes();

  // 口を描画
  drawMouth();

  pop();
}

function drawEyes() {
  let eyeSpacing = width * 0.4; // 画面の横幅の40%
  let eyeSize = 120;

  // 画面の高さの60%の位置から中心までのオフセットを計算
  let eyeY = height * 0.6 - height / 2; // 中心からの相対位置

  // 左目
  push();
  translate(-eyeSpacing / 2, eyeY);
  drawEye(eyeSize, true); // 左目
  pop();

  // 右目
  push();
  translate(eyeSpacing / 2, eyeY);
  drawEye(eyeSize, false); // 右目
  pop();
}

function drawEye(size, isLeft) {
  push();
  // 左右で角度を反転させる
  let angle = isLeft ? faceParams.eyelidAngle : -faceParams.eyelidAngle;
  rotate(radians(angle));

  // 白目部分
  fill(240, 255, 240);
  stroke(0);
  strokeWeight(2);
  ellipse(0, 0, size, size);

  // 目の開き具合に応じて描画を変更
  if (faceParams.eyeOpenness <= 0.1) {
    // 完全に閉じた目（弧として描画）
    fill(255, 235, 250); // 背景と同じ色で上半分を塗りつぶす
    noStroke();
    arc(0, 0, size + 4, size + 4, PI, TWO_PI);

    // 閉じた目の線（弧）
    noFill();
    stroke(0);
    strokeWeight(3);
    arc(0, 0, size * 0.7, size * 0.4, 0, PI);
  } else {
    // 瞳（黒目）- eyeOpennessに応じて縦方向のサイズを調整
    fill(0);
    noStroke();
    let pupilWidth = size * 0.7 * faceParams.pupilSize;
    let pupilHeight =
      pupilWidth * faceParams.pupilShape * faceParams.eyeOpenness;
    ellipse(0, 0, pupilWidth, pupilHeight);

    // 光の反射（目が開いているときのみ）
    if (faceParams.eyeOpenness > 0.3) {
      fill(255);
      let highlightSize = pupilWidth * 0.2;
      ellipse(0, -pupilHeight * 0.2, highlightSize, highlightSize);
    }
  }

  // まぶたの効果（目の中に線を引いて上部を塗りつぶす）
  if (abs(angle) > 5) {
    // まぶたの線の位置を計算
    let eyelidY = -size * 0.3 * (abs(angle) / 30); // 角度に応じてまぶたの位置を調整

    // クリッピングマスクで目の円の中だけ描画
    push();
    drawingContext.save();

    // 円形のクリッピングパスを作成（少し内側にして輪郭を残す）
    drawingContext.beginPath();
    drawingContext.arc(0, 0, size / 2 - 1, 0, TWO_PI);
    drawingContext.clip();

    // まぶたの線より上を白で塗りつぶす
    fill(240, 255, 240); // 白目と同じ色
    noStroke();
    rect(-size / 2, -size / 2, size, size / 2 + eyelidY);

    // まぶたの線を描く
    stroke(0);
    strokeWeight(2);
    line(-size / 2, eyelidY, size / 2, eyelidY);

    drawingContext.restore();
    pop();
  }

  pop();
}

function drawMouth() {
  push();
  // 画面の高さの75%の位置から中心までのオフセットを計算
  let mouthY = height * 0.8 - height / 2; // 中心からの相対位置
  translate(0, mouthY);

  fill(200, 0, 0);
  noStroke();

  if (faceParams.mouthOpen > 0) {
    // 口が開いている場合
    push();
    scale(1, 1 + faceParams.mouthOpen);
    arc(0, 0, 80, 80 + faceParams.mouthCurve, 0, PI);
    pop();
  } else {
    // 口が閉じている場合
    if (faceParams.mouthCurve > 0) {
      // 笑顔
      arc(0, 0, 80, 80, 0, PI);
    } else if (faceParams.mouthCurve < 0) {
      // 悲しい顔
      arc(0, 20, 80, 80, PI, TWO_PI);
    } else {
      // 普通
      arc(0, 0, 80, 60, 0, PI);
    }
  }

  pop();
}

function setEmotion(emotionName) {
  if (emotions[emotionName]) {
    // アニメーション効果のために徐々に変化させる
    let targetParams = emotions[emotionName];

    // パラメータを更新
    for (let key in targetParams) {
      faceParams[key] = targetParams[key];

      // スライダーの値も更新
      if (document.getElementById(key)) {
        document.getElementById(key).value = targetParams[key];
        document.getElementById(key + "Value").textContent = targetParams[key];
      }
    }
  }
}

function updateParams() {
  faceParams.pupilSize = parseFloat(document.getElementById("pupilSize").value);
  faceParams.eyelidAngle = parseFloat(
    document.getElementById("eyelidAngle").value
  );
  faceParams.pupilShape = parseFloat(
    document.getElementById("pupilShape").value
  );
  faceParams.mouthCurve = parseFloat(
    document.getElementById("mouthCurve").value
  );
  faceParams.mouthOpen = parseFloat(document.getElementById("mouthOpen").value);
  faceParams.eyeOpenness = parseFloat(
    document.getElementById("eyeOpenness").value
  );

  // 値の表示を更新
  document.getElementById("pupilSizeValue").textContent = faceParams.pupilSize;
  document.getElementById("eyelidAngleValue").textContent =
    faceParams.eyelidAngle;
  document.getElementById("pupilShapeValue").textContent =
    faceParams.pupilShape;
  document.getElementById("mouthCurveValue").textContent =
    faceParams.mouthCurve;
  document.getElementById("mouthOpenValue").textContent = faceParams.mouthOpen;
  document.getElementById("eyeOpennessValue").textContent =
    faceParams.eyeOpenness;
}
