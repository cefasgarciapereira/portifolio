import React from 'react';
import avatarIcon from 'images/website-icon.png';
import { withStyles } from '@material-ui/styles';
import { FaRegGrinWink } from "react-icons/fa";

import styles from './style';

type Props = {
  classes: Object,
};

const Avatar = ({ classes }: Props) => (
  <h3 style={{textDecoration:'none', color:'#000'}}>{`<cefas/>`}</h3>
);

export default withStyles(styles)(Avatar);

/*
    <img src={avatarIcon} className={classes.avatar} alt='avatar' />
*/
