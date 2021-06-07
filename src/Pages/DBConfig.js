import { React, useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import './dbConfig.css'
import axios from 'axios'

const DBConfig = () => {

    const [dbName, setDbName] = useState("")
    const [ip, setIP] = useState("")
    const [message, setMessage] = useState("לפני חיבור")

    const connectDB = () => {
        setMessage("מתחבר...")
        axios.post(`http://backend-final-test.apps.openforce.openforce.biz/connect`, {
            ip: ip,
            dbName: dbName
        },{'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*"}).then((res) =>
            axios.post(`http://backend-final-test.apps.openforce.openforce.biz/tables`, {
                dbName: dbName,
                ip: ip
            }).then((res) => { 
                console.log(res)
                setMessage(JSON.stringify(res.data))
             })
        )
    }

    return (
        <div id='db-config'>
            <TextField id="outlined-basic" label="DB Name" variant="outlined" value={dbName} onChange={(e) => setDbName(e.target.value)} />
            <TextField id="outlined-basic" label="DB IP" variant="outlined" value={ip} onChange={(e) => setIP(e.target.value)} />
            <Button variant="contained" color="primary" onClick={connectDB}>התחבר</Button>
            <div>{message}</div>
        </div>
    )
}

export default DBConfig
