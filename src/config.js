const BASE_URL = "http://amrocvv.dom",
      CLIENT_ID = 1,
      CLIENT_SECRET = "Y01XVVVTCN3yNhFEMDmvUXVAn7iWCiaYISr3IJSl",
      ENVIRONMENT = "development", // or production/delvelopment
      FB_APP_ID = "1198170943663796",
      EMPLOYEE_SIDEBAR = [
        'MAIN NAVIGATION',
        { icon: 'dashboard', name: 'Dashboard', href:'/dashboard/employee' },
        { icon: 'user', name: 'Profile', href: '/profile' },
        { icon: 'plus-square', name: 'CV Maker', href: '/dashboard/cvmaker/view'},
        { icon: 'check', name: 'Applied Jobs', href: '/dashboard/appliedjobs/view'},
        { icon: 'plus', name: 'Followed', href: '/dashboard/followed/view'},
        'USER SETTINGS',
        { icon: 'gear', name: "Settings", href: '/dashboard/employee/usersettings'}
      ],

      EMPLOYEE_SIDEBAR_SOCIAL = [
        'MAIN NAVIGATION',
        { icon: 'dashboard', name: 'Dashboard', href:'/dashboard/employee' },
        { icon: 'user', name: 'Profile', href: '/profile' },
        { icon: 'plus-square', name: 'CV Maker', href: '/dashboard/cvmaker/view'},
        { icon: 'check', name: 'Applied Jobs', href: '/dashboard/appliedjobs/view'},
       
      ],

      EMPLOYER_SIDEBAR = [
        'MAIN NAVIGATION',
        { icon: 'dashboard', name: 'Dashboard', href:'/dashboard/employer' },
        { icon: 'user', name: 'Profile', href: '/dashboard/profile'},
        [
          { icon: 'briefcase', name: 'Job Management' },
          { icon: 'plus', name: 'Create Jobs', href:'/dashboard/job/create' },
          { icon: 'eye', name: 'View Jobs', href:'/dashboard/job/view' },
          // { icon: 'calendar', name: 'Expired Jobs', href: '/job/view/expired' }
        ],
        'USER_SETTINGS',
        { icon: 'gear', name: "Settings", href: '/dashboard/employer/usersettings'},
      ],

       INSTITUTION_SIDEBAR = [
        'MAIN NAVIGATION',
        // { icon: 'dashboard', name: 'Dashboard', href:'/dashboard/employer' },
        { icon: 'user', name: 'Profile', href: '/institution/profile'},
        { icon: 'plus', name: 'Followed', href: '/dashboard/followed/view'},
        { icon: 'plus', name: 'Offers', href: '/dashboard/offer/view'},

        // [
        //   { icon: 'briefcase', name: 'Job Management' },
        //   { icon: 'plus', name: 'Create Jobs', href:'/dashboard/job/create' },
        //   { icon: 'eye', name: 'View Jobs', href:'/dashboard/job/view' },
        //   // { icon: 'calendar', name: 'Expired Jobs', href: '/job/view/expired' }
        // ],
        'USER_SETTINGS',
        { icon: 'gear', name: "Settings", href: '/dashboard/employer/usersettings'},
      ],
      
      ROOT_NAVBAR = [

        { name: "Home", href: "/" },
        { name: "RCV Blog", href: "/blogs" },
        { name: "Jobs", href: "/jobs?query=&category=&industry=&type=&salary=&location=&jobcategory=&per_page=10&page=1" },
        { name: "Why RamroCV", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        // { name: "Job Seekers", href: "/jobseek" },
        // { name: "Job Providers", href: "/jobprov" },

      ];

const get_sidebar = () => {
    return localStorage.getItem("type") === "employer" ? EMPLOYER_SIDEBAR : localStorage.getItem("type") === "institution" ? INSTITUTION_SIDEBAR  : ( localStorage.getItem("provider") ? EMPLOYEE_SIDEBAR_SOCIAL : EMPLOYEE_SIDEBAR ) 
}

export {
    BASE_URL, CLIENT_ID, CLIENT_SECRET, get_sidebar, ROOT_NAVBAR, ENVIRONMENT, FB_APP_ID
};
