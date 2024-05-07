import "./menu.css";
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { useAuth } from '../../../context/AuthContext';
import Instructive from "../../../components/Instructive/Instructive";
import Profile from "./Profile/Profile";

/**
 * Component for rendering the menu with options like profile, instructive, and logout.
 * @returns {JSX.Element} The JSX.Element containing the menu.
 */
const Menu = (props) => {
  const auth = useAuth();
  const { user } = useUser();
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showInstructive, setShowInstructive] = useState(false);
  const image = useMemo(() => {
    return <img className="icon-avatar" src={user.avatarPng} alt="user" />;
  }, [user.avatarPng]);

  /**
   * Handles the click event for the menu button.
   */
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowProfile(false);
    setShowInstructive(false);
  };

  /**
   * Handles the click event for the profile button.
   */
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    setShowMenu(false);
    setShowInstructive(false);
  };

  /**
   * Handles the click event for the instructive button.
   */
  const handleInstructiveClick = () => {
    setShowInstructive(!showInstructive);
    setShowMenu(false);
    setShowProfile(false);
  };

  /**
   * Handles the click event for the user guide button.
   * Opens the user guide in a new tab.
   */
  const handleUserGuide = () => {
    window.open(
      'https://correounivalleeduco-my.sharepoint.com/:b:/g/personal/fabian_cordoba_correounivalle_edu_co/EWxr119y8XVKhjggLAUsDGsBLdF2nx1O28pW2Y6q3kHv6g?e=7CePLE',
      '_blank'
    );
  };

  /**
   * Handles the click event for the logout button.
   * Logs out the user.
   */
  const handleLogout = () => {
    auth.logout();
    window.location.href = '/';
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
                  <Link onClick={handleUserGuide}>Manual</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Cerrar sesión</Link>
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
