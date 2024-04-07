import React from 'react';
import {Text} from 'react-native';

type Props = {
  date: string;
  navigation: any;
};

const DateTime = (props: Props) => {
  const nowTime = new Date();
  const date = new Date(props.date);
  const time = nowTime.getTime() - date.getTime();
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const day = (hours / 24).toFixed(0);
  if (hours > 168) {
    return (
      <Text className="text-xs mr-4 text-end text-black">
        {date.getDate()} tháng {date.getMonth() + 1}
      </Text>
    );
  } else if (hours > 48) {
    return (
      <Text className="text-xs mr-4 text-end text-black">{day} ngày trước</Text>
    );
  } else if (hours > 24) {
    return <Text className="text-xs mr-4 text-end text-black">Hôm qua</Text>;
  } else if (hours > 0) {
    return (
      <Text className="text-xs mr-4 text-end text-black">
        {hours} giờ trước
      </Text>
    );
  } else if (minutes > 0) {
    return (
      <Text className="text-xs mr-4 text-end text-black">
        {minutes} phút trước
      </Text>
    );
  } else {
    return (
      <Text className="text-xs mr-4 text-end text-black">
        {seconds} giây trước
      </Text>
    );
  }
};

export default DateTime;
