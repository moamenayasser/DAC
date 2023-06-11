import { Box, Typography, Container, Grid, List, ListItem ,styled} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
const ListStyle = styled(List)({
    borderRadius: 0,
    "& svg": {
        "marginRight": "6px",
        "marginLeft": "6px",
        "fontSize": "30px",
    },
    "@media (max-width: 768px)": {
        "&":{
            "flexDirection": "column",
        
        },
        "& li": {
            "justifyContent": "flex-start",   
        }
    }
})


const ProjectsDetails = ({ projects}) => {
    return (
        <Box flexGrow={1} pt={1} pb={5}>
            <Container fixed>
                <Grid container spacing={3} mb={7}>
                    <Grid item xs={12} md={7} position="relative">
                        <div className="section-title">
                            <Typography variant="h4" component="h4" letterSpacing="-1px" marginBottom="20px" marginTop="0px">
                            {projects.Name}
                            </Typography>
                            <p dangerouslySetInnerHTML={{__html: projects.DescriptionLong}}/>
                        </div>
                    </Grid>
                    {/* <Grid item xs={12} md={7} position="relative">
                        <ListStyle sx={{ display: 'flex' }}>
                            {projects?.feature.map((item, index) => (
                                <ListItem key={index} disablePadding={true} align-items='center'>
                                    {item?.icon === 'time' && (
                                        <>
                                            <AccessTimeOutlinedIcon color="secondary" fontSize='small' />
                                            <p>{item.name}</p>
                                        </>  
                                    )}
                                    {item?.icon === 'location' && (
                                        <>
                                            <LocationOnOutlinedIcon color="secondary" fontSize='small' />
                                            <p>{item.name}</p>
                                        </>  
                                    )}
                                    {item?.icon === 'money' && (
                                        <>
                                            <PaymentsOutlinedIcon color="secondary" fontSize='small' />
                                            <p>{item.name}</p>
                                        </>  
                                    )}
                                    {item?.icon === 'key' && (
                                        <>
                                            <VpnKeyOutlinedIcon color="secondary" fontSize='small' />
                                            <p>{item.name}</p>
                                        </>  
                                    )}
                                </ListItem>
                            )
                        )}
                        </ListStyle>
                    </Grid> */}
                </Grid>
            </Container>
        </Box>
    )
}
export default ProjectsDetails;