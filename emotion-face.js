let faceParams = {
  pupilSize: 0.7,
  pupilAngle: 0,
  eyelidAngle: 0,
  mouthCurve: 0,
  mouthHeight: 0, // 口の開き具合（縦方向）
  mouthWidth: 1, // 口の横幅のスケール
  eyeOpenness: 1,
  eyelidStrength: 0,
  lowerEyelidStrength: 0,
};

const emotions = {
  happy: {
    pupilSize: 0.5,
    pupilAngle: -10, // 瞳が少し下向き
    eyelidAngle: -25, // 瞼が下に傾く（優しい目）
    mouthCurve: 20,
    mouthHeight: 0.3, // 口が少し開いている
    mouthWidth: 1.2, // 口の横幅が少し大きい
    eyeOpenness: 0.2, // ほぼ閉じた目
    eyelidStrength: 0, // 瞼なし
    lowerEyelidStrength: 0.1, // 下瞼は少し出ている
  },
  sad: {
    pupilSize: 0.6,
    pupilAngle: -5, // 目自体はわずかに下向き
    eyelidAngle: -15, // 瞼が下に傾く（悲しい目）
    pupilShape: 0.9,
    mouthCurve: -20,
    mouthHeight: 0.1, // 口がわずかに開いている
    mouthWidth: 0.8, // 口の横幅が小さい
    eyeOpenness: 0.8,
    eyelidStrength: 0.18, // 瞼が中程度に出ている
    lowerEyelidStrength: 0.15, // 下瞼も中程度に出ている
  },
  normal: {
    pupilSize: 0.9,
    pupilAngle: 0,
    eyelidAngle: 0,
    mouthCurve: 0,
    mouthHeight: 0, // 口が閉じている
    mouthWidth: 1, // 標準の横幅
    eyeOpenness: 1,
    eyelidStrength: 0, // 瞼は出ていない
    lowerEyelidStrength: 0, // 下瞼も出ていない
  },
  motivated: {
    pupilSize: 1.0,
    pupilAngle: 10, // 目自体は少し上向き
    eyelidAngle: 25, // 瞼が上に傾く（やる気目）
    mouthCurve: 15,
    mouthHeight: 0.4, // 口が適度に開いている
    mouthWidth: 1.1, // 口の横幅が少し大きい
    eyeOpenness: 1,
    eyelidStrength: 0.15, // 瞼が少し出ている
    lowerEyelidStrength: 0.05, // 下瞼はわずかに出ている
  },
  angry: {
    pupilSize: 0.8,
    pupilAngle: 5, // 目自体はわずかに上向き
    eyelidAngle: 20, // 瞼が上に傾く（釣り目）
    mouthCurve: -15, // 口角が下がる
    mouthHeight: 0.3, // 口が少し開いている（歯を食いしばった感じ）
    mouthWidth: 0.9, // 口の横幅が少し小さい
    eyeOpenness: 0.9,
    eyelidStrength: 0.15, // 少し瞼が出て険しい表情
    lowerEyelidStrength: 0.2, // 下瞼も出て険しさを強調
  },
  laughing: {
    pupilSize: 0.65,
    pupilAngle: -10, // 瞳が少し下向き
    eyelidAngle: -20, // 瞼が大きく下に傾く（笑い目）
    mouthCurve: 40, // 口角が最大限に上がる
    mouthHeight: 3, // 口を大きく開ける
    mouthWidth: 4, // 口の横幅が最大
    eyeOpenness: 0.25, // 目をかなり細める
    eyelidStrength: 0,
    lowerEyelidStrength: 0.2, // 下瞼も出て笑い目になる
  },
};

