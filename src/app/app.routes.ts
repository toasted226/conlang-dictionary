import { Routes } from '@angular/router';
import { WordsListComponent } from './words/words-list/words-list.component';
import { NoWordsComponent } from './words/no-words/no-words.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NewLanguageComponent } from './admin/new-language/new-language.component';

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
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: "languages/new",
                component: NewLanguageComponent,
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
    },
];
