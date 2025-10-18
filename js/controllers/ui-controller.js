// UI制御関数

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
      } else {
        // 古いパラメータ名から新しいパラメータ名へのマッピング
        const paramMapping = {
          'eyelidAngle': 'upperEyelidAngle',
          'eyelidStrength': 'upperEyelidCoverage',
          'lowerEyelidStrength': 'lowerEyelidCoverage'
        };
        const mappedKey = paramMapping[key];
        if (mappedKey && document.getElementById(mappedKey)) {
          faceParams[mappedKey] = targetParams[key];
          document.getElementById(mappedKey).value = targetParams[key];
          document.getElementById(mappedKey + "Value").textContent = targetParams[key];
        }
      }
    }
  }
}

function updateParams() {
  // 目関連のパラメータ
  faceParams.eyeOpenness = parseFloat(
    document.getElementById("eyeOpenness").value
  );
  faceParams.pupilSize = parseFloat(document.getElementById("pupilSize").value);
  faceParams.pupilAngle = parseFloat(
    document.getElementById("pupilAngle").value
  );
  faceParams.upperEyelidAngle = parseFloat(
    document.getElementById("upperEyelidAngle").value
  );
  faceParams.upperEyelidCoverage = parseFloat(
    document.getElementById("upperEyelidCoverage").value
  );
  faceParams.lowerEyelidCoverage = parseFloat(
    document.getElementById("lowerEyelidCoverage").value
  );
  
  // 口関連のパラメータ
  faceParams.mouthCurve = parseFloat(
    document.getElementById("mouthCurve").value
  );
  faceParams.mouthHeight = parseFloat(
    document.getElementById("mouthHeight").value
  );
  faceParams.mouthWidth = parseFloat(
    document.getElementById("mouthWidth").value
  );

  // 値の表示を更新
  // 目関連のパラメータ
  document.getElementById("eyeOpennessValue").textContent =
    faceParams.eyeOpenness;
  document.getElementById("pupilSizeValue").textContent = faceParams.pupilSize;
  document.getElementById("pupilAngleValue").textContent =
    faceParams.pupilAngle;
  document.getElementById("upperEyelidAngleValue").textContent =
    faceParams.upperEyelidAngle;
  document.getElementById("upperEyelidCoverageValue").textContent =
    faceParams.upperEyelidCoverage;
  document.getElementById("lowerEyelidCoverageValue").textContent =
    faceParams.lowerEyelidCoverage;
  
  // 口関連のパラメータ
  document.getElementById("mouthCurveValue").textContent =
    faceParams.mouthCurve;
  document.getElementById("mouthHeightValue").textContent =
    faceParams.mouthHeight;
  document.getElementById("mouthWidthValue").textContent =
    faceParams.mouthWidth;
}

// イベントリスナーの設定
function setupUIListeners() {
  // 目関連のパラメータ
  document
    .getElementById("eyeOpenness")
    .addEventListener("input", updateParams);
  document.getElementById("pupilSize").addEventListener("input", updateParams);
  document.getElementById("pupilAngle").addEventListener("input", updateParams);
  document
    .getElementById("upperEyelidAngle")
    .addEventListener("input", updateParams);
  document
    .getElementById("upperEyelidCoverage")
    .addEventListener("input", updateParams);
  document
    .getElementById("lowerEyelidCoverage")
    .addEventListener("input", updateParams);
  
  // 口関連のパラメータ
  document.getElementById("mouthCurve").addEventListener("input", updateParams);
  document
    .getElementById("mouthHeight")
    .addEventListener("input", updateParams);
  document.getElementById("mouthWidth").addEventListener("input", updateParams);
}