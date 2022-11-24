import useGetRoomDetials from './useGetRoomDetails'
import { useNavigate } from 'react-router-dom';
import BuildingsComponent from './buildings'
import { Avatar, Card, Skeleton, Switch } from 'antd';

import style from './style'

const RoomDetails = () => {
    const { parent, root } = style

    const navigate = useNavigate()
    const { data, loading, error } = useGetRoomDetials()
    const { Buildings: buildings } = data
    console.log("buildings--", buildings);

    const getRooms = () => {
        return buildings?.reduce((a, b) => {
            return a + b.meetingRooms.length
        }, 0)
    }


    const addMeeting = () => {
        navigate('/add')
    }

    // if (loading) {
    //     // return <h1>Loading ....</h1>
    //     return (
    //         <Card style={{ width: 300, marginTop: 16 }} loading={loading} >

    //         </Card >
    //     )
    // }

    if (error) {
        return <h1>Has error ....</h1>
    }



    return (
        <>
            <div style={root}>
                <Card style={parent} loading={loading}>
                    <BuildingsComponent data={buildings} />


                    {/* Number of rooms */}
                    {Boolean(getRooms()) && <div>Rooms: {getRooms()}</div>}


                    {/* Ongoing meetings */}
                    {/* <div>Ongoing meetings - {getOngoingMeetings(buildings)}</div> */}

                    <button onClick={addMeeting}>Add meeting</button>
                </Card>
            </div>
        </>
    )
}

export default RoomDetails