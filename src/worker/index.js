


self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
  });

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
  
    if (action === 'snooze') {
      // TODO: implement snooze functionality
      notification.close();
    } 
    else if (action === 'markAsComplete')
    {
      notification.close();
    }
    else {
      clients.openWindow('/timeable/index.html');
      notification.close();
    }
  });