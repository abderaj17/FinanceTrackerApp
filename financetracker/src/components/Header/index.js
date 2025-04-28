import React, { useEffect } from 'react';
import './styles.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firbase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged out Successfully!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  if (loading) {
    return (
      <div className="navbar">
        <p className="logo">Financely.</p>
        <p style={{ marginLeft: "auto", fontSize: "14px" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="navbar">
      <p className="logo">Financely.</p>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={
              user?.photoURL
                ? user.photoURL
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
            style={{
              borderRadius: "50%",
              height: "2rem",
              width: "2rem",
              objectFit: "cover",
            }}
          />
          <p
            className="logo link"
            style={{ cursor: "pointer" }}
            onClick={logoutFnc}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
