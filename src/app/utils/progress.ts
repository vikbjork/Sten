const KEY = "stenkoll_progress_v3";

export interface ProgressData {
  visited: Record<string, number>;
  quizScores: number[];
  stoneScores: number[];
  offertstodChecked: string[];
  kundanalysAnswers: Record<string, string>;
  completedAt: Record<string, string>;
}

const DEFAULT: ProgressData = {
  visited: {},
  quizScores: [],
  stoneScores: [],
  offertstodChecked: [],
  kundanalysAnswers: {},
  completedAt: {},
};

export function getProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch { return { ...DEFAULT }; }
}

export function saveProgress(data: ProgressData) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { }
}

export function recordVisit(section: string) {
  const p = getProgress();
  p.visited[section] = (p.visited[section] ?? 0) + 1;
  if (!p.completedAt[section]) p.completedAt[section] = new Date().toISOString();
  saveProgress(p);
}

export function recordQuizScore(pct: number) {
  const p = getProgress();
  p.quizScores = [...p.quizScores, pct].slice(-20);
  saveProgress(p);
}

export function recordStoneScore(pct: number) {
  const p = getProgress();
  p.stoneScores = [...p.stoneScores, pct].slice(-20);
  saveProgress(p);
}

export function getBestScore(section: "quiz" | "stone"): number {
  const p = getProgress();
  const arr = section === "quiz" ? p.quizScores : p.stoneScores;
  return arr.length ? Math.max(...arr) : 0;
}

export function getModuleProgress(): Record<string, number> {
  const p = getProgress();
  const bestQuiz = p.quizScores.length ? Math.max(...p.quizScores) : 0;
  const bestStone = p.stoneScores.length ? Math.max(...p.stoneScores) : 0;
  const kundPct = Math.min(100, Math.round((Object.keys(p.kundanalysAnswers).length / 8) * 100));
  const offPct = Math.min(100, Math.round((p.offertstodChecked.length / 20) * 100));

  return {
    nyborjarvag:   p.visited["nyborjarvag"]   ? Math.min(100, (p.visited["nyborjarvag"] ?? 0) * 20) : 0,
    materialskola: p.visited["materialskola"]  ? 100 : 0,
    kantprofiler:  p.visited["kantprofiler"]   ? 100 : 0,
    kundanalys:    kundPct,
    offertstod:    offPct,
    saljtraning:   p.visited["saljtraning"]    ? 100 : 0,
    quiz:          bestQuiz,
    stonetest:     bestStone,
    progress:      p.visited["progress"]       ? 100 : 0,
  };
}

export function getOverallProgress(): number {
  const m = getModuleProgress();
  const vals = Object.values(m);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
