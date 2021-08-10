import React from 'react';
import styles from './sidebar.module.css'

const Sidebar = ({layout}) => {
  const layoutStyle = layout === 'grid' ? styles.grid : styles.list

  return (
    <aside className={`${styles.sidebar} ${layoutStyle}`}>
      <h1>sidebar</h1>
    </aside>
  )
}

export default Sidebar;