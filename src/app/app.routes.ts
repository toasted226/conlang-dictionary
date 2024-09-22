import { Routes } from '@angular/router';
import { WordsListComponent } from './words/words-list/words-list.component';
import { NoWordsComponent } from './words/no-words/no-words.component';
import { LoginComponent } from './auth/login/login.component';
import { AddLanguageComponent } from './admin/add-language/add-language.component';

export const routes: Routes = [
    {
        path: "",
        component: NoWordsComponent,
        title: "No language selected",
    },
    {
        path: "languages/:languageId",
        component: WordsListComponent,
    },
    {
        path: "admin/languages/add",
        component: AddLanguageComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
];
