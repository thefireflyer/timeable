self.addEventListener("notificationclose",(function(i){var n=i.notification.data.primaryKey;console.log("Closed notification: "+n)})),self.addEventListener("notificationclick",(function(i){var n=i.notification,t=(n.data.primaryKey,i.action);"snooze"===t||"markAsComplete"===t||clients.openWindow("/timeable/index.html"),n.close()})),self.addEventListener("periodicsync",(function(i){i.waitUntil(showNotification("timeable - activity reminder",{body:"testing",icon:"icon.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1},actions:[{action:"snooze",title:"snooze",icon:"icon.png"},{action:"markAsComplete",title:"mark as complete",icon:"icon.png"}]}))}));