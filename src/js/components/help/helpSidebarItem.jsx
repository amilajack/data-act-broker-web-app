/**
  * helpSidebarItem.jsx
  * Created by Kevin li 5/26/16
  **/

import React from 'react';

export default class HelpSidebarItem extends React.Component {
	render() {
		return (
			<li>
                <a href={"/#/help?section=" + this.props.sectionId}>
                	{this.props.sectionName}
                </a>
            </li>
		)
	}
}