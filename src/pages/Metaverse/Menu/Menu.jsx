import "./menu.css";
import React, { useMemo, useState } from "react";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import Instructive from "../Instructive/Instructive";
import { useUser } from "../../../context/UserContext";
import { useAuth } from "../../../context/AuthContext";

const Menu = () => {
  const auth = useAuth();
  const { user } = useUser();
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showInstructive, setShowInstructive] = useState(false);
  const image = useMemo(() => {
    return <img className="icon-avatar" src={user.avatarPng} alt="user" />;
  }, [user.avatarPng]);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowProfile(false);
    setShowInstructive(false);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    setShowMenu(false);
    setShowInstructive(false);
  };

  const handleInstructiveClick = () => {
    setShowInstructive(!showInstructive);
    setShowMenu(false);
    setShowProfile(false);
  };

  const handleLogout = () => {
    auth.logout();
    window.location.href = "/";
  };

  return (
    <>
      <div className="container-menu">
        <div className="menu">
          {!showProfile && !showInstructive && (
            <button
              className="button-avatar"
              type="button"
              role="button"
              onClick={handleMenuClick}
            >
              {image}
            </button>
          )}
          {(showProfile || showInstructive) && (
            <button
              className="button-exit"
              type="button"
              role="button"
              onClick={handleMenuClick}
            >
              x
            </button>
          )}
          {showMenu && !showProfile && !showInstructive && (
            <nav className="menu-nav">
              <ul>
                <li>
                  <Link onClick={handleProfileClick}>Perfil</Link>
                </li>
                <li>
                  <Link onClick={handleInstructiveClick}>Instructivo</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
      {showProfile && <Profile />}
      {showInstructive && <Instructive />}
    </>
  );
};

export default Menu;
