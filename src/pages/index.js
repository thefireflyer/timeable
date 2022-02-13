import Head from 'next/head'
import React, { Component, useState } from 'react'
import styles from '../styles/Home.module.scss'

const storedData = "timeable.data"
const savedDataVersion = 1
const loopTime = 30


function NavBarSpacer () {
  return(<div style={{marginBottom:`16vh`}}></div>)
}

export default class Home extends Component {
  constructor(props) {
    super(props)

    var date = new Date()//2022, 2, 3, 6);
    this.currentDate = date.toDateString()

    this.state = {
      days: {},
      notifications : false,
      version: savedDataVersion
    }
    
    if (!this.state.days[date.toDateString()])
    {//new day, create time data
      this.state.days[this.currentDate] = this.createDayTemplate()
    }


  }

  createDayTemplate() {
    let segments = []
    for (let i = 0; i <= 24; i++) {
     segments.push({
        title:"",
        desc: "",
        activity: null,
        hour: i
      })
    }
    return segments
  }

  updateLoop() {
    console.log(this.state)    
    var date = new Date()//2022, 2, 3, 6);
    //this.currentDate = date.toDateString()
    

    document.getElementById(styles.offlineIcon).style.display = navigator.onLine?`none`:`block`;

    this.forceUpdate()      
    
    let currentSegment = this.state.days[this.currentDate][date.getHours()]

    console.log(date.getHours())
    console.log(currentSegment)
    if (currentSegment.title != "" && this.state.notifications)
    {
      if (date.getMinutes() < 1 && date.getSeconds() < loopTime)
      {console.log("displaying notifications")
        var img = '/timeable/icon.png';
        var text = currentSegment.title + ` now starting.
  ` + currentSegment.desc;
        displayNotification(text)
        //var notification = new Notification('Timeable - activity reminder', { body: text, icon: img });
      }
      else {
        console.log(date.getMinutes())
        console.log(date.getSeconds())
      }
    }
  }

  componentDidMount() {
    let mainLoop = window.setInterval(() => {this.updateLoop()}, loopTime*1000);
    ///*
    let data = localStorage.getItem(storedData)
    
    if (data == null)
    {
      this.saveData()
    }

    try {
      let newStateData = JSON.parse(data)
      if (!newStateData.version){throw ErrorEvent}
      if (newStateData.version < savedDataVersion){throw ErrorEvent}
      
      this.setState(newStateData)
      //this.state = JSON.parse(data)
    }
    catch(err){
      console.log(err)
      this.saveData()
    }//*/

    this.forceUpdate()

    Notification.requestPermission().then(function(result) {
      console.log(result);
    });    
  
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
    
    
    //displayNotification("starting app | TODO: remove; for testing only")
    
    this.updateLoop()

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
    this.state.currentSegment = null
    this.state.mouseTimer = null
    this.state.eventInfo = null
    localStorage.setItem(storedData, JSON.stringify(this.state))
    console.log(this.state)
  }
  closeAll()
  {
    this.updateData()
    document.getElementById(styles.container).style.left = `0`
    document.getElementById(styles.closeSettings).style.display = `none`
    document.getElementById(styles.timeSegmentOptions).style.top = `100vh`;

    this.saveData()
  }

  mouseDown(info, onTimeout) {
    this.state.eventInfo = info
    this.state.mouseTimer = window.setTimeout(() => onTimeout(),500); //set timeout to fire in 2 seconds when the user presses mouse button down
  }

  mouseUp() { 
    if (this.state.mouseTimer) window.clearTimeout(this.state.mouseTimer);  //cancel timer when mouse button is released
    this.state.eventInfo = null
  }

  execMouseDown() {
    let currentTarget = this.state.eventInfo.touches?.item("0").target||this.state.eventInfo.target
    console.log(currentTarget)
    console.log(currentTarget.attributes.segment.value)

    this.state.currentSegment = () => {return(this.state.days[this.currentDate][currentTarget.attributes.segment.value])}

    let optionsMenu = document.getElementById(styles.timeSegmentOptions)

    optionsMenu.querySelector("#title").value = this.state.currentSegment().title
    optionsMenu.querySelector("#description").value = this.state.currentSegment().desc

    let optionMenu = document.getElementById(styles.timeSegmentOptions)
    optionMenu.style.top = `30vh`;
    document.getElementById(styles.closeSettings).style.display = `block`
  }

  clearTimeSegmentData () {
    this.state.days[this.currentDate].forEach(timeSegment => {
      timeSegment.title = ""
      timeSegment.desc = ""
    })

    this.saveData()
    this.forceUpdate()
  }

  clearAllAppData (){
    localStorage.setItem(storedData, null)
    location.reload()
  }

  render() {
    if (!this.state.days[this.currentDate])
    {//new day, create time data
      this.state.days[this.currentDate] = this.createDayTemplate()
    }

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
              {this.state.days[this.currentDate].map(timeSegment => {
                return(
                <div key={timeSegment.hour}
                 className={styles.timeSegment}
                 onTouchStart={e => this.mouseDown(e, () => this.execMouseDown())}
                 onMouseDown={e => this.mouseDown(e, () => this.execMouseDown())}
                 onTouchEnd={() => this.mouseUp()}
                 onTouchCancel={() => this.mouseUp()}
                 onMouseUp={() => this.mouseUp()}
                 onTouchMove={e => {
                   //TODO: add support for swipe gestures, left for settings, right to clear?
                 }}
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


          <div className={styles.dateHeader}><h3><b onClick={() => {//pervious
            let dayBefore = new Date(this.currentDate)
            dayBefore.setDate(dayBefore.getDate() - 1);

            this.currentDate = dayBefore.toDateString()
            this.forceUpdate()
          }}>{` < `}</b>{this.currentDate}<b onClick={() => {//next
            let dayAfter = new Date(this.currentDate)
            dayAfter.setDate(dayAfter.getDate() + 1);
            
            this.currentDate = dayAfter.toDateString()
            this.forceUpdate()
          }}>{` > `}</b></h3></div>
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
              <h3 onClick={() => {
                this.state.notifications = !this.state.notifications
                this.forceUpdate()
              }} >{this.state.notifications?`Disable notifications`:`Enable notifications`}</h3>

              <h3 
              onTouchStart={e => this.mouseDown(e, () => this.clearTimeSegmentData())}
              onMouseDown={e => this.mouseDown(e, () => this.clearTimeSegmentData())}
              onTouchEnd={() => this.mouseUp()}
              onTouchCancel={() => this.mouseUp()}
              onMouseUp={() => this.mouseUp()}
              >Clear today</h3>
              <h3
              onTouchStart={e => this.mouseDown(e, () => this.clearAllAppData())}
              onMouseDown={e => this.mouseDown(e, () => this.clearAllAppData())}
              onTouchEnd={() => this.mouseUp()}
              onTouchCancel={() => this.mouseUp()}
              onMouseUp={() => this.mouseUp()}
              style={{backgroundColor:`red`,color:`black`}}>Clear ALL data</h3>
              
              <NavBarSpacer></NavBarSpacer>

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

function displayNotification(body) {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      var options = {
        body: body,
        icon: 'icon.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'snooze', title: 'snooze',
            icon: 'icon.png'},
          {action: 'markAsComplete', title: 'mark as complete',
            icon: 'icon.png'},
        ]
      };
      reg.showNotification('timeable', options);
    });
  }
}