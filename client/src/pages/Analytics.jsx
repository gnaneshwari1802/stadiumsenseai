import {
  useEffect,
  useState
} from "react";

import {
  useTheme
} from "@mui/material/styles";

import {
  getAnalytics
} from "../services/analyticsApi";

import socket from "../services/socket";


import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
}
from "recharts";


function Analytics(){

  const theme = useTheme();


  const [analytics,setAnalytics] = useState([]);



  const formatData = (data)=>{

    return {

      time:
      new Date(
        data.createdAt || Date.now()
      ).toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"

      }),


      crowd:
      data.crowdDensity,


      parking:
      data.parkingOccupied,


      temperature:
      data.temperature,


      alerts:
      data.securityAlerts

    };

  };



  const loadAnalytics = async()=>{

    try{

      const data = await getAnalytics();


      const result = data.map(item=>
        formatData(item)
      );


      setAnalytics(result);


    }

    catch(err){

      console.log(
        "Analytics error:",
        err
      );

    }

  };



  useEffect(()=>{


    // Initial database data

    loadAnalytics();



    // Live socket updates

    socket.on(

      "dashboardUpdate",

      (data)=>{


        const liveData =
        formatData(data);



        setAnalytics(prev=>[

          ...prev.slice(-19),

          liveData

        ]);


      }

    );



    return ()=>{

      socket.off(
        "dashboardUpdate"
      );

    };


  },[]);





  const card={

    background:
    theme.palette.background.paper,


    color:
    theme.palette.text.primary,


    padding:"20px",

    borderRadius:"12px",

    boxShadow:
    theme.shadows[3]

  };



return(

<div

style={{

padding:"30px",

background:
theme.palette.background.default,

minHeight:"100vh",

color:
theme.palette.text.primary

}}

>


<h1>
📈 Live Stadium Analytics
</h1>



<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",

gap:"20px"

}}

>


{

[

["👥 Crowd %","crowd"],

["🚗 Parking","parking"],

["🌡 Temperature","temperature"],

["🚨 Alerts","alerts"]

]

.map(([title,key])=>(


<div

style={card}

key={key}

>


<h3>
{title}
</h3>



<ResponsiveContainer

width="100%"

height={250}

>


<LineChart

data={analytics}

>


<CartesianGrid

strokeDasharray="3 3"

/>



<XAxis

dataKey="time"

/>



<YAxis />



<Tooltip />



<Legend />



<Line

type="monotone"

dataKey={key}

stroke="#1976d2"

strokeWidth={3}

dot={false}

/>



</LineChart>


</ResponsiveContainer>


</div>


))


}



</div>


</div>

);


}


export default Analytics;