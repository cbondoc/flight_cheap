import React from 'react';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AirlinesIcon from '@mui/icons-material/Airlines';

const FlightRouteItem = ({ routeItem }) => {
    const { cityFrom, cityTo, cityCodeFrom, cityCodeTo, utc_arrival,
        utc_departure, airline_name, stops } = routeItem

    const mins = moment.utc(moment(utc_arrival).diff(moment(utc_departure))).format("mm")
    const hours = moment(utc_arrival).diff(moment(utc_departure), 'hours')

    return <>
        <Card sx={{ minWidth: 155, m: 0.3 }}>
            <CardContent sx={{ p: 1 }}>
                <div>
                    <Typography sx={{ fontSize: 11, m: 0 }} color="text.primary" >
                        {moment(utc_departure).format("MMM DD YYYY kk:mm")}
                    </Typography>
                    <Typography display="inline" sx={{ fontSize: 13, fontWeight: 600, m: 0.3 }} color="text.primary" >
                        {cityFrom}
                    </Typography>
                    <Typography display="inline" sx={{ fontSize: 13, m: 0.3 }} color="text.secondary" >
                        {cityCodeFrom}
                    </Typography>
                    <Typography sx={{ fontSize: 11, fontWeight: 600, m: 0.3 }} color="text.primary" >
                        <AirlinesIcon sx={{ fontSize: 11 }} /> {airline_name}
                    </Typography>
                </div>
                <Divider>
                    <Typography display="inline" sx={{ fontSize: 11, fontWeight: 400, fontStyle: "italic", m: 0.3 }} color="text.secondary" >
                        {hours}h   {mins}m  {stops > 0 ? `- ${stops} Stops` : "- Direct"}
                    </Typography>
                </Divider>
                <div>
                    <Typography display="inline" sx={{ fontSize: 13, fontWeight: 600, m: 0.3 }} color="text.primary" >
                        {cityTo}
                    </Typography>
                    <Typography display="inline" sx={{ fontSize: 13, m: 0.3 }} color="text.secondary" >
                        {cityCodeTo}
                    </Typography>
                    <Typography sx={{ fontSize: 11, m: 0 }} color="text.primary" >
                        {moment(utc_arrival).format("MMM DD YYYY kk:mm")}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    </>
}

export default FlightRouteItem