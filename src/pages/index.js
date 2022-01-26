import Head from 'next/head'
import React, { Component, useState } from 'react'
import styles from '../styles/Home.module.scss'

const storedData = "timeable.data"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeSegments : []
    }
    for (let i = 1; i <= 24; i++) {
      this.state.timeSegments.push({
        title:"",
        desc: "",
        activity: null,
        hour: i
      })
    }
  }
  
  componentDidMount() {
    
    let mainLoop = window.setInterval(state => {      
      const date = new Date();
      
      document.getElementById(styles.offlineIcon).style.display = navigator.onLine?`none`:`block`;
      this.forceUpdate()

    }, 10000, this.state);


    /*
    let data = localStorage.getItem(storedData)
    
    if (data == null)
    {
      saveData(this.state)
    }

    this.state = JSON.parse(data)*/

    Notification.requestPermission().then(function(result) {
      console.log(result);
    });

    
    
  
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
    

    this.forceUpdate()

  }

  render() {
    return (
      <div id={styles.container}>
        <Head>
          <title>Timeable</title>
          <meta name="description" content="Free open source time management app" />
          <link rel="icon" href="icon.png" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet" />
        <link rel="manifest" href="/timeable/manifest.json" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link>
        </Head>

        <main id={styles.main}>
             
          
          <div className={styles.app}>

            <div className={styles.activities}>

            </div>

            <div className={styles.timesheet}>
              {this.state.timeSegments.map(timeSegment => {
                return(
                <div key={timeSegment.hour}
                 className={styles.timeSegment}
                 onTouchStart={mouseDown}
                 onMouseDown={mouseDown}
                 onTouchEnd={mouseUp}
                 onTouchCancel={mouseUp}
                 onMouseUp={mouseUp}>
                  <h3>{timeSegment.title}</h3>
                </div>
                )
              })}
            </div>

            <div className={styles.menubar}>

            </div>

            

          </div>




          <a onClick={() => {
            if (screen.width > 600){
            document.getElementById(styles.container).style.left = `-20vw`
            }
            else {
              document.getElementById(styles.container).style.left = `-85vw`
            }
            document.getElementById(styles.closeSettings).style.display = `block`
          }} id={styles.openSettings}><span className={"material-icons-outlined "+styles.pin} >settings</span></a>

          <a onClick={closeAll} id={styles.closeSettings}></a>


          <div id={styles.bottomPins} >
            <span id={styles.offlineIcon} className={"material-icons-outlined "+styles.pin} >
            offline_pin
            </span>
            
            <span className={"material-icons-outlined "+styles.pin} onClick={() => {
              window.location.href = "https://github.com/theflyingfire/timeable"
            }}>
            code
            </span>
          </div>

          <div id={styles.timeSegmentOptions}>
              
            </div>

        </main>
        

          <div id={styles.settings}>
            <center id={styles.settingsPanel}>
              <h1>Settings</h1>

              <br></br>

              <a onClick={() => {
                
                saveData(this.state)
                
                this.forceUpdate()

                closeAll()

              }} ><h2>Update and save</h2></a>

            </center>
          </div>
      </div>
    )
  }
}
function saveData(state){
  localStorage.setItem(storedData, JSON.stringify(state))
}
function closeAll()
{
  document.getElementById(styles.container).style.left = `0`
  document.getElementById(styles.closeSettings).style.display = `none`
  document.getElementById(styles.timeSegmentOptions).style.top = `100vh`;
}


var mouseTimer;
function mouseDown() { 
    mouseTimer = window.setTimeout(execMouseDown,500); //set timeout to fire in 2 seconds when the user presses mouse button down
}

function mouseUp() { 
    if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
}

function execMouseDown() {
  let optionMenu = document.getElementById(styles.timeSegmentOptions)
  optionMenu.style.top = `30vh`;
  document.getElementById(styles.closeSettings).style.display = `block`
}