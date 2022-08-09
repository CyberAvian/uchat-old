import './Room.css';

const Room = ({ name, messages }) => {
  return (
    <li class='room'>
      <p class='room-name'>{name}</p>
      <p class='room-preview'>'Message Preview'</p>
    </li>
  );
}

export default Room;