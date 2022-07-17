import "./Menu.css";

function Menu({ username, exitHandler }) {
  return (
    <div className="Menu">
      <p>Welcome, {username}</p>
      <button type="button" 
              id="exit" 
              aria-label="exit"
              onClick={exitHandler}>Exit Chat</button>
    </div>
  );
}

export default Menu;
