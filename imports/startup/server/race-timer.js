let startTime = 0;
let lane1FinishTime = 0;
let lane2FinishTime = 0;
let lane1TimerRunning = false;
let lane2TimerRunning = false;

export function startTimer() {

  startTime = Date.now();
  lane1TimerRunning = true;
  lane2TimerRunning = true;

  return startTime;

}

export function lane1Finish() {

  lane1FinishTime = Date.now();
  lane1TimerRunning = false;

  return lane1FinishTime;

}

export function lane2Finish() {

  lane2FinishTime = Date.now();
  lane2TimerRunning = false;

  return lane2FinishTime;

}
