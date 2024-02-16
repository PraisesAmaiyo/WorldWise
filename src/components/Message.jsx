import styles from './Message.module.css';

function Message({ message }) {
  return (
    <span className={styles.message}>
      <span role="img">👋</span> {message}
    </span>
  );
}

export default Message;
