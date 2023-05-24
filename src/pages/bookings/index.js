import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";

import { List, ListItem, Container, Typography, Box, Button } from "@mui/material";

import { useRouter } from 'next/router'

import BookingItem from "@/components/BookingItem";

function Bookings() {
  const router = useRouter()

  const [bookings] = useState([
    {
      "booking_token": "FKSMEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Davao",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T23:40:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 4845
      },
      "status": "Confirmed",
    },
    {
      "booking_token": "MSXsFmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Clark",
      "cityTo": "Iloilo City",
      "airlines_name": "Cebu Pacific",
      "utc_departure": "2023-04-21T20:45:00.000Z",
      "utc_arrival": "2023-04-21T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 1845
      },
      "status": "Cancelled",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Confirmed",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Confirmed",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Confirmed",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Cancelled",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Confirmed",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Cancelled",
    },
    {
      "booking_token": "FEEwmrsyT3xQrdxYnQIx-QoG1bkbuyPiJBkDlq-W1EN5ov0S-H9rsz6H_78x6DKqEWOolFs3VAYLqPDOci5Ic9bQ28Viq3AjUQJ170N-Fbf553WxTIGjoclhj-ded5alp7eLMnDFQkSysoR5-5kWY9Zar88JWjBsIQyR6pe53oBC7JfGRvDIW2kIG921psci0HLuqANC9pN1BIc46Et9vOB7N8NUrj7b0yzKmLCWrrLROGPqqEOtzXz3M-xYCfU0TzswAabI0DQWr3od0jKtoD87LSvKk_NBjD-yTr4HKcKTYVukY4f6SSfqqLNut6PDxUayfjfAL-3w0rg7ULV5fDLBzj8ZasZLkouJYmqYBI2wGccEn7NZAp6NvK1H-eKi_Ai4mloAGG9b2xw3J0IkfJoGMfErDWqmweQCkO-Sk6TFAHZ-MqGpuXvuYqwOXGbFsZc3SEjOzxgQrRyncBCoLxNlCZIEu7r1oP7U0dsEPDnE3vi7-cq5HbyK3GWjnkL9GCTkwSgoUUYgYbWg9Xe-YMEMYTZ45nP5Z-nEUZKDTOq0EKIPqvp0uruTKUAKUf53N1tPivVr-G63JNwPz4Q_jUlf0Tt_LI5hsFJeQcnOEhyMu5MJl3qk19PLhX9oCcC7K",
      "cityFrom": "Manila",
      "cityTo": "Iloilo City",
      "airlines_name": "Philippine Airlines",
      "utc_departure": "2023-05-14T20:15:00.000Z",
      "utc_arrival": "2023-05-14T21:35:00.000Z",
      "conversion": {
          "EUR": 46,
          "PHP": 2845
      },
      "status": "Confirmed",
    }
  ]);
  
  return (
    <Layout>
      <Container
        sx={{
          mt: 10,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          color="inherit"
          fontWeight={600}
          fontSize={32}
        >
          Bookings
        </Typography>

        <List>
          {bookings.map(b => {
            return (
              <ListItem key={b.booking_token} disablePadding>
                <BookingItem booking={b}/>
              </ListItem>
            )
          })}
        </List>
      </Container>
    </Layout>
  );
}

export default Bookings;
