import { Routes } from '@angular/router';
import { WordsListComponent } from './words/words-list/words-list.component';
import { NoWordsComponent } from './words/no-words/no-words.component';

export const routes: Routes = [
    {
        path: "",
        component: NoWordsComponent,
        title: "No language selected",
    },
    {
        path: "languages/:languageId",
        component: WordsListComponent,
    }
];
