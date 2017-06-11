export default [
    {
        path: '/',
        name: 'home',
        component: require('./components/Home/LandingPageView')
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
