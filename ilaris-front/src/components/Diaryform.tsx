import { LibraryBooks, CalendarToday } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Input, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Diary, NewDiaryEntry, Visibility, Weather } from "../types";
import diaryService from "../services/diaryService";
import Notification from "./Notification";
import { useState } from "react";

interface Props {
  addDiary: (diary: Diary) => void;
}

const Diaryform = ({addDiary}: Props) => {
  const [notification, setNotification] = useState<string>("");

  const notify = (message: string): void => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 6000);
  };
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            date: {value: string};
            visibility: {value: string};
            weather: {value: string};
            comment: {value: string};
        };
        const newEntry: NewDiaryEntry = {
            date: target.date.value,
            visibility: target.visibility.value as Visibility,
            weather: target.weather.value as Weather,
            comment: target.comment.value,
        };
        diaryService
          .post(newEntry, notify)
          .then(diary => {
            if (typeof diary !== "undefined" && diary !== "error") {
              addDiary(diary);
              target.date.value = "";
              target.visibility.value = "";
              target.weather.value = "";
              target.comment.value = "";
        }});
    };
    return(
      <Box>
        <Typography marginTop={5} variant="h5" component="h2">Add a new entry</Typography>
        <Notification message={notification}/>
        <form  onSubmit={handleSubmit}>
        <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              name="date"
              type="date"
              startAdornment={
                <InputAdornment position="start">
                    <CalendarToday />
                </InputAdornment>
              }
            />
            <FormLabel>Visibility</FormLabel>
            <RadioGroup
              row
              name="visibility"
            >
                {Object.keys(Visibility).map((v) => <FormControlLabel key={v} value={v.toLowerCase()} control={<Radio />} label={v} />)}
            </RadioGroup>
            <FormLabel>Weather</FormLabel>
            <RadioGroup
              row
              name="weather"
            >
                {Object.keys(Weather).map((w) => <FormControlLabel key={w} value={w.toLowerCase()} control={<Radio />} label={w} />)}
            </RadioGroup>
            <FormLabel>Comment</FormLabel>
            <TextField
              name="comment"
              InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <LibraryBooks />
                </InputAdornment>
    )}}
            />
        <Button variant="contained" type="submit">Send</Button>
        </FormControl>
        </form>
      </Box>
    );
};

export default Diaryform;