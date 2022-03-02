import React from 'react';
import "./topbar.css";
import { NotificationsNone, Language, Settings } from '@material-ui/icons';

export default function Topbar() {
    return (
        <div>
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topLeft">
                        <span className="logo">
                            Mictokk Admin
                        </span>
                    </div>
                    <div className="topRight">
                        <div className="topbarIconContainer">
                            <NotificationsNone />
                            <span className="topIconBadge">
                                    2
                            </span>
                        </div>
                        <div className="topbarIconContainer">
                            <Language />
                            <span className="topIconBadge">
                                    2
                            </span>
                        </div>
                        <div className="topbarIconContainer">
                            <Settings />
                            <span className="topIconBadge">
                                    2
                            </span>
                        </div>
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="topbarAvatar" className="topAvatar" />
                    </div>
                </div>
            </div>
        </div>
    )
}
