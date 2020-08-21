import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TitleBar from "../Components/Multi/TitleBar";
import { AddCircleOutline } from "@material-ui/icons";
import CustomGridList from "../Components/Multi/CustomGridList";
import { EditProfile } from "../Components/Profiles/EditProfile";
import { PageStatus, Profile } from "../Store/Reducers/mainReducer";
import { ActionType, store } from "../Store";
import AddProfileModal from "../Components/Profiles/AddProfileModal";

interface Props {
    pageState: PageStatus,
    profiles: Profile[]
}

function setPageState(state: PageStatus) {
    store.dispatch({
        type: ActionType.SET_PROFILE_PAGE_STATE,
        payload: state
    })
}

export default function Profiles(props: Props) {

    const [selectedProfile, setSelectedProfile] = useState(0);

    const content = () => {
        switch (props.pageState) {
            case PageStatus.Add:
                return <AddProfileModal open={true} onClose={() => setPageState(PageStatus.Home)}/>
            case PageStatus.Edit:
                return <EditProfile selectedProfileIndex={selectedProfile} selectedProfile={props.profiles[selectedProfile]}/>
            case PageStatus.Home:
                return (
                    <React.Fragment>
                        <TitleBar title={"Profiles"} titleEditable={false} endText={"Add Profile"}
                                  endIcon={<AddCircleOutline onClick={() => setPageState(PageStatus.Add)}/>}/>
                        <CustomGridList onTileClick={(index) => {
                            setSelectedProfile(index);
                            setPageState(PageStatus.Edit)
                        }} data={props.profiles}/>
                    </React.Fragment>
                )
        }
    }

    return (
        <Grid container direction={"column"}>
            {content()}
        </Grid>
    );
}
