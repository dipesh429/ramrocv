self.addEventListener('install', function(event) {
    console.log('installed')
    // new Notification('installed');

});

self.addEventListener('register', function(event) {
    console.log('register')
    // new Notification('registered');
    return self.clients.claim()

});


self.addEventListener('push', function(event) {

  // alert('yeah working')
  if (event.data) {
    var data = event.data.json();
    self.registration.showNotification(data.title,{
      body: data.body,
      icon: data.icon
    });
    console.log('This push event has data: ', event.data.text());
  } else {
    console.log('This push event has no data.');
  }
});