function setup() {
  let canvas = createCanvas(540, 360);
  canvas.parent("canvas-container");

  // スライダーのイベントリスナーを設定
  document.getElementById("pupilSize").addEventListener("input", updateParams);
  document.getElementById("pupilAngle").addEventListener("input", updateParams);
  document
    .getElementById("eyelidAngle")
    .addEventListener("input", updateParams);
  document.getElementById("mouthCurve").addEventListener("input", updateParams);
  document
    .getElementById("mouthHeight")
    .addEventListener("input", updateParams);
  document.getElementById("mouthWidth").addEventListener("input", updateParams);
  document
    .getElementById("eyeOpenness")
    .addEventListener("input", updateParams);
  document
    .getElementById("eyelidStrength")
    .addEventListener("input", updateParams);
  document
    .getElementById("lowerEyelidStrength")
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
  let eyeSpacing = width * 0.42; // 画面の横幅の40%
  let eyeSize = 120;

  // 目を画面の中央に配置
  let eyeY = 0; // 中心からの相対位置

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
    push();
    let pupilAngle = isLeft ? faceParams.pupilAngle : -faceParams.pupilAngle;
    rotate(radians(pupilAngle));

    fill(0);
    noStroke();
    let pupilWidth = size * 0.7 * faceParams.pupilSize;
    let pupilHeight = pupilWidth * faceParams.eyeOpenness;
    ellipse(0, 0, pupilWidth, pupilHeight);

    // 光の反射（目が開いているときのみ）
    if (faceParams.eyeOpenness > 0.3) {
      fill(255);
      let highlightSize = pupilWidth * 0.2;
      ellipse(0, -pupilHeight * 0.2, highlightSize, highlightSize);
    }

    pop();
  }

  // まぶたの効果（目の中に線を引いて上部を塗りつぶす）
  if (abs(faceParams.eyelidAngle) > 0 || faceParams.eyelidStrength > 0) {
    // まぶたの線の位置を計算（出具合のみで決定）
    let eyelidY = -size * 0.5 + size * 1.2 * faceParams.eyelidStrength; // 出具合による位置

    // クリッピングマスクで目の円の中だけ描画
    push();
    drawingContext.save();

    // 円形のクリッピングパスを作成（少し内側にして輪郭を残す）
    drawingContext.beginPath();
    drawingContext.arc(0, 0, size / 2 - 1, 0, TWO_PI);
    drawingContext.clip();

    // 瞼の角度に応じて傾いた瞼を描画
    push();
    let lidAngle = isLeft ? faceParams.eyelidAngle : -faceParams.eyelidAngle;
    rotate(radians(lidAngle * 0.5)); // 瞼の角度

    // まぶたの線より上を白で塗りつぶす
    fill(240, 255, 240); // 白目と同じ色
    noStroke();
    rect(-size, -size, size * 2, size + eyelidY);

    // まぶたの線を描く
    stroke(0);
    strokeWeight(2);
    line(-size, eyelidY, size, eyelidY);

    pop();

    drawingContext.restore();
    pop();
  }

  // 下瞼を描画
  if (faceParams.lowerEyelidStrength > 0) {
    push();

    // 下瞼の位置をパラメータで調整
    let lowerEyelidY = size * 0.5 - size * faceParams.lowerEyelidStrength;
    let arcHeight = size * 0.2 + size * faceParams.lowerEyelidStrength * 0.3;

    // まず目の輪郭の下部分をピンクで上書き（下瞼の弧から下の部分）
    stroke(255, 235, 250); // 背景と同じピンク色
    strokeWeight(3);
    noFill();

    // 目の円の下部分を描画（下瞼の位置より少し上から下）
    let startAngle = asin((lowerEyelidY - 5) / (size / 2));
    if (!isNaN(startAngle)) {
      arc(0, 0, size, size, startAngle, PI - startAngle);
    }

    // クリッピングマスクを設定して目の中だけ描画
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(0, 0, size / 2 - 1, 0, TWO_PI);
    drawingContext.clip();

    // 下瞼から下の部分をピンクで塗りつぶす
    fill(255, 235, 250); // 背景と同じピンク色
    noStroke();
    beginShape();
    // 弧の開始点（左端）
    vertex(-size * 0.35, lowerEyelidY);
    // 弧に沿って描画
    for (let angle = PI; angle <= TWO_PI; angle += 0.1) {
      let x = cos(angle) * size * 0.35;
      let y = lowerEyelidY + sin(angle) * arcHeight * 0.5;
      vertex(x, y);
    }
    // 下端まで塗りつぶす
    vertex(size * 0.35, size);
    vertex(-size * 0.35, size);
    endShape(CLOSE);

    // 下瞼の線を描画（上向きの弧）
    stroke(0);
    strokeWeight(2);
    noFill();
    arc(0, lowerEyelidY, size * 0.7, arcHeight, PI, TWO_PI);

    drawingContext.restore();
    pop();
  }

  pop();
}

