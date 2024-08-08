import PropTypes from "prop-types";

export default function Notification({ notification }) {
  return (
    <div className="flex gap-4 items-center py-2 px-1">
      <span className="material-icons-sharp">account_circle</span>
      {notification.message ? (
        <p>
          {`${notification.user.email} commented on your post "${notification.message}"`}
        </p>
      ) : (
        <p>{notification.user.email} liked your post</p>
      )}
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.object,
};
