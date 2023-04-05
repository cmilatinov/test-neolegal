import form from 'assets/misc/form.json';
import { type Question } from '../assets/misc/form.types';

export function useQuestions() {
    return form.questions as Question[];
}
