import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from "@mui/material/Slide";

const ViewTeams = () => {

    const [ allTeams, setAllTeams ] = useState(false);
    const [ selection, setSelection ] = useState("");
    const [ openBackDrop, setOpenBackDrop ] = useState(false);
    const [ response, setResponse ] = useState(false);
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        fetch("/teams")
        .then((res) => res.json())
        .then((data) => setAllTeams(data.data));
        setOpenBackDrop(false)
    },[response])

    const handleSelection = (e) => {
        e.preventDefault();
        setSelection(e.target.value);
    }

    const handleDelete = () => {
        setOpenBackDrop(true)
        fetch(`/teams/delete/${selection}`, {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setResponse(data);
            setOpen(true);
        })
        setSelection("")
    }

    const handleClose = () => {
        setOpen(false)
    }

    function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }

    return (
        <> 
            {
                allTeams ? 
                <>
                    <Container>
                        <H2 to="/">Go Back  </H2>
                        <h3>All Teams Created</h3>
                        <Wrapper>
                            { allTeams.length !== 0 ?
                                <>
                                    {allTeams.map((team) => {
                                        return(
                                            <Team value={team._id} onClick={handleSelection}>{team._id}</Team>
                                        )
                                    })}
                                </>
                                :
                                <div>No teams</div>
                            }
                        </Wrapper>
                        
                    </Container>
                    <TeamList>
                        {allTeams.map((team) => {
                            return(
                                <TeamContainer className={ selection === team._id ? "chosen" : "" }>
                                    {team.teamInfo.map((info) => {
                                        return(
                                            <InnerWrapper>
                                                <h2>Team: {info.teamNumber}</h2>
                                                {info.teamList.map((camper) => {
                                                    return (
                                                        <Name>{camper.name} Age: {camper.age}</Name>
                                                    )
                                                })}
                                            </InnerWrapper>
                                        )
                                    })}
                                </TeamContainer>
                            )
                        })}
                        { selection && 
                                <DeleteButton onClick={handleDelete}>Delete Team</DeleteButton>
                        }
                    </TeamList>
                
                        <Backdrop
                            sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackDrop}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        { response && 
                            <div>
                                <Stack spacing={2} sx={{ width: '100%' }}>
                                    <Snackbar 
                                        open={open}
                                        onClose={handleClose}
                                        autoHideDuration={5000}
                                        anchorOrigin={{horizontal : 'center', vertical: 'top'}}
                                        TransitionComponent={TransitionDown}
                                    >
                                        {response.status === 200 ? 
                                            <Alert severity="success" sx={{ width: '100%', background: 'green', color: 'white'}}>
                                                Team Deleted Successfully!
                                            </Alert>
                                            :
                                            <Alert severity="error" sx={{ width: '100%', background: 'orange', color: 'white' }}>
                                                Team Not Deleted!
                                            </Alert>
                                        }
                                    </Snackbar>
                                </Stack>
                            </div>
                        }
                </>
                :
                <>
                <ProgressContainer>
                    <Box sx={{width: '50%'}}>
                        <Loading>Loading...</Loading>
                        <LinearProgress />
                    </Box>
                </ProgressContainer>
                </>
            }
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
`;

const H2 = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-size: 35px;
    font-weight: bold;
`;

const Wrapper = styled.div`
    display: flex;
    width: 90%;
`;

const Team = styled.button`
    padding: 10px;
    margin: 10px;
    cursor: pointer;
`;

const DeleteButton = styled.button`
    width: 100px;
    height: 35px;
`;

const TeamList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
`;

const TeamContainer = styled.div`
    display: none;
    &.chosen{
        display: flex;
        justify-content: center;
        width: 100%;
    }
`;

const InnerWrapper = styled.div`
    border: 2px solid black;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const Name = styled.div`
    padding: 2px;
`;

const ProgressContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Loading = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
`;

export default ViewTeams;