import "./styles.css";
import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from "recharts";
import student from './StudentProfile';

const data:any = [];
for(var i=0; i<student.cgpa.length; i++) {
    data.push({
        "name": "SEM " + (i+1),
        "CGPA": student.cgpa[i],
        "SGPA": student.sgpa[i] 
    })
}


const style = {
    margin: "2% 10% 8% 10%"
}

function App() {
  return (
    <div style={style}>
    <ResponsiveContainer height={280}>
        <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <XAxis dataKey="name"/>
        <YAxis type={"number"} domain={[0,10]}/>
        <Tooltip />
        <Line
            type="monotone"
            dataKey="CGPA"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
        />
        
        <Line type="monotone" dataKey="SGPA" stroke="#82ca9d" />
        </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

export default App;
