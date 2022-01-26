import Head from 'next/head'
import React, { Component, useState } from 'react'
import styles from '../styles/Home.module.scss'

const storedData = "timeable.data"

function NavBarSpacer () {
  return(<div style={{marginBottom:`16vh`}}></div>)
}

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

  updateData() {
    
    if (!this.state.currentSegment)return;

    let optionsMenu = document.getElementById(styles.timeSegmentOptions)

    this.state.currentSegment().title = optionsMenu.querySelector("#title").value
    this.state.currentSegment().desc = optionsMenu.querySelector("#description").value

    this.forceUpdate()
  }

  saveData(){
    localStorage.setItem(storedData, JSON.stringify(this.state))
  }
  closeAll()
  {
    this.updateData()
    document.getElementById(styles.container).style.left = `0`
    document.getElementById(styles.closeSettings).style.display = `none`
    document.getElementById(styles.timeSegmentOptions).style.top = `100vh`;

    this.state.currentSegment = null
    this.state.mouseTimer = null
    this.state.eventInfo = null
    this.saveData()
  }

  mouseDown(info) {
    this.state.eventInfo = info
    this.state.mouseTimer = window.setTimeout(() => this.execMouseDown(),500); //set timeout to fire in 2 seconds when the user presses mouse button down
  }

  mouseUp() { 
    if (this.state.mouseTimer) window.clearTimeout(this.state.mouseTimer);  //cancel timer when mouse button is released
    this.state.eventInfo = null
  }

  execMouseDown() {
    let currentTarget = this.state.eventInfo.touches?.item("0").target||this.state.eventInfo.target
    console.log(currentTarget)
    console.log(currentTarget.attributes.segment.value)

    this.state.currentSegment = () => {return(this.state.timeSegments[currentTarget.attributes.segment.value-1])}

    let optionsMenu = document.getElementById(styles.timeSegmentOptions)

    optionsMenu.querySelector("#title").value = this.state.currentSegment().title
    optionsMenu.querySelector("#description").value = this.state.currentSegment().desc

    let optionMenu = document.getElementById(styles.timeSegmentOptions)
    optionMenu.style.top = `30vh`;
    document.getElementById(styles.closeSettings).style.display = `block`
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
                 onTouchStart={e => this.mouseDown(e)}
                 onMouseDown={e => this.mouseDown(e)}
                 onTouchEnd={() => this.mouseUp()}
                 onTouchCancel={() => this.mouseUp()}
                 onMouseUp={() => this.mouseUp()}
                 style={{borderColor:timeSegment.activity?.color||`#333`}}
                 segment={timeSegment.hour}>
                  <h3>{timeSegment.hour+`:00`}</h3>
                  <h2>{timeSegment.title}</h2>
                  <h4>{timeSegment.desc}</h4>
                </div>
                )
              })}
              <NavBarSpacer></NavBarSpacer>
            </div>

            <div className={styles.menubar}>

            </div>

            

          </div>


          <div className={styles.dropOff}></div>

          <a onClick={() => {
            if (screen.width > 600){
            document.getElementById(styles.container).style.left = `-20vw`
            }
            else {
              document.getElementById(styles.container).style.left = `-85vw`
            }
            document.getElementById(styles.closeSettings).style.display = `block`
          }} id={styles.openSettings}><span className={"material-icons-outlined "+styles.pin} >settings</span></a>

          <a onClick={() => this.closeAll()} id={styles.closeSettings}></a>


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
            
            <input type={`text`} placeholder={`title`} id={`title`}></input>
            <input type={`text`} placeholder={`description`} id={`description`}></input>

            {

              ///TODO: activity dropdown

              ///TODO: color coding

              ///TODO: todo list

              ///TODO: reminders

            }
            <NavBarSpacer></NavBarSpacer>
          </div>

        </main>
        

          <div id={styles.settings}>
            <center id={styles.settingsPanel}>
              <h1>Settings</h1>

              <br></br>

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
  saveData()
}


var mouseTimer;
var eventInfo;
function mouseDown(info) {
  eventInfo = info
  mouseTimer = window.setTimeout(execMouseDown,500); //set timeout to fire in 2 seconds when the user presses mouse button down
}

function mouseUp() { 
  if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
  eventInfo = null
}

function execMouseDown() {
  let currentTarget = eventInfo.touches?.item("0").target||eventInfo.target
  console.log(currentTarget)
  console.log(currentTarget.attributes.segment)
  let optionMenu = document.getElementById(styles.timeSegmentOptions)
  optionMenu.style.top = `30vh`;
  document.getElementById(styles.closeSettings).style.display = `block`
}