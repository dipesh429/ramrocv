const BASE_URL = "http://ramrocvv.com",
      CLIENT_ID = 1,
      CLIENT_SECRET = "y3o6m8jzFgvyeL2ZN6Kea1yZDjX13CtQs8AbqHGg",
      SIDEBAR = [
      
        'MAIN NAVIGATION',
        { icon: 'dashboard', name: 'Dashboard', href:'/dashboard' },

        [
          { icon: 'user', name: 'Employee' },
          { icon: 'plus', name: 'Create Employee', href: '/employee/create'},
          { icon: 'eye', name: 'View Employee', href: '/employee/view'},
        ],
        [
          { icon: 'user-circle', name: 'Employer'},
          { icon: 'plus', name: 'Create Employer', href: '/employer/create' },
          { icon: 'eye', name: 'View Employer', href: '/employer/view'}
        ],
        
        'SITE SETTINGS'
      ];

export {
    BASE_URL, CLIENT_ID, CLIENT_SECRET, SIDEBAR
};