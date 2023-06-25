import Toast from "react-bootstrap/Toast";

export default function CustomToast(props) {
  const { icon, msg } = props;

  return (
    <Toast>
      <Toast.Header>
        {icon}
        <strong className="me-auto">{msg}</strong>
      </Toast.Header>
    </Toast>
  );
}
