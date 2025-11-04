import { ref, push } from "firebase/database";
import { db } from "../../firebase";
import type { TrialRequest } from "../../types/trialRequests";

export async function sendTrialRequest(data: TrialRequest) {
  const refPath = ref(db, "trialRequests");
  await push(refPath, {
    ...data,
    createdAt: new Date().toISOString(),
  });
}
