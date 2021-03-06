import firebase from 'firebase';

let maValeure = ''

const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}

//let userData = JSON.parse(localStorage.getItem('user'))
// var self = this
// let data
// let reference = (userData.zooName);

// firebase.database().ref(reference).once('value').then(function (snapshot) {
//     data = snapshot.val()
// })


const Menu = [
    {
        heading: 'Gestions des animaux',
    },

    // Gestion des animaux

    {
        name: 'Espèce & Individus',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Voir les espèces',
            path: 'SpecieListScreen'
        }, {
            name: 'Ajouter une espèces',
            path: 'SpecieScreen'
        }]
    },

    // Gestion des enclos

    {
        name: 'Gestion des enclos',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{

            name: 'Voir les Enclos',
            path: 'EnclosureList'
        }, {
            name: 'Ajouter un Enclos',
            path: 'EnclosureScreen'
        }]
    },

    {
        heading: 'Gestion du Parc',
    },

    {
        name: 'Animations',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Voir les animations',
            path: 'AnimationsListScreen'
        }, {
            name: 'Ajouter une Animation',
            path: 'AnimationScreen'

        }]
    },
    {
        name: 'Evènements',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Voir les Evènements',
            path: 'EventsListScreen'

        }, {
            name: 'Ajouter un Evènement',
            path: 'EventScreen'
        }]
    },

    {
        name: 'Services',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Voir les services',
            path: 'ServicesListScreen'
        }, {
            name: 'Ajouter un Service',
            path: 'ServiceScreen'
        },]
    },

    {
        name: 'Blog',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Nouvel article',
            path: 'BlogPost'
        }, {
            name: 'Voir les articles',
            path: 'ArticlesListView'
        },]
    },

    {
        heading: "Gestion de L'application",
    },

    {
        name: 'Gestion des Dons',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Gérer les Dons',
            path: 'DonationScreen'
        },]
    },

    {
        name: 'Gestion des Profil',
        icon: 'icon-speedometer',
        submenu: [{
            name: 'Gérer Mon Profil',
            path: 'UserScreen'
        },]
    },

    {
        name: 'Gestion de la carte',
        icon: 'icon-speedometer',
        label: { value: maValeure, color: 'success' },
        submenu: [{
            name: 'Gérer les Dons',
            path: 'MapScreen'
        },]
    },

    // Menu du thème



    // {
    //     heading: 'Main Navigation',
    //     translate: 'sidebar.heading.HEADER'
    // },
    // {
    //     name: 'Dashboard',
    //     icon: 'icon-speedometer',
    //     translate: 'sidebar.nav.DASHBOARD',
    //     label: { value: 3, color: 'success' },
    //     submenu: [{
    //         name: 'Dashboard v1',
    //         path: 'dashboard'
    //     },
    //     {
    //         name: 'Dashboard v2',
    //         path: 'dashboardv2'
    //     },
    //     {
    //         name: 'Dashboard v3',
    //         path: 'dashboardv3'
    //     }
    //     ]
    // },
    // {
    //     name: 'Widgets',
    //     icon: 'icon-grid',
    //     path: 'widgets',
    //     label: { value: 30, color: 'success' },
    //     translate: 'sidebar.nav.WIDGETS'
    // },
    // {
    //     heading: 'Components',
    //     translate: 'sidebar.heading.COMPONENTS'
    // },
    // {
    //     name: 'Elements',
    //     icon: 'icon-chemistry',
    //     translate: 'sidebar.nav.element.ELEMENTS',
    //     submenu: [{
    //         name: 'Buttons',
    //         path: 'buttons',
    //         translate: 'sidebar.nav.element.BUTTON'
    //     },
    //     {
    //         name: 'Notifications',
    //         path: 'notifications',
    //         translate: 'sidebar.nav.element.NOTIFICATION'
    //     },
    //     {
    //         name: 'Sweetalert',
    //         path: 'sweetalert'
    //     },
    //     {
    //         name: 'Carousel',
    //         path: 'carousel',
    //         translate: 'sidebar.nav.element.INTERACTION'
    //     },
    //     {
    //         name: 'Spinners',
    //         path: 'spinners',
    //         translate: 'sidebar.nav.element.SPINNER'
    //     },
    //     {
    //         name: 'Animations',
    //         path: 'animations',
    //         translate: 'sidebar.nav.element.ANIMATION'
    //     },
    //     {
    //         name: 'Dropdown',
    //         path: 'dropdown',
    //         translate: 'sidebar.nav.element.DROPDOWN'
    //     },
    //     {
    //         name: 'Nestable',
    //         path: 'nestable'
    //     },
    //     {
    //         name: 'Sortable',
    //         path: 'sortable'
    //     },
    //     {
    //         name: 'Cards',
    //         path: 'cards',
    //         translate: 'sidebar.nav.element.CARD'
    //     },
    //     {
    //         name: 'Grid',
    //         path: 'grid',
    //         translate: 'sidebar.nav.element.GRID'
    //     },
    //     {
    //         name: 'Grid Masonry',
    //         path: 'grid-masonry',
    //         translate: 'sidebar.nav.element.GRID_MASONRY'
    //     },
    //     {
    //         name: 'Typography',
    //         path: 'typography',
    //         translate: 'sidebar.nav.element.TYPO'
    //     },
    //     {
    //         name: 'IconsFont',
    //         path: 'icons-font',
    //         translate: 'sidebar.nav.element.FONT_ICON',
    //         label: { value: '+400', color: 'success' }
    //     },
    //     {
    //         name: 'IconsWeather',
    //         path: 'icons-weather',
    //         translate: 'sidebar.nav.element.WEATHER_ICON',
    //         label: { value: '+100', color: 'success' }
    //     },
    //     {
    //         name: 'Colors',
    //         path: 'colors',
    //         translate: 'sidebar.nav.element.COLOR'
    //     }
    //     ]
    // },
    // {
    //     name: 'Forms',
    //     icon: 'icon-note',
    //     translate: 'sidebar.nav.form.FORM',
    //     submenu: [{
    //         name: 'Standard',
    //         path: 'form-standard',
    //         translate: 'sidebar.nav.form.STANDARD'
    //     },
    //     {
    //         name: 'Extended',
    //         path: 'form-extended',
    //         translate: 'sidebar.nav.form.EXTENDED'
    //     },
    //     {
    //         name: 'Validation',
    //         path: 'form-validation',
    //         translate: 'sidebar.nav.form.VALIDATION'
    //     },
    //     {
    //         name: 'Wizard',
    //         path: 'form-wizard',
    //     },
    //     {
    //         name: 'Upload',
    //         path: 'form-upload',
    //     },
    //     {
    //         name: 'Cropper',
    //         path: 'form-cropper',
    //     }
    //     ]
    // },
    // {
    //     name: 'Charts',
    //     icon: 'icon-graph',
    //     translate: 'sidebar.nav.chart.CHART',
    //     submenu: [{
    //         name: 'Flot',
    //         path: 'chart-flot',
    //         translate: 'sidebar.nav.chart.FLOT'
    //     },
    //     {
    //         name: 'Radial',
    //         path: 'chart-radial',
    //         translate: 'sidebar.nav.chart.RADIAL'
    //     },
    //     {
    //         name: 'Chartjs',
    //         path: 'chart-chartjs',
    //     },
    //     {
    //         name: 'Morris',
    //         path: 'chart-morris',
    //     },
    //     {
    //         name: 'Chartist',
    //         path: 'chart-chartist',
    //     }
    //     ]
    // },
    // {
    //     name: 'Tables',
    //     icon: 'icon-grid',
    //     translate: 'sidebar.nav.table.TABLE',
    //     submenu: [{
    //         name: 'Standard',
    //         path: 'table-standard',
    //         translate: 'sidebar.nav.table.STANDARD'
    //     },
    //     {
    //         name: 'Extended',
    //         path: 'table-extended',
    //         translate: 'sidebar.nav.table.EXTENDED'
    //     },
    //     {
    //         name: 'Datatable',
    //         path: 'table-datatable',
    //         translate: 'sidebar.nav.table.DATATABLE'
    //     },
    //     {
    //         name: 'Datagrid',
    //         path: 'table-datagrid',
    //     }
    //     ]
    // },
    // {
    //     name: 'Maps',
    //     icon: 'icon-map',
    //     translate: 'idebar.nav.map.MAP',
    //     submenu: [{
    //         name: 'Google',
    //         path: 'map-google',
    //         translate: 'sidebar.nav.map.GOOGLE'
    //     },
    //     {
    //         name: 'Vector',
    //         path: 'map-vector',
    //         translate: 'sidebar.nav.map.VECTOR'
    //     }
    //     ]
    // },
    // {
    //     heading: 'More',
    //     translate: 'sidebar.heading.MORE'
    // },
    // {
    //     name: 'Pages',
    //     icon: 'icon-doc',
    //     translate: 'sidebar.nav.pages.PAGES',
    //     submenu: [{
    //         name: 'Login',
    //         path: 'login',
    //         translate: 'sidebar.nav.pages.LOGIN'
    //     },
    //     {
    //         name: 'Register',
    //         path: 'register',
    //         translate: 'sidebar.nav.pages.REGISTER'
    //     },
    //     {
    //         name: 'Recover',
    //         path: 'recover',
    //         translate: 'sidebar.nav.pages.RECOVER'
    //     },
    //     {
    //         name: 'Lock',
    //         path: 'lock',
    //         translate: 'sidebar.nav.pages.LOCK'
    //     },
    //     {
    //         name: 'Not Found',
    //         path: 'notfound',
    //     },
    //     {
    //         name: 'Error 500',
    //         path: 'error500'
    //     },
    //     {
    //         name: 'Maintenance',
    //         path: 'maintenance'
    //     }
    //     ]
    // },
    // {
    //     name: 'Extras',
    //     icon: 'icon-cup',
    //     translate: 'sidebar.nav.extra.EXTRA',
    //     submenu: [{
    //         name: 'Mailbox',
    //         path: 'mailbox',
    //         translate: 'sidebar.nav.extra.MAILBOX',
    //     },
    //     {
    //         name: 'Bug Tracker',
    //         path: 'bug-tracker'
    //     },
    //     {
    //         name: 'Contact Details',
    //         path: 'contact-details'
    //     },
    //     {
    //         name: 'Contacts',
    //         path: 'contacts'
    //     },
    //     {
    //         name: 'Faq',
    //         path: 'faq'
    //     },
    //     {
    //         name: 'File Manager',
    //         path: 'file-manager'
    //     },
    //     {
    //         name: 'Followers',
    //         path: 'followers'
    //     },
    //     {
    //         name: 'Help Center',
    //         path: 'help-center'
    //     },
    //     {
    //         name: 'Plans',
    //         path: 'plans'
    //     },
    //     {
    //         name: 'Project Details',
    //         path: 'project-details'
    //     },
    //     {
    //         name: 'Projects',
    //         path: 'projects'
    //     },
    //     {
    //         name: 'Settings',
    //         path: 'settings'
    //     },
    //     {
    //         name: 'Social Board',
    //         path: 'social-board'
    //     },
    //     {
    //         name: 'Team Viewer',
    //         path: 'team-viewer'
    //     },
    //     {
    //         name: 'Vote Links',
    //         path: 'vote-links'
    //     },
    //     {
    //         name: 'Timeline',
    //         path: 'timeline',
    //         translate: 'sidebar.nav.extra.TIMELINE'
    //     },
    //     {
    //         name: 'Calendar',
    //         path: 'calendar',
    //         translate: 'sidebar.nav.extra.CALENDAR'
    //     },
    //     {
    //         name: 'Invoice',
    //         path: 'invoice',
    //         translate: 'sidebar.nav.extra.INVOICE'
    //     },
    //     {
    //         name: 'Search',
    //         path: 'search',
    //         translate: 'sidebar.nav.extra.SEARCH'
    //     },
    //     {
    //         name: 'Todo',
    //         path: 'todo',
    //         translate: 'sidebar.nav.extra.TODO'
    //     },
    //     {
    //         name: 'Profile',
    //         path: 'profile',
    //         translate: 'sidebar.nav.extra.PROFILE'
    //     }
    //     ]
    // },
    // {
    //     name: 'Blog',
    //     icon: 'icon-notebook',
    //     submenu: [{
    //         name: 'List',
    //         path: 'blog-list'
    //     },
    //     {
    //         name: 'Post',
    //         path: 'blog-post'
    //     },
    //     {
    //         name: 'Articles',
    //         path: 'blog-articles'
    //     },
    //     {
    //         name: 'Article View',
    //         path: 'blog-article-view'
    //     }
    //     ]
    // },
    // {
    //     name: 'eCommerce',
    //     icon: 'icon-basket-loaded',
    //     submenu: [{
    //         name: 'Orders',
    //         path: 'ecommerce-orders',
    //         label: { value: 10, color: 'success' },
    //     },
    //     {
    //         name: 'Order-view',
    //         path: 'ecommerce-order-view'
    //     },
    //     {
    //         name: 'Products',
    //         path: 'ecommerce-products'
    //     },
    //     {
    //         name: 'Product-view',
    //         path: 'ecommerce-product-view'
    //     },
    //     {
    //         name: 'Checkout',
    //         path: 'ecommerce-checkout'
    //     }
    //     ]
    // },
    // {
    //     name: 'Forum',
    //     icon: 'icon-speech',
    //     submenu: [{
    //         name: 'Categories',
    //         path: 'forum-categories'
    //     },
    //     {
    //         name: 'Topics',
    //         path: 'forum-topics'
    //     },
    //     {
    //         name: 'Discussion',
    //         path: 'forum-discussion'
    //     }
    //     ]
    // }
];

export default Menu;