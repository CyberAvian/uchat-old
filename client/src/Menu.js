import "./Menu.css";

function Menu({ username, clickHandler }) {
  return (
    <div className="Menu">
      <p>Welcome, {username}</p>
      <button type="button" 
              id="exit" 
              aria-label="exit"
              onClick={clickHandler}>Exit Chat</button>
    </div>
  );
}

export default Menu;
