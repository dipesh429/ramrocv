const BASE_URL = "http://ramrocvv.com",
      CLIENT_ID = 1,
      // CLIENT_SECRET = "Y01XVVVTCN3yNhFEMDmvUXVAn7iWCiaYISr3IJSl", production secret
      CLIENT_SECRET = "Y01XVVVTCN3yNhFEMDmvUXVAn7iWCiaYISr3IJSl",
      ENVIRONMENT = "production", // or production/delvelopment
      FB_APP_ID = 1198170943663796,
      EMPLOYEE_SIDEBAR = [
        'MAIN NAVIGATION',
        { icon: 'dashboard', name: 'Dashboard', href:'/dashboard/employee' },
        { icon: 'user', name: 'Profile', href: '/profile' },
        { icon: 'plus-square', name: 'CV Maker', href: '/dashboard/cvmaker/view'},
        { icon: 'check', name: 'Applied Jobs', href: '/dashboard/appliedjobs/view'},
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
      
      ROOT_NAVBAR = [
        { name: "HOME", href: "/" },
        { name: "CONTACT US", href: "/contact" },
        { name: "Why RamroCV ?", href: "/about" },
        { name: "RCV BLOGS", href: "/blogs" },
        { name: "JOBS", href: "/jobs" },
      ];

const get_sidebar = () => {
    return localStorage.getItem("type") === "employer" ? EMPLOYER_SIDEBAR : ( localStorage.getItem("provider") ? EMPLOYEE_SIDEBAR_SOCIAL : EMPLOYEE_SIDEBAR ) 
}

export {
    BASE_URL, CLIENT_ID, CLIENT_SECRET, get_sidebar, ROOT_NAVBAR, ENVIRONMENT, FB_APP_ID
};
