import React, { useEffect, useState, Component } from "react";
import firebase from "./Firebase";
import Cookies from 'js-cookie'

function AuthUser(){
    const cookie = Cookies.get('uid');
    if (cookie != undefined){
        return true
    }
    return false
}

export default AuthUser()