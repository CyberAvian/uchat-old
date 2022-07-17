import './Message.css';

const Message = ({ username, text, sender, showUsername, style }) => {
  return (
    <div  className={`Message ${sender} ${showUsername}`}
          theme={style}>
      <h4>{username}</h4>
      <p>{text}</p>
    </div>
  )
}


export default Message;
