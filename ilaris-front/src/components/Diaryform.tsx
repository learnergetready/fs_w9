import { LibraryBooks, CalendarToday } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Input, InputAdornment, Radio, RadioGroup, TextField } from "@mui/material";
import { Diary, NewDiaryEntry, Visibility, Weather } from "../types";
import diaryService from "../services/diaryService";

type typeAddDiary = (diary: Diary) => void

const Diaryform = ({addDiary}: {addDiary: typeAddDiary}) => {

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            date: {value: string};
            visibility: {value: string};
            weather: {value: string};
            comment: {value: string};
        }
        const newEntry: NewDiaryEntry = {
            date: target.date.value,
            visibility: target.visibility.value as Visibility,
            weather: target.weather.value as Weather,
            comment: target.comment.value,
        }
        diaryService.post(newEntry).then(diary => addDiary(diary))
        target.date.value = "";
        target.visibility.value = "";
        target.weather.value = "";
        target.comment.value = "";
    }

    return(
      <Box>
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