import firebase from "../Firebase";
import React, { Component, useState } from 'react';
import date from 'date-and-time';


const rootRef = firebase.database().ref().child('dates');
const gotitRef = rootRef.child('mJWR4RD2SxSJX6LA').child('gym');

function Firetest(){
    const now = new Date();
    var DATE = date.format(now, 'YYYY-MM-DD');

    function dateToNum(date){
        let tmp = date.split('-');
        let month = parseInt(tmp[1])-1;
        let day = parseInt(tmp[2]);
        let totalMonths = [31,28,31,30,31,30,31,31,30,31,30,31]
        let total = day
        for (var i=0;i<month;i++){
            total += totalMonths[i];
        }
        return total;
    }

    dateToNum(DATE)

    rootRef.update({'yooooo':{'yo':'yaaaa'}});

    return <h1>Waiting for data</h1>
}

export default Firetest