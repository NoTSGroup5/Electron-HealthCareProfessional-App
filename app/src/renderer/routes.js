export default [
    {
        path: '/',
        name: 'home',
        component: require('./components/Home/LandingPageView')
    },
    {
        path: '/done',
        name: 'done',
        component: require('./components/Done')
    },
    {
        path: '/patients',
        name: 'patients',
        component: require('components/Patient/PatientsOverview')
    },
    {
        path: '/patient/dossier',
        name: 'dossier',
        component: require('components/Patient/Dossier')
    },
    {
        path: '/settings',
        name: 'settings',
        component: require('components/Settings')
    },
    {
        path: '*',
        redirect: '/'
    }
]
