import { useState, useEffect } from "react"
import { Diary } from "./types"
import diaryService from "./services/diaryService"
import Diarylist from "./components/Diarylist"
import { Box, Typography } from "@mui/material"
import Diaryform from "./components/Diaryform"

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    diaryService.getAll().then(ds => setDiaries(ds))
  }, [])

  const addDiary = (diary:Diary) => {
    const updatedDiaries = diaries.concat(diary);
    setDiaries(updatedDiaries);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1">Ilari's Flight diaries</Typography>
      <Diaryform addDiary={addDiary} />
      <Diarylist diaries={diaries} />
    </Box>
  )
}

export default App
