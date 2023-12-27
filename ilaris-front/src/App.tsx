import { useState, useEffect } from "react"
import { Diary } from "./types"
import diaryService from "./services/diaryService"
import Diarylist from "./components/Diarylist"
import { Box, Typography } from "@mui/material"

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    diaryService.getAll().then(ds => setDiaries(ds))
  }, [])

  return (
    <Box>
      <Typography variant="h4" component="h1">Ilari's Flight diaries</Typography>
      <Diarylist diaries={diaries} />
    </Box>
  )
}

export default App
