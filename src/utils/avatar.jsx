import Avatar from "@mui/material/Avatar";

const TextAvatar = ({name}) => {
  return (
    <Avatar sx={{ bgcolor: "blue",}}>
      {name}
    </Avatar>
  );
};

export default TextAvatar;
