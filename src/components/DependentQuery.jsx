import axios from "axios";
import { useQuery } from "react-query";

const fetchUsersById = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchChannelId = (channel) => {
  return axios.get(`http://localhost:4000/channels/${channel}`);
};

export default function DependentQuery({ email }) {
  const {
    data: user
  } = useQuery(["users", email], () => fetchUsersById(email));
  const channelId = user?.data.channelId;
  const { data } = useQuery(
    ["courses", channelId],
    () => fetchChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );
  console.log(user);
  return <div>DependentQuery</div>;
}
