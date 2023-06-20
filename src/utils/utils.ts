const formattedTime = (data: string) => {
  const time = data.split(' ')[1];
  const timeWithoutSecond = time.split(":").slice(0, 2).join(":");
  return timeWithoutSecond;
};

export default formattedTime;
