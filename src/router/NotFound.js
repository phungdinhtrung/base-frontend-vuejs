export default [
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/vNotFound.vue')
    }
]