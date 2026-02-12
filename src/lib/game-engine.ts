import type { ReactionStep } from '@/data/types';

export interface SlotAssignment {
  stepNumber: number;
  enzymeId?: string;
  substrateId?: string;
  productId?: string;
}

export interface ValidationResult {
  stepNumber: number;
  enzymeCorrect: boolean;
  substrateCorrect: boolean;
  productCorrect: boolean;
}

/** Validate pathway builder assignments against correct pathway data */
export function validatePathway(
  assignments: SlotAssignment[],
  correctSteps: ReactionStep[]
): { results: ValidationResult[]; score: number } {
  const results: ValidationResult[] = assignments.map((assignment) => {
    const correct = correctSteps.find((s) => s.stepNumber === assignment.stepNumber);
    if (!correct) {
      return {
        stepNumber: assignment.stepNumber,
        enzymeCorrect: false,
        substrateCorrect: false,
        productCorrect: false,
      };
    }

    return {
      stepNumber: assignment.stepNumber,
      enzymeCorrect: assignment.enzymeId === correct.enzyme.id,
      substrateCorrect: assignment.substrateId === correct.substrates[0]?.id,
      productCorrect: assignment.productId === correct.products[0]?.id,
    };
  });

  const totalSlots = results.length * 3;
  const correctSlots = results.reduce(
    (sum, r) =>
      sum +
      (r.enzymeCorrect ? 1 : 0) +
      (r.substrateCorrect ? 1 : 0) +
      (r.productCorrect ? 1 : 0),
    0
  );

  return {
    results,
    score: totalSlots > 0 ? Math.round((correctSlots / totalSlots) * 100) : 0,
  };
}

/** Score a quiz session */
export function scoreQuiz(
  answers: { questionId: string; userAnswer: string; correctAnswer: string }[]
): { correct: number; total: number; score: number } {
  const correct = answers.filter(
    (a) => a.userAnswer.trim().toLowerCase() === a.correctAnswer.trim().toLowerCase()
  ).length;
  return {
    correct,
    total: answers.length,
    score: answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0,
  };
}

/** Score matching game */
export function scoreMatching(
  totalPairs: number,
  correctPairs: number,
  incorrectAttempts: number
): number {
  if (totalPairs === 0) return 0;
  const accuracy = correctPairs / totalPairs;
  const penalty = Math.min(incorrectAttempts * 0.05, 0.3);
  return Math.round(Math.max(0, (accuracy - penalty)) * 100);
}
