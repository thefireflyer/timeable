import Head from 'next/head'
import React, { Component, useState } from 'react'
import styles from '../styles/Home.module.scss'

export default function Custom404() {
    return <div id={styles.container}>
       <Head>
          <title>Timeable - 404 - page not found</title>
          <meta name="description" content="page not found" />
          <link rel="icon" href="icon.png" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link>
        </Head> 
    
    <main id={styles.main}>
    
        <h1>404 - page not found</h1>
        <span onClick={() => {
            location.href = "/timeable/"
        }} className={"material-icons-outlined "+styles.pin} >
            home
            </span>
            
        <span onClick={() => {
            location.href = "https://github.com/theflyingfire/timeable"
        }} className={"material-icons-outlined "+styles.pin} >
            code
            </span>
            
            
        <span onClick={() => {
            history.back()
        }} className={"material-icons-outlined "+styles.pin} >
            reply
            </span>
            
        </main>
    </div>
  }