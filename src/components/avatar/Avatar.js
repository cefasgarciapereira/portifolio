import React from 'react';
import avatarIcon from 'images/website-icon.png';
import { withStyles } from '@material-ui/styles';
import { FaRegGrinWink } from "react-icons/fa";

import styles from './style';

type Props = {
  classes: Object,
};

const Avatar = ({ classes }: Props) => (
  <FaRegGrinWink color='#000' size={24}/>
);

export default withStyles(styles)(Avatar);

/*
    <img src={avatarIcon} className={classes.avatar} alt='avatar' />
*/
