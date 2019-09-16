import React from 'react';
import 'antd/dist/antd.css';
import { Avatar } from 'antd';

const ProfileIcon = props => {
        return(
            <div>
                <Avatar style={{ backgroundColor: props.color, verticalAlign: 'middle' }} size="large">
                    {props.user}
                </Avatar>
            </div>
        )
}

export default ProfileIcon;