// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const InnerTitle = ({ title , color , locale }) => {
    return (
        <Stack mb={0} position="relative">
            <Typography component="h1" variant="h3" pt={1} pb={0} mb={0} color={color}>{title} </Typography>
        </Stack>
    )
}
export default InnerTitle;