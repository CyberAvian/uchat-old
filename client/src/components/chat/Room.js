import { useContext } from 'react';
import { SocketContext } from '../../socket';
import './Room.css';

const Room = ({ name }) => {
  const socket = useContext(SocketContext);

  const handleClick = (event) => {
    event.preventDefault();
  }

  return (
    <li className='room'>
      <p className='room-name'>{name}</p>
      <p className='room-preview'>'Message Preview'</p>
    </li>
  );
}

export default Room;