import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import VueEditNote from '@/views/VueEditNote.vue';
import ViewAuth from '@/views/ViewAuth.vue';

const routes = [
    {
        path: '/',
        name: 'notes',
        component: ViewNotes 
    },
    {
        path: '/editNote/:id',
        name: 'edit-note',
        component: VueEditNote
    },
    {
        path: '/stats',
        name: 'stats',
        component: ViewStats
    },
    {
        path: '/auth',
        name: 'auth',
        component: ViewAuth
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;