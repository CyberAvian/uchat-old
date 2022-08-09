import './Room.css';

const Room = ({ name }) => {
  return (
    <li className='room'>
      <p className='room-name'>{name}</p>
      <p className='room-preview'>'Message Preview'</p>
    </li>
  );
}

export default Room;