function drawMouth() {
  push();
  // 目との相対位置を保ちながら配置
  let mouthY = height * 0.26; // 中心からの相対位置
  translate(0, mouthY);

  // 口を描画
  stroke(200, 0, 0);
  strokeWeight(4);
  noFill();

  // 口の基本的な幅と高さ
  let mouthWidth = 80 * faceParams.mouthWidth;
  let mouthHeight = 10;

  // 口角の上がり具合（-30〜30）
  let cornerLift = faceParams.mouthCurve;

  // 口の縦方向の開き具合を調整
  if (faceParams.mouthHeight > 0) {
    mouthHeight = mouthHeight + faceParams.mouthHeight * 40;
  }

  // ベジェ曲線で口を描画
  beginShape();

  // 左端
  let leftX = -mouthWidth / 2;
  let leftY = -cornerLift;

  // 右端
  let rightX = mouthWidth / 2;
  let rightY = -cornerLift;

  // 中央
  let centerY = cornerLift * 0.5;

  // 上唇
  vertex(leftX, leftY);
  bezierVertex(
    leftX + mouthWidth * 0.25,
    centerY - mouthHeight / 2,
    rightX - mouthWidth * 0.25,
    centerY - mouthHeight / 2,
    rightX,
    rightY
  );

  // 口が開いている場合は下唇も描く
  if (faceParams.mouthHeight > 0) {
    bezierVertex(
      rightX - mouthWidth * 0.25,
      centerY + mouthHeight / 2,
      leftX + mouthWidth * 0.25,
      centerY + mouthHeight / 2,
      leftX,
      leftY
    );
    endShape(CLOSE);

    // 口の中を塗りつぶす
    fill(200, 0, 0);
    noStroke();
    beginShape();
    vertex(leftX, leftY);
    bezierVertex(
      leftX + mouthWidth * 0.25,
      centerY - mouthHeight / 2,
      rightX - mouthWidth * 0.25,
      centerY - mouthHeight / 2,
      rightX,
      rightY
    );
    bezierVertex(
      rightX - mouthWidth * 0.25,
      centerY + mouthHeight / 2,
      leftX + mouthWidth * 0.25,
      centerY + mouthHeight / 2,
      leftX,
      leftY
    );
    endShape(CLOSE);
  } else {
    endShape();
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
  faceParams.pupilAngle = parseFloat(
    document.getElementById("pupilAngle").value
  );
  faceParams.eyelidAngle = parseFloat(
    document.getElementById("eyelidAngle").value
  );
  faceParams.mouthCurve = parseFloat(
    document.getElementById("mouthCurve").value
  );
  faceParams.mouthHeight = parseFloat(
    document.getElementById("mouthHeight").value
  );
  faceParams.mouthWidth = parseFloat(
    document.getElementById("mouthWidth").value
  );
  faceParams.eyeOpenness = parseFloat(
    document.getElementById("eyeOpenness").value
  );
  faceParams.eyelidStrength = parseFloat(
    document.getElementById("eyelidStrength").value
  );
  faceParams.lowerEyelidStrength = parseFloat(
    document.getElementById("lowerEyelidStrength").value
  );

  // 値の表示を更新
  document.getElementById("pupilSizeValue").textContent = faceParams.pupilSize;
  document.getElementById("pupilAngleValue").textContent =
    faceParams.pupilAngle;
  document.getElementById("eyelidAngleValue").textContent =
    faceParams.eyelidAngle;
  document.getElementById("mouthCurveValue").textContent =
    faceParams.mouthCurve;
  document.getElementById("mouthHeightValue").textContent =
    faceParams.mouthHeight;
  document.getElementById("mouthWidthValue").textContent =
    faceParams.mouthWidth;
  document.getElementById("eyeOpennessValue").textContent =
    faceParams.eyeOpenness;
  document.getElementById("eyelidStrengthValue").textContent =
    faceParams.eyelidStrength;
  document.getElementById("lowerEyelidStrengthValue").textContent =
    faceParams.lowerEyelidStrength;
}
