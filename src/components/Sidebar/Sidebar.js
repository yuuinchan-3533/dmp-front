import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

import Icon from '../Icon';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  return (
    <nav className={s.root}>
      <header className={s.logo}>
        <Link to="/app/main">
          <Icon glyph="logo" />
        </Link>
      </header>
      <ul className={s.nav}>
        
        <LinksGroup
          header="Profile"
          headerLink="/app/main"
          glyph="dashboard"
        />

        <LinksGroup
          header="User"
          headerLink="/app/user"
          glyph="user"
          display={currentUser.type}
        />
        <LinksGroup
          header="Images"
          headerLink="/app/images"
          glyph="dockerimage"
        />
        <LinksGroup
          header="Containers"
          headerLink="/app/containers"
          glyph="endpoints"
        />
        <LinksGroup
          header="Volumes"
          headerLink="/app/volumes"
          glyph="volume"
        />

      </ul>
    </nav>
  );
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
