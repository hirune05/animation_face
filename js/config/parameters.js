// 顔のパラメータ定義
let faceParams = {
  // 目関連のパラメータ
  eyeOpenness: 1,        // 目の開き具合（0=閉じる, 1=完全に開く）
  pupilSize: 0.7,        // 瞳の大きさ（0.3-1.0）
  pupilAngle: 0,         // 瞳の回転角度（-30〜30）
  upperEyelidAngle: 0,   // 上瞼の傾き角度（-30〜30）
  upperEyelidCoverage: 0, // 上瞼の覆い具合（0-0.3）
  lowerEyelidCoverage: 0, // 下瞼の覆い具合（0-0.3）
  
  // 口関連のパラメータ
  mouthCurve: 0,         // 口角の上下（-30〜60）
  mouthHeight: 0,        // 口の開き具合（0-3）
  mouthWidth: 1,         // 口の横幅倍率（0.5-4）
};

// 感情プリセット定義
const emotions = {
  happy: {
    // 目関連のパラメータ
    eyeOpenness: 0.2, // ほぼ閉じた目
    pupilSize: 0.5,
    pupilAngle: -10, // 瞳が少し下向き
    upperEyelidAngle: -25, // 上瞼が下に傾く（優しい目）
    upperEyelidCoverage: 0, // 上瞼なし
    lowerEyelidCoverage: 0.1, // 下瞼は少し出ている
    
    // 口関連のパラメータ
    mouthCurve: 20,
    mouthHeight: 0.3, // 口が少し開いている
    mouthWidth: 1.2, // 口の横幅が少し大きい
  },
  sad: {
    // 目関連のパラメータ
    eyeOpenness: 0.8,
    pupilSize: 0.6,
    pupilAngle: -5, // 目自体はわずかに下向き
    upperEyelidAngle: -15, // 上瞼が下に傾く（悲しい目）
    upperEyelidCoverage: 0.18, // 上瞼が中程度に出ている
    lowerEyelidCoverage: 0.15, // 下瞼も中程度に出ている
    
    // 口関連のパラメータ
    mouthCurve: -20,
    mouthHeight: 0.1, // 口がわずかに開いている
    mouthWidth: 0.8, // 口の横幅が小さい
  },
  normal: {
    // 目関連のパラメータ
    eyeOpenness: 1,
    pupilSize: 0.9,
    pupilAngle: 0,
    upperEyelidAngle: 0,
    upperEyelidCoverage: 0, // 上瞼は出ていない
    lowerEyelidCoverage: 0, // 下瞼も出ていない
    
    // 口関連のパラメータ
    mouthCurve: 0,
    mouthHeight: 0, // 口が閉じている
    mouthWidth: 1, // 標準の横幅
  },
  motivated: {
    // 目関連のパラメータ
    eyeOpenness: 1,
    pupilSize: 1.0,
    pupilAngle: 10, // 目自体は少し上向き
    upperEyelidAngle: 25, // 上瞼が上に傾く（やる気目）
    upperEyelidCoverage: 0.15, // 上瞼が少し出ている
    lowerEyelidCoverage: 0.05, // 下瞼はわずかに出ている
    
    // 口関連のパラメータ
    mouthCurve: 15,
    mouthHeight: 0.4, // 口が適度に開いている
    mouthWidth: 1.1, // 口の横幅が少し大きい
  },
  angry: {
    // 目関連のパラメータ
    eyeOpenness: 0.9,
    pupilSize: 0.8,
    pupilAngle: 5, // 目自体はわずかに上向き
    upperEyelidAngle: 20, // 上瞼が上に傾く（釣り目）
    upperEyelidCoverage: 0.15, // 少し上瞼が出て険しい表情
    lowerEyelidCoverage: 0.2, // 下瞼も出て険しさを強調
    
    // 口関連のパラメータ
    mouthCurve: -15, // 口角が下がる
    mouthHeight: 0.3, // 口が少し開いている（歯を食いしばった感じ）
    mouthWidth: 0.9, // 口の横幅が少し小さい
  },
  laughing: {
    // 目関連のパラメータ
    eyeOpenness: 0.25, // 目をかなり細める
    pupilSize: 0.65,
    pupilAngle: -10, // 瞳が少し下向き
    upperEyelidAngle: -20, // 上瞼が大きく下に傾く（笑い目）
    upperEyelidCoverage: 0,
    lowerEyelidCoverage: 0.2, // 下瞼も出て笑い目になる
    
    // 口関連のパラメータ
    mouthCurve: 40, // 口角が最大限に上がる
    mouthHeight: 3, // 口を大きく開ける
    mouthWidth: 4, // 口の横幅が最大
  },
};