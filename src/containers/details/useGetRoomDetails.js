
import { useQuery, gql } from "@apollo/client";


const useGetRoomDetials = () => {
    const FILMS_QUERY = gql`
    {
        Buildings { name meetingRooms{
        name meetings{
        title
        date startTime endTime
        } }
        }
    }
    
    `;


    const { data = {}, loading, error } = useQuery(FILMS_QUERY);

    return {
        data, loading, error
    }
}


export default useGetRoomDetials