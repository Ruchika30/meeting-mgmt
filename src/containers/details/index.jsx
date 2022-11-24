import useGetRoomDetials from './useGetRoomDetails'
import { useNavigate } from 'react-router-dom';
import BuildingsComponent from './buildings'
import { Card, Button, Typography } from 'antd';
import style from '../style'

const RoomDetails = () => {
    const { Title } = Typography;
    const { card, root, wrapper } = style

    const navigate = useNavigate()
    const { data, loading, error } = useGetRoomDetials()
    const { Buildings: buildings } = data

    const getRooms = () => {
        return buildings?.reduce((a, b) => {
            return a + b.meetingRooms.length
        }, 0)
    }


    const addMeeting = () => {
        navigate('/add', { state: { buildings } })
    }


    if (error) {
        return <h1>Has error ....</h1>
    }



    return (
        <>
            <div style={root}>
                <div style={wrapper}>
                    <Title level={2}>Meeting managment system</Title>
                    <Card style={card} loading={loading}>
                        <BuildingsComponent data={buildings} />

                        {/* Number of rooms */}
                        {/* {Boolean(getRooms()) && <div>Rooms: {getRooms()}</div>} */}


                        {/* Ongoing meetings */}
                        {/* <div>Ongoing meetings - {getOngoingMeetings(buildings)}</div> */}
                        <div style={{ marginTop: '10px' }}>
                            <Button block type="primary" onClick={addMeeting}>Add meeting</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default RoomDetails