import { ChatEngine } from 'react-chat-engine';
import LoginForm from './components/LoginForm';
import './App.css';
import LogRocket from 'logrocket';
LogRocket.init('5i2sox/chat-app');

const projectID = '7ce35b9e-9e14-4bf7-b4e1-b8baf48b659f';
const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

  const showNotification = (message) => {
    let granted = false;
		if (Notification.permission === 'granted') {
			granted = true;
		} else if (Notification.permission !== 'denied') {
			let permission = Notification.requestPermission();
			granted = permission === 'granted' ? true : false;
		}
    if (granted) {
        // create a new notification
        const notification = new Notification('New Message', {
          body: `Click To View More or Reply`,
          icon: 'https://stem-club-chat.netlify.app/favicon.ico'
        });
        // close the notification after 10 seconds
        setTimeout(() => {
          notification.close();
        }, 10 * 1000);

        // navigate to a URL when clicked
        notification.addEventListener('click', () => {

          window.open('https://stem-club-chat.netlify.app/', '_blank');
        });
      }
}
  
  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()
	  }
    />
  );
};

// infinite scroll, logout, more customizations...

export default App;
