import { QuestionGroup } from './question-group';
import { Variant } from './variant';

export type TestResults = {
  id?: number;
  dateOfResults: string;
  userId?: string;
  testId: number;
  chosenVariants: Variant[];
  results?: QuestionGroup[];
};
