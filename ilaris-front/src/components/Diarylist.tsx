import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Diary } from '../types';

const Diarylist = ({diaries}: {diaries:Diary[]}) => {
  const descendingAlphabetically = (a:Diary, b:Diary): number => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
    return (<TableContainer component={Paper}>
      <Typography marginTop={5} variant="h5" component="h2">The diary</Typography>
    <Table sx={{ minWidth: 350 }} size='small' aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="center">Visibility</TableCell>
          <TableCell align="center">Weather</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {diaries.sort(descendingAlphabetically).map((d) => (
            <TableRow
              key={d.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
            <TableCell component="th" scope="row">
                {d.date}
              </TableCell>
              <TableCell align="center">{d.visibility}</TableCell>
              <TableCell align="center">{d.weather}</TableCell>
              </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
);
};

export default Diarylist;