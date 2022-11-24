
import { Avatar, List, Typography } from 'antd';
import useMeeting from '../useMeeting'
import { status } from '../../../constants'
import './style'

const Buildings = ({ data }) => {
    const { getOngoingMeetings, isOnGoingMeeting } = useMeeting()
    const { Title, Text } = Typography;

    const getMeetingStatus = (room) => {
        if (room && isOnGoingMeeting(room.meetings)) {
            return status.OCCUPIED
        }

        return status.VACANT
    }

    const buttonStyle = (room) => {
        return getMeetingStatus(room) == status.OCCUPIED ? status.OCCUPIED : status.VACANT
    }

    const getTitle = (room) => {
        return (
            <>
                <a href="https://ant.design" style={{ marginRight: '10px' }}>{room.name}</a>
                <button class={buttonStyle(room)}>{getMeetingStatus(room)}</button>
            </>
        )
    }

    return (
        <>
            {/* Number of buildings */}
            {
                data?.length &&
                <Title level={4}>Total Buildings - {data?.length}</Title>
            }

            {/* Meeting rooms details */}
            {
                data.map((item, id) => {
                    return (
                        <div key={`room${id}`}>
                            <Title level={5}>{item.name}</Title>
                            {item.meetingRooms.length ?
                                <Text type="secondary">
                                    There are {item.meetingRooms.length} meeting rooms in this building
                                </Text> : <Text type="secondary">
                                    There are no rooms here
                                </Text>}

                            {item.meetingRooms.length ?
                                <List
                                    itemLayout="horizontal"
                                    dataSource={item.meetingRooms}
                                    renderItem={(item) => {
                                        return (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                    title={getTitle(item)}
                                                // description={}
                                                />
                                            </List.Item>
                                        )
                                    }}
                                /> : null
                            }
                            {/* </div> */}
                        </div>)
                })
            }

        </>
    )

}

export default Buildings