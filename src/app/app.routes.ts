import { Routes } from '@angular/router';
import { resolveTitle, WordsListComponent } from './words/words-list/words-list.component';
import { NoWordsComponent } from './words/no-words/no-words.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NewLanguageComponent } from './admin/new-language/new-language.component';
import { EditLanguageComponent } from './admin/edit-language/edit-language.component';
import { NewWordComponent } from './admin/new-word/new-word.component';
import { EditWordComponent } from './admin/edit-word/edit-word.component';

export const routes: Routes = [
    {
        path: "",
        component: NoWordsComponent,
        title: "No language selected",
    },
    {
        path: "languages/:languageId",
        component: WordsListComponent,
        title: resolveTitle,
    },
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: "languages/new",
                component: NewLanguageComponent,
            },
            {
                path: "languages/:languageId/edit",
                component: EditLanguageComponent,
            },
            {
                path: "languages/:languageId/words/new",
                component: NewWordComponent,
            },
            {
                path: "languages/:languageId/words/:wordId/edit",
                component: EditWordComponent,
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
    },
];
