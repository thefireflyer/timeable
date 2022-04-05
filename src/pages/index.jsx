import Head from 'next/head'
import React, { Component, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { css, jsx } from '@emotion/react'

const storedData = "timeable.data"
const savedDataVersion = 1
const loopTime = 30


function NavBarSpacer () {
  return(<div style={{marginBottom:`16vh`}}></div>)
}


function Selector({ time, onSelectStart, onSelectDrag, onSelectEnd, onTouchSelect, selected }) {
  return <div
    className={styles.selector}
    //style={{backgroundColor: !selected?(time%2!=0?`rgba(20, 20, 20, 0.5)`:`rgba(30, 30, 30, 5)`):``}}
    onMouseDown={onSelectStart}
    onMouseMove={onSelectDrag}
    onMouseUp={onSelectEnd}
    onTouchStart={onTouchSelect}
    onTouchCancel={onSelectEnd}
    onTouchEnd={onSelectEnd}>
  </div>;
}

const Day = (props) => {
  console.log(props.schedule)
  let mouseTimer = null
  function mouseDown() {
    mouseTimer = window.setTimeout(() => saveAndEdit(),500); //set timeout to fire in 2 seconds when the user presses mouse button down
  }

  function mouseUp() {
    window.clearTimeout(mouseTimer)
    mouseTimer = null
  }

  function saveAndEdit(){
    window.clearTimeout(mouseTimer)
    mouseTimer = null
    if (Math.abs(selection.end-selection.start)<1)
    {
      console.log("???")
      return
    }
    let data = {
      hour:selection.start<selection.end?selection.start:selection.end,
      length:Math.abs(selection.end-selection.start),
      title: '',
      desc: ''
    }

    setSelection({
      start: null,
      end: null,
      selecting: false
    })
    props.onTimeSegmentSelected(data)

    let optionsMenu = document.getElementById(styles.timeSegmentOptions)

    optionsMenu.querySelector("#title").value = ''
    optionsMenu.querySelector("#description").value = ''

    let optionMenu = document.getElementById(styles.timeSegmentOptions)
    optionMenu.style.top = `30vh`;
    document.getElementById(styles.closeSettings).style.display = `block`
  }

  const [selection, setSelection] = useState({
    start: null,
    end: null,
    selecting: false
  })

  var labels = []
  for (let i = 0; i < 24; i++) {
    labels.push(<div key={i} className={styles.label} onClick={()=>{setSelection({start:null,end:null,selecting:false})}}>
      <h3>{i+`:00`}</h3>
    </div>) 
  }

  var selectors = []
  for (let i = 0; i < 24*2; i++) {
    selectors.push(<Selector
      
      time={i}
      onSelectStart={() => setSelection({start: i, end: i, selecting: true})}
      onSelectDrag={(e) => {
        e.preventDefault()
        if (selection.selecting) {
          setSelection({...selection, end: i})
          console.log(selection)
        }
      }}
      onSelectEnd={() => {
        setSelection({...selection, selecting: false})
        }}

      onTouchSelect={()=>{
        setSelection({start: i, end:i+1, selecting: false})
      }}

      selected={selection.start !== null && (selection.start <= i && i <= selection.end || selection.start >= i && i >= selection.end) } 
      
    ></Selector>)

  }
  var currentSelection = null
  if (selection.selecting||Math.abs(selection.end-selection.start)>0)
  {
    currentSelection = <div key={'selection'}
    className={styles.timeSegment}
    style={{borderColor:`#333`,
  position:`absolute`,
  top:`${5*(selection.start<selection.end?selection.start:selection.end)+5}vh`,
  height:`${5*Math.abs(selection.end-selection.start)+5}vh`}}
    segment={selection.start}

    onContextMenu={e => {
      e.preventDefault()
      setSelection({
        start: null,
        end: null,
        selecting: false
      })
    }}

    // onClick={() => {
    //   setSelection({...selection, selecting: false})
    // }}

    onTouchStart={e => mouseDown()}
    onMouseDown={e => mouseDown()}
    onTouchEnd={() => mouseUp()}
    onTouchCancel={() => mouseUp()}
    onMouseUp={() => mouseUp()}

    onDoubleClick={saveAndEdit}>
     <h2>{``}</h2>
     <h4>{``}</h4>
   </div>
   }

  return(<div className={styles.timesheet}>
    <div className={styles.selectors}>{selectors}</div>
    {props.schedule.map(segment => {//saved selections
      return(<TimeSegment onTimeSegmentSelected={props.onTimeSegmentSelected} data={segment}></TimeSegment>)
    })}
    {currentSelection}
    <div className={styles.labels}>{labels}</div>
    <NavBarSpacer></NavBarSpacer>
  </div>)
}


class TimeSegment extends Component {
  
  constructor(props) {
    super(props)

    this.state = {

    }
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
    this.props.onTimeSegmentSelected(this.props.data)

    let optionsMenu = document.getElementById(styles.timeSegmentOptions)

    optionsMenu.querySelector("#title").value = this.props.data.title
    optionsMenu.querySelector("#description").value = this.props.data.desc

    let optionMenu = document.getElementById(styles.timeSegmentOptions)
    optionMenu.style.top = `30vh`;
    document.getElementById(styles.closeSettings).style.display = `block`
  }

  render () {
    if (this.props.data == null){return(<></>)}
    let hour = (new Date()).getHours()*2

    return(
      <div key={this.props.data.hour}
      className={styles.timeSegment}
      onTouchStart={e => this.mouseDown(e, () => this.execMouseDown())}
      onMouseDown={e => this.mouseDown(e, () => this.execMouseDown())}
      onTouchEnd={() => this.mouseUp()}
      onTouchCancel={() => this.mouseUp()}
      onMouseUp={() => this.mouseUp()}
      onDoubleClick={()=>this.execMouseDown()}
      onContextMenu={e=>{
        e.preventDefault()

      }}
      onTouchMove={e => {
        //TODO: add support for swipe gestures, left for settings, right to clear?
      }}
      style={{borderColor:(this.props.data.hour<=hour&&hour<=this.props.data.hour+this.props.data.length)?`red`:`#333`,
      position:`absolute`,
      top:`${5*(this.props.data.hour+1)}vh`,
      height:`${5*(this.props.data.length+1)}vh`}}
      segment={this.props.data.hour}>
       <h2>{this.props.data.title}</h2>
       <h4>{this.props.data.desc}</h4>
     </div>
     )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    var date = new Date()//2022, 2, 3, 6);
    this.currentDate = date.toDateString()

    this.currentWeek = []
    this.selectedSegments = []

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
    // for (let i = 0; i <= 24; i++) {
    //  segments.push({
    //     title:"",
    //     desc: "",
    //     hour: i
    //   })
    // }
    return segments
  }

  updateLoop() {
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
    }
    catch(err){
      console.log(err)
      this.saveData()
    }

    this.forceUpdate()

    Notification.requestPermission().then(function(result) {
      console.log(result);
    });    
  
    document.body.addEventListener("mouseup", mouseUp);
    
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
    // old one
    // let currentTarget = this.state.eventInfo.touches?.item("0").target||this.state.eventInfo.target
    // console.log(currentTarget)
    // console.log(currentTarget.attributes.segment.value)

    // this.state.currentSegment = () => {return(this.state.days[this.currentDate][currentTarget.attributes.segment.value])}

    // let optionsMenu = document.getElementById(styles.timeSegmentOptions)

    // optionsMenu.querySelector("#title").value = this.state.currentSegment().title
    // optionsMenu.querySelector("#description").value = this.state.currentSegment().desc

    // let optionMenu = document.getElementById(styles.timeSegmentOptions)
    // optionMenu.style.top = `30vh`;
    // document.getElementById(styles.closeSettings).style.display = `block`
  }

  clearCurrentDate () {
    // this.state.days[this.currentDate].forEach(timeSegment => {
    //   timeSegment.title = ""
    //   timeSegment.desc = ""
    // })

    this.state.days[this.currentDate] = []

    this.saveData()
    this.forceUpdate()
  }

  clearAllAppData (){
    localStorage.setItem(storedData, null)
    location.reload()
  }

  deleteTimeSegment()
  {
    this.state.days[this.currentDate] = this.state.days[this.currentDate].filter((e) => {
      return e !== this.state.currentSegment();
    });
    this.state.currentSegment=null
    this.closeAll()
    this.forceUpdate()
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

              <Day onTimeSegmentSelected={data => {
                if (data==null){return}
                console.log(data)
                this.state.days[this.currentDate][data.hour] = data
                console.log(this.state.days[this.currentDate])
                this.state.currentSegment = () => {return (this.state.days[this.currentDate][data.hour])}
                this.forceUpdate()
              }} schedule={this.state.days[this.currentDate]} key={this.state.days[this.currentDate]}></Day>
              

            <div className={styles.menubar}>

            </div>

            

          </div>


          <div className={styles.dateHeader}><h3><b onClick={() => {//pervious
            let dayBefore = new Date(this.currentDate)
            dayBefore.setDate(dayBefore.getDate() - 1);

            this.currentDate = dayBefore.toDateString()
            this.forceUpdate()
          }}>{` < `}</b>{(this.currentDate==new Date().toDateString())?this.currentDate+` (Today)`:this.currentDate}<b onClick={() => {//next
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
            <h3 id={styles.deleteTimeSegmentButton}
              onTouchStart={e => this.mouseDown(e, () => this.deleteTimeSegment())}
              onMouseDown={e => this.mouseDown(e, () => this.deleteTimeSegment())}
              onTouchEnd={() => this.mouseUp()}
              onTouchCancel={() => this.mouseUp()}
              onMouseUp={() => this.mouseUp()}
              >delete</h3>
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
              onTouchStart={e => this.mouseDown(e, () => this.clearCurrentDate())}
              onMouseDown={e => this.mouseDown(e, () => this.clearCurrentDate())}
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